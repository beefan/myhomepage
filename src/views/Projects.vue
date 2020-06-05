<template lang="pug">
  div
    h1 Projects
    div(v-for="project in projects.projects")
      p {{ project.url }}
      p {{ project.name }}
      p {{ project.desc }}
      p {{ project.document }}
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

<style>

</style>