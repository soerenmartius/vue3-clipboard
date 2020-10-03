import ClipboardJS from 'clipboard'
import { Config } from './module'
import { Actions } from './types'

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

    if (Config.appendToBody) {
      document.body.appendChild(fakeElement)
    }

    fakeElement.click()
    if (Config.appendToBody) {
      document.body.removeChild(fakeElement)
    }
  })
}
