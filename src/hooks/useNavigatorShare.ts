interface IShareData {
  title: string
  text: string
  url?: string
  files?: File[]
}

const errorMessages: Record<string, string> = {
  NotAllowedError: 'Permiso para compartir denegado.',
  AbortError: 'La acción de compartir fue abortada.',
  NotSupportedError: 'Tu navegador no soporta la función de compartir.',
  TypeError: 'Error al compartir: tipo de dato incorrecto.'
}

function checkPermission (files?: File[]) {
  if (!navigator.canShare) {
    throw new Error('Tu navegador no soporta la función de compartir.')
  }

  if (!navigator.canShare({ files } ?? { files: [new File([], '')] })) {
    throw new Error(`Tu navegador no permite compartir ${files ? 'este tipo de ' : ''} archivos.`)
  }
}

function surroundTryCatch (fn: (data: IShareData) => void | Promise<void>) {
  return async (data: IShareData) => {
    try {
      await fn(data)
    } catch (error: unknown) {
      if ((error as Error).name in errorMessages) {
        const message = `Error al compartir: ${errorMessages[(error as Error).name]}`
        console.error(message)
      } else {
        throw error
      }
    }
  }
}

export const useNavigatorShare = () => {
  async function shareInNavigator (data: IShareData) {
    if (data.files) checkPermission(data.files)

    await navigator.share({
      title: data.title,
      text: data.text ?? '',
      url: data.url ?? '',
      files: data.files ?? []
    })
  }

  return {
    shareInNavigator: surroundTryCatch(shareInNavigator),
  }
}
