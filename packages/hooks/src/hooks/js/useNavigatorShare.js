const errorMessages = {
  NotAllowedError: 'Permission to share denied.',
  AbortError: 'The sharing action was aborted.',
  NotSupportedError: 'Your browser does not support the sharing feature.',
  TypeError: 'Error while sharing: incorrect data type.'
};

function checkPermission(files) {
  if (!navigator.canShare) {
    throw new Error('Your browser does not support the sharing feature.');
  }

  if (!navigator.canShare({ files } || { files: [new File([], '')] })) {
    throw new Error(
      `Your browser does not allow sharing ${files ? 'this type of ' : ''} files.`
    );
  }
}

function surroundTryCatch(fn) {
  return async (data) => {
    try {
      await fn(data);
    } catch (error) {
      if (error.name in errorMessages) {
        const message = `Error while sharing: ${errorMessages[error.name]}`;
        console.error(message);
      } else {
        throw error;
      }
    }
  };
}

export const useNavigatorShare = () => {
  async function shareInNavigator(data) {
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
