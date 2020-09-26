<template lang="pug">
#content
  p hi, welcome. <a :href="links.linkedin" >linkedin</a> | <a :href="links.github" >github</a> | <a :href="links.twitter" >twitter</a> | <a :href="links.strava" >strava</a> | <a :href="links.email" >email</a>
  hr
  p I'm a software developer at Root Insurance in Columbus, Ohio. I have B.A. in Creative Writing. I'm fascinated by soil ecosystems and the contribution of microorganisms to sustainable food systems and carbon sequestration. 🌶️ 🍄 🥦
  p How can we use machine learning to validate the efficiency and sustainability of new food systems design? How can we use natural language processing to create technology that takes human eccentricities into account? 💻 🧠 🤔
  p When I'm not thinking, I love getting outside in any way: camping, running, backpacking, biking, hiking. ⛺ 🏃‍♂️ 🚴‍♂️ ⛰️ 🌲
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
        twitter: "https://twitter.com/btfannin",
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
  a:hover
    color: #4580c0
</style>