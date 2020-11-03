import { App } from 'vue'

import { Actions, ClipboardConfig } from './@types'
import ClipboardJS from 'clipboard'

export interface IVueClipboard {
  /**
   * Set global config
   */
  config(config: ClipboardConfig): void

  /**
   * Copy string to clipboard
   */
  toClipboard(text: string, action: Actions): Promise<unknown>

  install(app: App): void
}

const defaultConfig = {
  autoSetContainer: false,
  appendToBody: true,
}

export const VueClipboard: IVueClipboard = {
  config: (options: ClipboardConfig) => {
    const { autoSetContainer, appendToBody } = options

    defaultConfig.autoSetContainer = autoSetContainer ? autoSetContainer : false
    defaultConfig.appendToBody = appendToBody ? appendToBody : true
  },
  install: (app: App) => {
    app.config.globalProperties.$vclipboard = toClipboard

    app.directive('clipboard', {
      beforeMount(el, binding) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value
        } else {
          const clipboard = new ClipboardJS(el, {
            text: () => binding.value,
            action: () => {
              return binding.arg === 'cut' ? 'cut' : 'copy'
            },
            container: defaultConfig.autoSetContainer ? el : undefined,
          })
          clipboard.on('success', (e) => {
            const callback = el._vClipboard_success
            callback && callback(e)
          })
          clipboard.on('error', (e) => {
            const callback = el._vClipboard_error
            callback && callback(e)
          })
          el._vClipboard = clipboard
        }
      },
      updated(el, binding) {
        if (binding.arg === 'success') {
          el._vClipboard_success = binding.value
        } else if (binding.arg === 'error') {
          el._vClipboard_error = binding.value
        } else {
          el._vClipboard.text = () => {
            return binding.value
          }
          el._vClipboard.action = () => {
            return binding.arg === 'cut' ? 'cut' : 'copy'
          }
        }
      },
      unmounted(el, binding) {
        if (binding.arg === 'success') {
          delete el._vClipboard_success
        } else if (binding.arg === 'error') {
          delete el._vClipboard_error
        } else {
          el._vClipboard.destroy()
          delete el._vClipboard
        }
      },
    })
  },
  toClipboard: (text: string, action: Actions) => toClipboard(text, action),
}

export const toClipboard = (
  text: string,
  action: Actions = 'copy',
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const fakeElement = document.createElement('button')
    const clipboard = new ClipboardJS(fakeElement, {
      text: () => text,
      action: () => action,
    })

    clipboard.on('success', (e) => {
      clipboard.destroy()
      resolve(e)
    })

    clipboard.on('error', (e) => {
      clipboard.destroy()
      reject(e)
    })

    if (defaultConfig.appendToBody) {
      document.body.appendChild(fakeElement)
    }

    fakeElement.click()
    if (defaultConfig.appendToBody) {
      document.body.removeChild(fakeElement)
    }
  })
}
