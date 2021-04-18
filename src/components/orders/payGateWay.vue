<template>
  <div v-html="payGateWay">{{ payGateWay }}</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

interface PayGateWayState {
  /**
   * form
   */
  payGateWay: string | null;
}
export default Vue.extend<PayGateWayState, {}, {}, {}>({
  name: 'payGateWay',
  data: () => ({
    payGateWay: '',
  }),
  mounted() {
    const form = this.$route.query.htmlData;
    this.payGateWay = form;
    this.$nextTick(() => {
      document.getElementsByTagName('form')[0].submit();
    });
  },
});
</script>
