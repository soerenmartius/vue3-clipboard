import { App } from 'vue'
import ClipboardJS from 'clipboard'

const Config = {
  autoSetContainer: false,
  appendToBody: true,
}

const install = (app: App): void => {
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
          container: Config.autoSetContainer ? el : undefined,
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
}

export { install, Config }
