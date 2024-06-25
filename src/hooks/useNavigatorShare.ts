interface IShareData {
  title: string;
  text: string;
  url?: string;
  files?: File[];
}

const errorMessages: Record<string, string> = {
  NotAllowedError: 'Permission to share denied.',
  AbortError: 'The sharing action was aborted.',
  NotSupportedError: 'Your browser does not support the sharing feature.',
  TypeError: 'Error while sharing: incorrect data type.'
};

function checkPermission(files?: File[]) {
  if (!navigator.canShare) {
    throw new Error('Your browser does not support the sharing feature.');
  }

  if (!navigator.canShare({ files } || { files: [new File([], '')] })) {
    throw new Error(
      `Your browser does not allow sharing ${files ? 'this type of ' : ''} files.`
    );
  }
}

function surroundTryCatch(fn: (data: IShareData) => void | Promise<void>) {
  return async (data: IShareData) => {
    try {
      await fn(data);
    } catch (error: unknown) {
      if ((error as Error).name in errorMessages) {
        const message = `Error while sharing: ${errorMessages[(error as Error).name]}`;
        console.error(message);
      } else {
        throw error;
      }
    }
  };
}

export const useNavigatorShare = () => {
  async function shareInNavigator(data: IShareData) {
    if (data.files) checkPermission(data.files);

    await navigator.share({
      title: data.title,
      text: data.text ?? '',
      url: data.url ?? '',
      files: data.files ?? []
    });
  }

  return {
    shareInNavigator: surroundTryCatch(shareInNavigator)
  };
};
