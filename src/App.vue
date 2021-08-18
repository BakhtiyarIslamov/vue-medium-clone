<template>
  <div>
    <app-topbar />

    <router-view />
  </div>
</template>

<script>
import AppTopbar from '@/components/Topbar.vue';
import {actionTypes} from '@/store/modules/auth.js';

export default {
  name: 'App',
  components: {
    AppTopbar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>
