import { useState } from "react";

export const useDownload = () => {
  const [error, setError] = useState<Error | unknown | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>(null);

  const handleResponse = async (response: Response): Promise<string> => {
    if (!response.ok) {
      throw new Error("Could not download file");
    }

    const contentLength = response.headers.get("content-length");
    const reader = response.clone().body?.getReader();

    if (!contentLength || !reader) {
      const blob = await response.blob();

      return createBlobURL(blob);
    }

    const stream = await getStream(contentLength, reader);
    const newResponse = new Response(stream);
    const blob = await newResponse.blob();

    return createBlobURL(blob);
  };

  const getStream = async (
    contentLength: string,
    reader: ReadableStreamDefaultReader<Uint8Array>,
  ): Promise<ReadableStream<Uint8Array>> => {
    let loaded = 0;
    const total = parseInt(contentLength, 10);

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for (;;) {
            const { done, value } = await reader.read();

            if (done) break;

            loaded += value.byteLength;
            const percentage = Math.trunc((loaded / total) * 100);
            setProgress(percentage);
            controller.enqueue(value);
          }
        } catch (error) {
          controller.error(error);
          throw error;
        } finally {
          controller.close();
        }
      },
    });
  };

  const createBlobURL = (blob: Blob): string => {
    return window.URL.createObjectURL(blob);
  };

  const handleDownload = (fileName: string, url: string) => {
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadFile = async (fileName: string, fileUrl: string) => {
    setIsDownloading(true);
    setError(null);
    setProgress(null);

    try {
      const response = await fetch(fileUrl);
      const url = await handleResponse(response);

      handleDownload(fileName, url);
    } catch (error) {
      setError(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    error,
    isDownloading,
    progress,
    downloadFile,
  };
};
