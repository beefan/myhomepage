<template lang="pug">
  div.home
    Greeting
    Carousel
</template>

<script>
// @ is an alias to /src
import Greeting from "@/components/Greeting.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  name: "Home",
  components: {
    Greeting,
    Carousel
  }
};
</script>
<style lang="sass">
</style>
