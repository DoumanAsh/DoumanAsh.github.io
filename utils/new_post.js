
const fs = require('fs');
const path = require('path');

const BLOG_PATH = path.resolve(__dirname, '..', 'blog');

const USAGE = `usage: new_post <name>

Post will be created with name <date>__<name>.md
`;

function str_first_let_up(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Executes main.
 *
 * @param {Array} args Arguments.
 * @returns {String|null} Path to new blog
 */
function main(args) {
    if (args.length === 0) {
        console.log(USAGE);
        return null;
    }

    const name = args.map(str_first_let_up).join(" ");
    const date = new Date();
    const file_name = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}__${name.replace(/\s+/g, '-')}.md`;
    const file_content = `# ${name}`;
    const file_path = path.join(BLOG_PATH, file_name);

    fs.writeFileSync(file_path, file_content);

    return file_path;
}

if (require.main === module) {
    const new_post = main(process.argv.splice(2));
    if (new_post !== null) {
        console.log("New post ---> %s", new_post);
    }
} else {
    module.exports = main;
}
