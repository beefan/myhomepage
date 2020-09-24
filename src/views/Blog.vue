<template lang="pug">
b-container(v-if="tagPalette != null")
  b-row#palette-main
    b-form.tag-palette
      b-button.mb-2.mr-sm-2.mb-sm-2(
        @click="showFiles",
        v-for="tag in tagPalette",
        :size="tag.count < maxCount ? 'sm' : tag.count > 2 * maxCount ? 'lg' : 'md'",
        pill,
        variant="outline-info"
      ) {{ tag.tag }}
  b-row#file-list(v-if="filesToShow")
    ul
      li.file-list-item(@click="processFile", v-for="file in filesToShow") {{ file }}
  b-row#file-view(v-if="loadedFile")
    VueShowdown(:markdown="loadedFile")
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
    }
  },
  mounted() {
    this.fetchPalette();
  },
  methods: {
    fetchPalette() {
      this.tagPalette = blog.getTags();
    },
    showFiles(event) {
      const tag = event.target.innerText;
      this.filesToShow = blog.getFilesByTag(tag);
    },
    async processFile(event) {
      const filename = event.target.innerText;

      const res = await fetch("/blog/" + filename);
      const fileText = await res.text();

      const beginIndex = fileText.indexOf("\n\n") + 1;
      this.loadedFile = fileText.substring(beginIndex).trim();
    }
  }
};
</script>

<style lang="sass">
#palette-main, #file-list, #file-view
  display: flex
  align-items: center
  justify-content: space-around
.tag-palette
  margin: 5%
.file-list-item
  list-style-type: none
  cursor: pointer
</style>