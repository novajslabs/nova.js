import { useDownloadFile } from "./hooks/js/useDownloadFile";

const AppJs = () => {
  const { error, isDownloading, downloadFile } = useDownloadFile();

  const onClickSuccessfulDownload = () => {
    downloadFile(
      "README.md",
      "https://raw.githubusercontent.com/novajslabs/nova.js/main/README.md"
    );
  };

  const onClickButtonFailedDownload = () => {
    downloadFile(
      "novajs.zip",
      "https://github.com/novajslabs/nova.js/archive/refs/heads/main.zip"
    );
  };

  return (
    <div>
      <h3>Successful download</h3>
      <button disabled={isDownloading} onClick={onClickSuccessfulDownload}>
        {isDownloading ? "Downloading..." : "Download file"}
      </button>

      <h3>Failed download</h3>
      <button disabled={isDownloading} onClick={onClickButtonFailedDownload}>
        {isDownloading ? "Downloading..." : "Download file"}
      </button>

      {!!error && <p>Could not download file</p>}
    </div>
  );
};

export default AppJs;
