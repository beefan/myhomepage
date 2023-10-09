<template lang="pug">
#content
  p hi, welcome. <a :href="links.linkedin" >linkedin</a> | <a :href="links.github" >github</a> | <a :href="links.strava" >strava</a> | <a :href="links.email" >email</a>
  hr
  p I'm a Laravel and Vue.js developer at Loop Returns, working remotely from Athens, Ohio. 
  p I have B.A. in English. Lately I've been curious about large language models (like everyone else 😅)
  p When I'm not thinking, I love getting outside in any way: running, biking, hiking, camping, backpacking ⛺ 🏃‍♂️ 🚴‍♂️ ⛰️ 🌲
  br
  hr
  p some writing <a :href="links.blog">general blog</a> | <a :href="links.te" >coding bootcamp blog</a> | <a :href="links.meditation">vipassana meditation</a>
  p some coding demos <a :href="links.avatar">avatar sentiment analysis</a> | <a :href="links.chess">vue-js chess</a>
</template>

<script>
export default {
  data() {
    return {
      links: {
        blog: "/blog",
        email: "mailto:dev@brandonfannin.com",
        github: "https://github.com/beefan",
        strava: "https://www.strava.com/athletes/brandonfannin",
        linkedin: "https://linkedin.com/in/brandon-fannin",
        chess: "https://vue-js-chess.netlify.app/",
        avatar: "https://avatarsentiment.netlify.app/",
        meditation:
          "https://medium.com/@brandonfannin/vipassana-meditation-a-reflection-after-a-week-8e2fb800c295",
        te: "https://beefan.github.io/tech-elevator-blog/"
      }
    };
  }
};
</script>

<style lang="sass">
#content
  text-align: left
  min-height: 100%

  p
    padding-top: 2%
    padding-left: 8%
    padding-right: 8%

  a
    padding: 2%
    color: #f4a261
    font-weight: bold
  a:hover
    color: #4580c0
</style>