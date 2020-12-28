<template>
  <h1>{{ msg }}</h1>
  <button v-clipboard="msg">copy me</button>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    default: 'hello world',
  },
}
</script>
