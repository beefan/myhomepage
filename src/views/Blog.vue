<template lang="pug">
  b-container
    h1 Blog
    div.post-container
      div.post(v-for="post in blog" v-bind:key="post.url" @click="clickPost(post.url)") 
        h4 {{ post.name }}
        hr
        img(:src="post.img")
        p {{ post.desc }}
</template>

<script>
export default {
  data() {
    return {
        blog: [
    {
      "name": "Tech Elevator Coding Bootcamp Blog",
      "url": "https://www.brandonfannin.com/tech-elevator-blog",
      "desc": "Daily blog detailing my experience of a 14 wk intensive Java web dev coding bootcamp in 2020. ",
      "img": require("@/assets/images/tech_elevator.jpeg"),
      "document": ""
    },
    {
      "name": "Vipassana - 10 Day Silent Meditation",
      "url": "https://medium.com/@brandonfannin/vipassana-meditation-a-reflection-after-a-week-8e2fb800c295",
      "desc": "My experience of a 10 day vipassana meditation retreat that I took over Christmas 2016.",
      "img": require("@/assets/images/meditation_graphic.jpg"),
      "document": ""
    }
  ]
    }
  },
  methods: {
    clickPost(url) {
      const win = window.open(url, '_blank');
      win.focus();
    }
  }
}
</script>

<style lang="sass">
.post-container
  display: flex
  flex-wrap: wrap
  justify-content: space-evenly
.post
  @media (min-width: 768px) 
    width: 45%
  @media (min-width: 1080px)
    width: 30%
  margin: 2%
  padding: 2%
  border-radius: 5px
  background-color: #f8f9fa
  color: black
  img
    margin-bottom: 5px
    width: 100%
.post:hover
  box-shadow: 3px 3px 5px white, -3px -3px 6px white
</style>