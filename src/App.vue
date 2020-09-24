<template lang="pug">
#app
  b-navbar#nav(toggleable="sm", type="light", variant="light")
    b-navbar-brand.brand(href="/") Brandon Fannin
  router-view
  .footer
    hr
    h4 brandon fannin © 2020
</template>
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap')
#app
  font-family: 'Noto Sans JP', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #000
  font-family: 'Noto Sans JP', sans-serif !important

#nav
  width: 100%
  a
    font-weight: bold
    color: #f4a261
  a.router-link-exact-active
    color: #4580c0
  .brand
    color: #4580c0
    font-weight: bold

.footer
  padding: 2%
  width: 100%
  position: fixed
  bottom: 0px
  h4
    font-size: .9rem
</style>
