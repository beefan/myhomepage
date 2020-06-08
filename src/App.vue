<template lang="pug">
div#app
  b-navbar#nav(toggleable="sm" type="light" variant="light")
    b-navbar-toggle(target="nav-text-collapse")
    b-navbar-brand.brand Brandon Fannin
    b-collapse#nav-text-collapse(is-nav)
      b-navbar-nav
        b-nav-item(to="/") Home
      b-navbar-nav
        b-nav-item(to="/projects") Projects
      b-navbar-nav
        b-nav-item(to="/blog") Blog
      b-navbar-nav
        b-nav-item(to="/bio") Bio
  router-view
  hr
  h4.footer brandon fannin © 2020
</template>
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap');
#app
  font-family: 'Noto Sans JP', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #fff
  background: repeating-linear-gradient(45deg, #f4a261, #f4a261 50%, #4580c0 50%, #4580c0)
  [class^="gb-"]:not(.gb-base-icon)
    font-family: 'Noto Sans JP', sans-serif !important;

#nav
  width: 100%
  a
    font-weight: bold
    color: #f4a261
  a.router-link-exact-active 
    color: #4580c0
  .brand
    font-weight: bold

.footer 
  padding: 2%
</style>
