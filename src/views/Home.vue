<template lang="pug">
  div.home
    Greeting
</template>

<script>
// @ is an alias to /src
import Greeting from "@/components/Greeting.vue";

export default {
  name: "Home",
  components: {
    Greeting
  }
};
</script>
<style lang="sass">
</style>
