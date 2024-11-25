import { useFavicon } from '../../hooks/ts/useFavicon';

const successFavicon = 'successFavicon.ico';
const errorFavicon = 'errorFavicon.ico';

export const FaviconBasedOperationResult = () => {
  const { faviconUrl, changeFavicon } = useFavicon();

  const onRunOperation = () => {
    if (Math.random() > 0.5) {
      changeFavicon(successFavicon);
    } else {
      changeFavicon(errorFavicon);
    }
  };

  return (
    <>
      <button onClick={onRunOperation}>Run operation</button>
      <p>Status: {faviconUrl === successFavicon ? 'Success' : 'Error'}</p>
    </>
  );
};
