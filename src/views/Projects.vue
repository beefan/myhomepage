<template lang="pug">
  b-container
    h1 Projects
    div.project-container
      div.project(v-for="project in projects" v-bind:key="project.url" @click="clickPost(project.url)" sm="4")
        h4 {{ project.name }}
        hr
        img(:src="project.img")
        p {{ project.desc }}
</template>

<script>
export default {
    methods: {
    clickPost(url) {
      const win = window.open(url, '_blank');
      win.focus();
    }
  },
  data() {
    return {
      projects: [
    {
      "name": "Directed Reading Chrome Extension",
      "url": "https://github.com/beefan/directed-reading",
      "desc": "Simple Chrome extension to direct your attention while reading articles online. Submitted to Chrome store for review.",
      "img": "https://raw.githubusercontent.com/beefan/directed-reading/master/content.png",
      "document": "project1.json"
    },
        {
      "name": "Pet Adoption Website",
      "url": "https://github.com/beefan/adopt-me-pet",
      "desc": "Landing page for pet adoption agency. Simple backend in Node sending json data. Frontend in Vue/bootstrap-vue. ",
      "img": "https://raw.githubusercontent.com/beefan/adopt-me-pet/master/screenshot.png",
      "document": "project1.json"
    },
        {
      "name": "Vue.js 2-player Chess Game",
      "url": "https://github.com/beefan/vue-js-chess",
      "desc": "2 player chess game implemented entirely in Vue.js. Created to learn vuex store.",
      "img": "https://raw.githubusercontent.com/beefan/vue-js-chess/master/vue-chess-screen.png",
      "document": "project1.json"
    },
        {
      "name": "Spongebob Script Script Generation",
      "url": "https://github.com/beefan/spongebob-transcript-generator",
      "desc": "Two part project: 1) Pytorch recurrent neural net trained on spongebob to generate transcripts; 2) beautiful soup scraper to download transcripts of all spongebob episodes into single text file",
      "img": require("@/assets/images/spongebob.png"),
      "document": "project1.json"
    },
        {
      "name": "Veggie Farm Assistant",
      "url": "https://github.com/beefan/veggie-farm-assistant",
      "desc": "Full stack web application designed to help small scale veggie farmers organize crop/harvest/sales/loss data. Backend API endpoints and data access objects written in Java. Frontend written in Vue.js. Made beautiful with css/scss.",
      "img": "https://raw.githubusercontent.com/beefan/veggie-farm-assistant/master/z-screenshots/Screen%20Shot%202020-04-16%20at%208.52.46%20PM.png",
      "document": "project1.json"
    },
        {
      "name": "National Park User Site",
      "url": "https://github.com/beefan/national-park-user-site",
      "desc": "Java Web App. with frontend written in JSP/JSTL. Postgres SQL database. Site shows a list of national parks, a park detail page w/ weather, and a place for users to submit surveys. ",
      "img": require("@/assets/images/nationalpark.png"),
      "document": ""
    },
        {
      "name": "Python Twitter Bots",
      "url": "https://github.com/beefan/TwitterBots",
      "desc": `Simple Python/external API project. 
      Used Twitter Api to build three twitter bots which are no 
      longer running. https://twitter.com/InsightfulBot is all 
      that remains.`,
      "img": require("@/assets/images/insightfulbot.png"),
      "document": ""
    }
  ]
    }
  }
}
</script>

<style lang="sass">
.project-container
  display: flex
  flex-wrap: wrap
  justify-content: space-evenly
.project
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
.project:hover
  box-shadow: 3px 3px 5px white, -3px -3px 6px white
</style>