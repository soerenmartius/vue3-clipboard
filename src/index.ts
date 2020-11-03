import type { IVueClipboard } from './VueClipboard'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vclipboard: IVueClipboard
  }
}

export { VueClipboard, toClipboard } from './VueClipboard'
