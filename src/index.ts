import { App } from 'vue'
import ClipboardJS from 'clipboard'

enum Events {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ClipboardActions {
  COPY = 'copy',
  CUT = 'cut', // CUT only works on inputs and textareas
}

const Config = {
  autoSetContainer: false,
  appendToBody: true,
}

export const toClipboard = (
  text: string,
  action = ClipboardActions.COPY,
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const fakeElement = document.createElement('button')
    const clipboard = new ClipboardJS(fakeElement, {
      text: () => text,
      action: () => action,
    })

    clipboard.on(Events.SUCCESS, (e) => {
      clipboard.destroy()
      resolve(e)
    })

    clipboard.on(Events.ERROR, (e) => {
      clipboard.destroy()
      reject(e)
    })

    if (Config.appendToBody) {
      document.body.appendChild(fakeElement)
    }

    fakeElement.click()
    if (Config.appendToBody) {
      document.body.removeChild(fakeElement)
    }
  })
}

export const install = (app: App): void => {
  app.directive('clipboard', {
    beforeMount(el, binding) {
      if (binding.arg === Events.SUCCESS) {
        el._vClipboard_success = binding.value
      } else if (binding.arg === Events.ERROR) {
        el._vClipboard_error = binding.value
      } else {
        const clipboard = new ClipboardJS(el, {
          text: () => binding.value,
          action: () => {
            return binding.arg === ClipboardActions.CUT
              ? ClipboardActions.CUT
              : ClipboardActions.COPY
          },
          container: Config.autoSetContainer ? el : undefined,
        })
        clipboard.on(Events.SUCCESS, (e) => {
          const callback = el._vClipboard_success
          callback && callback(e)
        })
        clipboard.on(Events.ERROR, (e) => {
          const callback = el._vClipboard_error
          callback && callback(e)
        })
        el._vClipboard = clipboard
      }
    },
    updated(el, binding) {
      if (binding.arg === Events.SUCCESS) {
        el._vClipboard_success = binding.value
      } else if (binding.arg === Events.ERROR) {
        el._vClipboard_error = binding.value
      } else {
        el._vClipboard.text = () => {
          return binding.value
        }
        el._vClipboard.action = () => {
          return binding.arg === ClipboardActions.CUT
            ? ClipboardActions.CUT
            : ClipboardActions.COPY
        }
      }
    },
    unmounted(el, binding) {
      if (binding.arg === Events.SUCCESS) {
        delete el._vClipboard_success
      } else if (binding.arg === Events.ERROR) {
        delete el._vClipboard_error
      } else {
        el._vClipboard.destroy()
        delete el._vClipboard
      }
    },
  })
}

export default install
