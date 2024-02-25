<template></template>

<script>
export default {
  name: 'ButtonHistorial',
  props: {
    historial: {
      type: Array,
      required: true
    }
  },
  methods: {
    showHistorial() {
      this.$emit('show-historial', this.historial)
    }
  }
}
</script>
