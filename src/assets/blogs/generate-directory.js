const fs = require('fs');

updateBlogDirectory();

function updateBlogDirectory() {
    const dir = "directory.json";
    let directory = null;
    try {
        directory = require(`./${dir}`);
    } catch (err) {
        directory = {
            "files": [],
            "tags": {}
        }
    }
    const newFiles = getNewFiles(directory);
    newFiles.forEach(filename => {
        addNewFileToDirectory(directory, filename)
    });

    fs.writeFileSync(`./src/assets/blogs/${dir}`, JSON.stringify(directory));
}

function getNewFiles(directory) {
    const files = getAllMarkdownFiles();
    return files.filter(x => !directory.files.includes(x));
}

function getMetadataFromFile(filename) {
    const path = './public/blog/' + filename;
    const file = fs.readFileSync(path, 'utf8');

    const indexOfTags = file.indexOf(':tags') + 5;
    const indexOfEndOfTags = file.indexOf('\n', indexOfTags);

    const indexOfDesc = file.indexOf(':desc') + 5;
    const indexOfEndOfDesc = file.indexOf('\n', indexOfDesc);

    const tags = file.substring(indexOfTags, indexOfEndOfTags)
        .trim()
        .split(', ');

    const desc = file.substring(indexOfDesc, indexOfEndOfDesc).trim();

    return { tags: tags, desc: desc };
}

function getAllMarkdownFiles() {
    const files = fs.readdirSync('./public/blog/');
    return files.filter(file => file.substring(file.length - 3) == ".md");
}

function addNewFileToDirectory(directory, filename) {
    const metadata = getMetadataFromFile(filename);

    directory.files.push({ name: filename, desc: metadata.desc, tags: metadata.tags });

    const index = directory.files.length - 1;
    metadata.tags.forEach(tag => {
        directory.tags[tag] ? directory.tags[tag].push(index) : directory.tags[tag] = [index];
    });
}