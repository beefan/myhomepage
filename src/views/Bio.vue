<template lang="pug">
  div
    h1 Bio
    hr
    b-row
      b-col.bio-content(sm="8")
        p If you've come this far, you probably want to know something about me. Well thanks, I'm flattered. 
        p Two words: profoundly curious. 
        p This applies to pretty much anything. If I have enough information to start to imagine how it works, I can become rapidly interested in just about anything.
        p I've spent a lot of time writing software. In fact, math/engineering/coding is the most consistent thread in my life. And I'll spend a lot more time writing code.
        p But, I also got a bachelors degree in Creative Writing. I'm fascinated by communication and language in general. This includes english metaphors in poetry as well as much more strict class definitions in computer science. 
        p Four farming seasons, I've worked on organic market farms. Soil--the microbial interactions, the carbon sequestration, and the biological transformation that happens within it-- fascinates me greatly. Plus, I want to be growing my own food when society collapses. 
        p The problems I'm primarily interested in solving relate to how we can use software to create sustainable solutions to food shortages. Or how we can transform current software processes to carry less friction with users. But less friction towards self help or community connection, not less friction to a checkout screen.
        p I'm interested in how machine learning can be applied to build creative solutions to difficult problems in the human communication and food spaces.
        p Before I die, I want to write a book and have a yard with a magnificent garden.
        hr 
        h4 brief biographical timeline 
        ul
          li
            p 2020: Attended <a :href="links.te">Tech Elevator</a> coding bootcamp. Learned Java, javascript, Vue.js, PostgreSQL, web services, SpringMVC, CSS, HTML.
          li
            p 2017-2019: Studied Biology and Creative Writing at <a :href="links.owu">Ohio Wesleyan University</a>. Ultimately obtained my Create Writing B.A.
            p At the same time, I worked in the grocery department at Whole Foods Market.
          li 
            p 2016-2017: Farm Apprentice for <a :href="links.shf">Methodist Seminary School in Ohio.</a> Learned how to operate a 5 acre vegetable farm using market and community-support profit models. 
          li
            p 2015: Left Detroit and the Sol Farm project. 
            p Worked as a line cook for <a :href="links.northstar">Northstar Cafe.</a>
          li
            p 2014: Bought a house in Detroit for 3k. Started an urban farm project called <a :href="links.solfarm">Sol Farm</a>.
            p Software development internship with <a :href="links.methode">Methode Electronics</a> working with Android Java, bluetooth, and google maps navigation. 
          li
            p 2013 Fall: Worked on an organic flower farm in Oregon.
            p Traveled to Detroit to work on a small organic urban farm called <a :href="links.knucklehead">Knucklehead Farm</a>.
          li
            p 2013 Summer: Traveled throughout the U.S. for six weeks car camping and visiting National Parks. 
            p Worked on a small organic community farm called <a :href="links.dharma">the Dharmalaya</a>. Spent a few weeks on <a :href="links.feral">Feral Farm</a>.
          li
            p 2013 Spring: Worked the Tech Support Help Desk at OSU, but dropped out of classes.
          li
            p 2012 Fall: Software development internship with <a :href="links.marathon">Marathon Petroleum</a> learning C# and Visual Studio. 
          li 
            p 2012 Summer: Software development internship with <a :href="links.ibm">IBM</a> learning Java, Eclipse, Agile, Maven, Junit, version control. 
          li
            p 2011-2012 Spring: Studied computer science at <a :href="links.osu">Ohio State.</a> C++, Matlab, Autodesk Inventor, Entrepreneurship, Math, Photoshop. 
            p Worked the Tech Support Help Desk part time.
          li
            p 2011 Summer: Worked as an intern at <a :href="links.wrightpatt">Wright Patterson Air Force Base</a> in the Sensors Directorate. Mentored by the team doing research on wireless sensor networks, I learned python, linux, and bash scripting. 
          li
            p 2011 Spring: Graduated Kettering Fairmont High School.
          li
            p 2009: "Published" my first <a :href="links.ticalc">programs on TIcalc.org.</a> Chemistry helper, Alegbra helper, BlackJack, and Etch-a-Sketch.
      contact
</template>

<script>
import Contact from "../components/Contact.vue"
export default {
  components: {
    "contact": Contact
  },
  data() {
    return {
      links: {
        ticalc: "https://www.ticalc.org/archives/files/fileinfo/419/41951.html",
        solfarm: "https://twitter.com/solfarmdetroit",
        knucklehead: "http://www.uixdetroit.com/people/rietschumack.aspx",
        feral: "https://www.feralfarmagroforestry.com/index.html",
        dharma: "https://dharmalaya.org/",
        shf: "https://www.seminaryhillfarm.org/",
        northstar: "https://www.thenorthstarcafe.com/",
        ibm: "https://www.ibm.com",
        marathon: "https://www.marathonpetroleum.com",
        methode: "https://www.methode.com",
        wrightpatt: "https://www.wpafb.af.mil/",
        te: "https://www.techelevator.com",
        owu: "https://www.owu.edu",
        osu: "https://www.osu.edu"
      }
    }
  }
}
</script>

<style lang="sass">
.bio-content
  margin: 2%
  margin-left: 6%
  padding: 2%
  background: #f8f9fa
  color: black
  border-radius: 5px
  text-align: left
</style>