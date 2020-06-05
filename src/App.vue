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
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap');
#app
  font-family: 'Noto Sans JP', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #fff
  background: linear-gradient(#4580c0 50%, #f4a261 50%)
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;

#nav
  width: 100%
  a
    font-weight: bold
    color: #f4a261
  a.router-link-exact-active 
    color: #4580c0
  .brand
    font-weight: bold
</style>
