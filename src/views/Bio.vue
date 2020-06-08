<template lang="pug">
  div
    h1 Bio
    hr
    b-row.bio-row
      b-col.bio-content(sm="8")
        p If you've come this far, you probably want to know something about me. Well thanks, I'm flattered. 
        p Two words: profoundly curious. 
        p This applies to pretty much anything. If I have enough information to start to imagine how it works, I can become rapidly interested in just about anything.
        p I've spent a lot of time writing software. In fact, math/engineering/coding is the most consistent thread in my life. And I'll spend a lot more time writing code.
        p But, I also got a bachelors degree in Creative Writing. I'm fascinated by communication and language in general. This includes english metaphors in poetry as well as much more strict class definitions in computer science. 
        p Four farming seasons, I've worked on organic market farms. Soil--the microbial interactions, the carbon sequestration, and the biological transformation that happens within it-- suspends me in awe. Plus, I want to be growing my own food when society collapses. 
        p The problems I'm primarily interested in solving relate to how we can use software to create sustainable solutions to food shortages. Or how we can transform current software processes to carry less friction with users. But less friction towards self help or community connection, not less friction to a checkout screen.
        p I'm interested in how machine learning can be applied to build creative solutions to difficult problems in the human communication and food spaces.
        p I want to author a book someday and help more people grow their own food. 
        hr
      contact
    b-row
      div.timeline
        h4 brief biographical timeline 
        vue-timeline-update(
          v-for="entry,index in timeline" 
          v-bind:key="index"
          :date="new Date(entry.date)"
          :title="entry.title"
          :description="entry.desc"
          :category="entry.category"
          :color="colorCat[entry.category]"
          icon="code")
</template>

<script>
import Contact from "../components/Contact.vue"
export default {
  components: {
    "contact": Contact
  },
  data() {
    return {
      colorCat: {
        education: "blue",
        code: "red",
        tech: "orange",
        food: "purple"
      },
      timeline: [
        {
          date: "2020-04-17",
          title: "Tech Elevator Graduation",
          desc: "Graduated Tech Elevator coding bootcamp. Learned Java, javascript, Vue.js, PostgreSQL, web services, SpringMVC, CSS, HTML over 14 intensive weeks.",
          category: "code",
          link: "https://www.techelevator.com"
        },
        {
          date: "2019-11-30",
          title: "Whole Foods Market",
          desc: "Spent two years in the grocery depart. at Whole Foods learning about product management, organization, distribution, and placement. As well as performing customer service.",
          category: "food",
          link: ""
        },
        {
          date: "2019-05-09",
          title: "College Graduation",
          desc: "Graduated Ohio Wesleyan University with a B.A. in Creative Writing. Began study in Jan. 2017.",
          category: "education",
          link: "https://www.owu.edu"
        },
        {
          date: "2017-08-15",
          title: "Organic Farming Apprentice",
          desc: "Worked 2 seasons at Seminary Hill Farm as a farm apprentice where I learned how to run a 5 acre veggie farm.",
          category: "food",
          link: ""
        },
        {
          date: "2016-04-01",
          title: "Line Cook",
          desc: "Spent 1 year working as a line cook at whole foods restaurant, Northstar Cafe. Learned time management, food processing, cooking.",
          category: "food",
          link: ""
        },
        {
          date: "2015-02-15",
          title: "Sol Farm Detroit",
          desc: "Bought a house in Detroit for 3k and created urban farming experiment in Detroit. Made it one year as a market garden.",
          category: "food",
          link: "https://twitter.com/solfarmdetroit"
        },
        {
          date: "2014-12-01",
          title: "Methode Electronics",
          desc: "4 month software development internship working with Android Java, bluetooth, and google maps navigation.",
          category: "code",
          link: ""
        },
        {
          date: "2014-08-10",
          title: "Mac Professionals",
          desc: "Worked for an all Apple product technical support coming doing phone support.",
          category: "tech",
          link: ""
        },
        {
          date: "2013-10-01",
          title: "WWOOFing in OR, WA, and MI",
          desc: "Spent the summer and fall working on a small community vegetable farm in OR, a permaculture farm in the mountains of WA, a Dairy farm in MI, and an urban goat farm in Detroit.",
          category: "food",
          link: ""
        },
        {
          date: "2013-05-01",
          title: "Ohio State Help Desk",
          desc: "Worked the Tech Support Help Desk while at Ohio State. Second semester 2013 took no classes and worked the help desk full time.",
          category: "tech",
          link: ""
        },
        {
          date: "2012-12-31",
          title: "Marathon Petroleum Internship",
          desc: "4 month software development internship with Marathon learning C# and visual studio.",
          category: "code",
          link: ""
        },
        {
          date: "2012-08-25",
          title: "IBM Internship",
          desc: "3 month software development internship with IBM learning Java, Eclipse, Agile, Maven, Junit, version control.",
          category: "code",
          link: ""
        },
        {
          date: "2012-06-01",
          title: "Ohio State University",
          desc: "Studied engineering for one year taking classes in C++, Matlab, Autodesk Inventor, Math, Entrepreneurship, and Photoshop.",
          category: "education",
          link: ""
        },
        {
          date: "2011-09-01",
          title: "Wright Patterson Airforce Base",
          desc: "Spent the summer being mentored by the Sensors Directorate doing research on wireless sensor networks. Learned python, bash, and linux.",
          category: "code",
          link: ""
        },
        {
          date: "2011-06-01",
          title: "High School Graduation",
          desc: "Graduated Kettering Fairmont High School.",
          category: "education",
          link: ""
        },
        {
          date: "2009-06-08",
          title: "Calculator Programs",
          desc: "Published my first programs on TIcalc.org. Chemistry helper, Alegbra helper, BlackJack, and Etch-a-Sketch.",
          category: "code",
          link: "https://www.ticalc.org/archives/files/fileinfo/419/41951.html"
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.bio-content, .timeline
  margin-top: 2%
  margin-left: 3% 
  margin-right: 3%
  padding: 2%
  background: #f8f9fa
  color: black
  border-radius: 5px
  text-align: left
.bio-row
  justify-items: space-between
</style>