<template>
  <ul class="error-messages">
    <li v-for="errorMesage in errorMesages" :key="errorMesage">
      {{ errorMesage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMesages() {
      return Object.keys(this.validationErrors).map((name) => {
        const messages = this.validationErrors[name].join(', ');
        return `${name} ${messages}`;
      });
    },
  },
};
</script>
