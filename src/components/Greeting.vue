<template lang="pug">
  div.site-greeting
    h3 {{ displayGreeting }}
</template>

<script>
export default {
  data() {
    return {
      greeting: 
      `
      Hello there!
      Looks like you found my website.
      My name is Brandon. I make software stuff; enjoy running, reading, writing, camping, and gardening.
      Take a look around. You'll find some stuff I've made or written, and some info about me.
      Thanks for visiting!
      `,
      displayGreeting: '',
      typingSpeed: '90'
    }
  },
  methods: {
    timer(t) {
      return new Promise(resolve => setTimeout(resolve, t) )
    },
    async loadGreeting(){
      console.log('loadGreeting')
      for (let i = 0; i < this.greeting.length; i++) {
        let timing = this.typingSpeed;
        let thisChar = this.greeting.substring(i, i + 1);
        switch(thisChar) {
          case '.':
          case ';':
          case '!':
            timing*=3;
            break;
          case ',':
            timing*=2;
            break;
        }
        await this.timer(timing);
        this.displayGreeting += thisChar;
      }
    },
  },
  created() {
    this.loadGreeting();
  }
}
</script>

<style lang="sass">
.site-greeting
  background-color: #f8f9fa
  border-radius: 3px
  margin: 2%
  padding: 5%
  color: black
  font-family: 'Noto Sans JP', sans-serif
</style>