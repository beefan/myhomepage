<template lang="pug">
  div
    h1 Blog
    b-col.post(v-for="post in blog.posts" v-bind:key="post.url" sm="4")
      h4 {{ post.name }}
      hr
      img(:src="post.img")
      p {{ post.desc }}
</template>

<script>
export default {
  data() {
    return {
      blog: require('../assets/blogs.json')
    }
  }
}
</script>

<style lang="sass">
.post
  margin: 2%
  padding: 2%
  border-radius: 5px
  background-color: #f8f9fa
  color: black
  img
    margin-bottom: 5px
</style>