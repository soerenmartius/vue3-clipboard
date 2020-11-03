# vue3-clipboard


![Build](https://github.com/soerenmartius/vue3-clipboard/workflows/Build/badge.svg)

[Clipboard.js](https://clipboardjs.com/) bindings for Vue 3.

This repository is a port of Inndy's
[vue-clipboard2](https://github.com/Inndy/vue-clipboard2) plugin for Vue3.

## Install

`npm install --save @soerenmartius/vue3-clipboard`

## Usage

### Import the `v-clipboard` directive globally

**`src/main.ts`**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import VueClipboard from '@soerenmartius/vue3-clipboard'

createApp(App).use(VueClipboard).mount('#app')

```

### Import the `v-clipboard` directive for a specific component

## Examples

### Apply the v-clipboard directive to an element

```typescript
<template>
  <input v-model="value" />
  <button v-clipboard="value">Copy</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('lorem')

    return { value }
  },
})
</script>
```

### Copy value of an input, and handle events separately.

```typescript
<template>
  <input v-model="value" />
  <button
    v-clipboard:copy="value"
    v-clipboard:success="onSuccess"
    v-clipboard:error="onError"
  >
    Copy
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('lorem')

    const onSuccess = () => {
      console.log('success')
    }

    const onError = () => {
      console.log('error')
    }

    return { value, onSuccess, onError }
  },
})
</script>
```

### Standalone usage of the toClipboard function

```typescript
<template>
  <input v-model="value" />
  <button @click="toClipboard(value)">Copy</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { toClipboard } from '@soerenmartius/vue3-clipboard'

export default defineComponent({
  setup() {
    const value = ref('lorem')

    return { value, toClipboard }
  },
})
</script>
```

## Contributing

Contributions are always encouraged and welcome!
For the process of accepting changes, we use
[Pull Requests](https://github.com/soerenmartius/vue3-clipboard/pulls).
For feature requests please fill an
[issue](https://github.com/soerenmartius/vue3-clipboard/issues/new).

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
