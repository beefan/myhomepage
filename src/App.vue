<template lang="pug">
div#app
  b-navbar#nav(toggleable="sm" type="light" variant="warning")
    b-navbar-toggle(target="nav-text-collapse")
    b-navbar-brand.brand brandonfannin.com
    b-collapse#nav-text-collapse(is-nav)
      b-navbar-nav
        b-nav-item(to="/") Home
      b-navbar-nav
        b-nav-item(to="/projects") Projects
      b-navbar-nav
        b-nav-item(to="/blog") Blog
      b-navbar-nav
        b-nav-item(to="/about") Bio
  router-view
</template>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin: 0px
  padding: 0px

#nav
  width: 100%
  a
    font-weight: bold
    color: #f4a261
  a.router-link-exact-active 
    color: #fff
  .brand
    color: #4580c0
    font-weight: bold
</style>
