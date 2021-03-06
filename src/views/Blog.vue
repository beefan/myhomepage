<template lang="pug">
b-container(v-if="tagPalette != null")
  b-row.nav-links
    a.home-link(href="/") Home /
    a.blog-link(href="/blog") Blog
  .post-header(v-if="loadedFile")
    b-row.title
      h1 {{ loadedFile.title }}
    b-row.desc
      p {{ loadedFile.desc }}
  b-row#palette-main(:style="loadedFile ? 'margin: 1%;' : 'margin: 5%;'")
    b-form.tag-palette
      b-button.mb-2.mr-sm-2.mb-sm-2(
        @click="showFiles",
        v-for="tag in tagPalette",
        :size="tag.count < maxCount ? 'sm' : tag.count > 2 * maxCount ? 'lg' : 'md'",
        pill,
        variant="outline-info"
      ) {{ tag.tag }}
  b-row#file-list(v-if="filesToShow")
    b-list-group
      b-list-group-item.file-list-item(
        button,
        @click="processFile",
        v-for="(file, index) in filesToShow",
        :id="index"
      ) 
        h4 {{ file.title }}
        p {{ file.desc }}
  hr(v-if="loadedFile")
  b-row.date(v-if="loadedFile")
    p {{ loadedFileDate }}
    .share-icon(@click="shareLink")
      b-icon-box-arrow-up
    p.link-text
    input(type="hidden")
  b-row#file-view(v-if="loadedFile")
    b-container
      VueShowdown(:markdown="loadedFile.text")
</template>

<script>
import blog from "./../assets/blogs/blog";
export default {
  data() {
    return {
      tagPalette: null,
      filesToShow: null,
      loadedFile: null
    };
  },
  computed: {
    maxCount() {
      return blog.getMaxTagCount() / 3;
    },
    loadedFileDate() {
      const date = new Date(this.loadedFile.date);
      return date.toLocaleString("default", {
        dateStyle: "long"
      });
    }
  },
  mounted() {
    if (this.$route.params.post) {
      const file = blog.findFileByName(this.$route.params.post);
      if (file == "filenotfound") {
        this.$bvToast.toast("explore other posts on this blog", {
          title: "No Post Exists With that Name",
          variant: "danger",
          toaster: "b-toaster-top-center",
          href: "/blog"
        });
      } else {
        file.title = this.formatTitle(file.name);
        this.loadFile(file);
      }
    } else {
      this.fetchPalette();
    }
  },
  methods: {
    fetchPalette() {
      this.tagPalette = blog.getTags();
    },
    formatTitle(name) {
      const endex = name.indexOf(".md");
      const index = name.lastIndexOf("-") + 1;

      return name
        .substring(index, endex)
        .split(/(?=[A-Z0-9])/)
        .join(" ")
        .trim();
    },
    showFiles(event) {
      this.loadedFile = null;
      const tag = event.target.innerText;
      this.filesToShow = blog.getFilesByTag(tag);
      this.filesToShow.map(file => (file.title = this.formatTitle(file.name)));
      this.tagPalette = Array.from(
        new Set(this.filesToShow.map(x => x.tags).flat())
      ).map(tag => ({ tag: tag, count: 1 }));
    },
    processFile(event) {
      const fileIndex = event.currentTarget.id;
      const file = this.filesToShow[fileIndex];
      this.loadFile(file);
    },
    async loadFile(file) {
      const res = await fetch("/blog/" + file.name);
      const fileText = await res.text();

      const beginIndex = fileText.indexOf("\n\n") + 1;
      this.loadedFile = {
        name: file.name,
        text: fileText.substring(beginIndex).trim(),
        desc: file.desc,
        title: file.title,
        date: file.name.substring(0, file.name.lastIndexOf("-"))
      };
      this.filesToShow = null;
      this.tagPalette = file.tags.map(x => ({ tag: x, count: 1 }));
    },
    shareLink(event) {
      const link = event.currentTarget.nextSibling.nextSibling;
      console.log(link);
      link.type = "text";
      link.value = `https://brandonfannin.com/blog/post/${this.loadedFile.name}`;

      link.focus();
      link.select();
      document.execCommand("copy");
      link.type = "hidden";
      link.previousSibling.innerText = "link copied!";

      setTimeout(() => {
        link.value = "";
        link.previousSibling.innerText = "";
      }, 3700);
    }
  }
};
</script>

<style lang="sass">
#palette-main, #file-list, #file-view, .post-header
  display: flex
  align-items: center
  justify-content: space-around
.file-list-item
  list-style-type: none
  cursor: pointer
#file-view
  margin-bottom: 10%
.post-header, #file-view
  padding-top: 2%
  flex-flow: column
.date, #file-view
  text-align: left
.nav-links, .date
  padding-left: inherit
.blog-link:hover, .home-link
  color: #f4a261
.home-link:hover
  color: #4580c0
.home-link, .blog-link
  padding-top: 3%
  font-weight: bold
.share-icon
  padding-left: 1rem
  font-size: 1.1rem
.share-icon:hover
  font-size: 1.5rem
  margin-top: -.5rem
  cursor: pointer
.link-text
  color: #4580c0
  font-weight: bold
  padding-left: 1rem
#error-message
  color: red
img
  width: 100%
</style>