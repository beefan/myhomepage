<template lang="pug">
  b-col.contact(sm="2")
    h4 Contact
      hr
      ul.contact-list(@click="contactNavigation")
        li
          p email
          font-awesome-icon(:icon="['fas', 'envelope']") 
        li 
          p github
          font-awesome-icon(:icon="['fab', 'github']") 
        li 
          p strava
          font-awesome-icon(:icon="['fab', 'strava']") 
        li 
          p twitter
          font-awesome-icon(:icon="['fab', 'twitter']") 
        li 
          p linkedin
          font-awesome-icon(:icon="['fab', 'linkedin']") 
</template>

<script>
export default {
  data() {
      return {
        social: {
          email: "dev@brandonfannin.com",
          github: "https://github.com/beefan",
          strava: "https://www.strava.com/athletes/brandonfannin",
          twitter: "https://twitter.com/btfannin",
          linkedin: "https://linkedin.com/in/brandon-fannin",
        }
      }
  },
  methods: {
    contactNavigation(event) {
      let clicked = event.target.innerText;
      let url = this.social[event.target.innerText]

      if (clicked === "email") {
        url = "mailto:" + url
      }
      if (url) {
          const win = window.open(url, '_blank');
          win.focus();
      }
    }
  }
}
</script>

<style lang="sass">
.contact
  background-color: #f8f9fa
  color: black
  margin: 2%
  padding: 2%
  border-radius: 5px
.contact-list
  list-style: none
  text-align: right
  li
    display: flex
    justify-content: space-evenly
  li:hover
    opacity: 50%

</style>