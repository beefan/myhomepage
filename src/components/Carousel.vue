<template lang="pug">
  div
    b-carousel(
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;")
      b-carousel-slide(
        v-for="img, index in images"
        v-bind:key="index")
        template(v-slot:img)
          img(:src="img.src" style="width: 100%")
</template>

<script>
  export default {
    data() {
      return {
        images: [
          {
            src: require("@/assets/images/presentation.jpg")
          },
          {
            src: require("@/assets/images/running.jpg")
          },
          {
            src: require("@/assets/images/backpack.jpg")
          },
          {
            src: require("@/assets/images/selfie.jpg")
          }
        ]
      }
    }
  }
</script>