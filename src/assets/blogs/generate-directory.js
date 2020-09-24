const fs = require('fs');

updateBlogDirectory();

function updateBlogDirectory() {
    let directory = require('./directory.json');

    newFiles = getNewFiles(directory);
    newFiles.forEach(filename => {
        addNewFileToDirectory(directory, filename)
    });

    fs.writeFileSync('./src/assets/blogs/directory.json', JSON.stringify(directory));
}

function getNewFiles(directory) {
    files = getAllMarkdownFiles();
    return files.filter(x => !directory.files.includes(x));
}

function getTagsFromFile(filename) {
    path = './public/blog/' + filename;
    file = fs.readFileSync(path, 'utf8');

    indexOfTags = file.indexOf(':tags') + 5;
    indexOfEndOfTags = file.indexOf('\n', indexOfTags);

    tags = file.substring(indexOfTags, indexOfEndOfTags)
        .trim()
        .split(', ');

    return tags;
}

function getAllMarkdownFiles() {
    const files = fs.readdirSync('./public/blog/');
    return files.filter(file => file.substring(file.length - 3) == ".md");
}

function addNewFileToDirectory(directory, filename) {
    directory.files.push(filename);
    tags = getTagsFromFile(filename);
    index = directory.files.length - 1;
    tags.forEach(tag => {
        directory.tags[tag] ? directory.tags[tag].push(index) : directory.tags[tag] = [index];
    });
}