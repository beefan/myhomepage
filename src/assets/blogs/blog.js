const blog = {
    directory: require('./directory.json'),
    getTags() {
        let result = [];
        for (let tag in this.directory.tags) {
            result.push({ "tag": tag, "count": this.directory.tags[tag].length });
        }
        return result;
    },
    getFilesByTag(tag) {
        let files = this.directory.tags[tag];
        return files.map(fileIndex => this.directory.files[fileIndex]);
    },
    getMaxTagCount() {
        let max = 0;
        for (let tag in this.directory.tags) {
            let len = this.directory.tags[tag].length
            if (len > max) max = len
        }
        return max;
    },
    findFileByName(name) {
        const files = this.directory.files.filter(file => file.name == name);
        return files[0] ? files[0] : 'filenotfound';
    }
}

export default blog;