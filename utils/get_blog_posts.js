"use strict";

const fs = require('fs');
const path = require('path');

const date_format = require('dateformat');

const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Retrieves blog posts to generate HTMLs
 *
 * @param {String} template Path to blog post template.
 * @param {String} blog_index Path to blog index tempalte.
 * @return {Array} webpack HTML objects.
 */
function get_blog_posts(template, blog_index) {
    const blog_dir = path.join(__dirname, '..', 'blog');
    const dir_list = fs.readdirSync(blog_dir);
    const result = dir_list.map((name) => {
        const basename = path.basename(name, '.md');
        let [date, title] = basename.split('__');
        const filename = `blog/${basename}.html`;
        date = date_format(new Date(date), 'mediumDate');
        title = `${title.replace(/-/g, ' ')} | ${date}`;

        const _post = {
            path: name,
            date
        };

        return new HtmlWebpackPlugin({
            title,
            template,
            filename,
            inject: false,
            _post
        });
    });

    const blog_page = new HtmlWebpackPlugin({
        title: "Douman | Blog",
        template: blog_index,
        inject: false,
        filename: `blog/${path.basename(blog_index, '.pug')}.html`,
        _posts: result.map(({options}) => {
            return {
                title: options.title.split(' | ')[0],
                date: options._post.date,
                filename: path.basename(options.filename)
            };
        })
    });

    result.push(blog_page);

    return result;
}

module.exports = get_blog_posts;
