<template lang="pug">
  div
    h1 Blog
    div(v-for="post in blog.posts")
      p {{ post.url }}
      p {{ post.name }}
      p {{ post.desc }}
      p {{ post.document }}
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

<style>

</style>