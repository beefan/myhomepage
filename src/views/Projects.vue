<template lang="pug">
  div
    h1 Projects
    b-col.project(v-for="project in projects.projects" v-bind:key="project.url" sm="4")
      h4 {{ project.name }}
      hr
      img(:src="project.img")
      p {{ project.desc }}
</template>

<script>
export default {
  data() {
    return {
      projects: require('../assets/projects.json')
    }
  }
}
</script>

<style lang="sass">
.project
  margin: 2%
  padding: 2%
  border-radius: 5px
  background-color: #f8f9fa
  color: black
  img
    margin-bottom: 5px
</style>