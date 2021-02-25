<template>
  <v-snackbar :value="message.open">
    {{ message.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="$emit('change', { message: '', open: false })">关闭</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export interface Message {
  message: string;
  open: boolean;
}

export default Vue.extend({
  name: 'my-snackbar',
  props: {
    message: Object as PropType<Message>,
  },
  model: {
    prop: 'message',
    event: 'change',
  },
});
</script>

<style scoped lang="scss"></style>
