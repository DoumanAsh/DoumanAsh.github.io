"use strict";

const path = require('path');

const MiniCssExtract = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const PUBLIC = path.resolve(__dirname, 'public');
const SRC = path.resolve(__dirname, 'src');

const css_loader = {
    test: /\.sss/,
    use: [
        MiniCssExtract.loader,
        'css-loader',
        'postcss-loader'
    ]
};

const img_loader = {
    test: /\.(jpe?g|png|svg|ico)$/,
    loader: 'file-loader',
    options: {
        useRelatievePath: false,
        outputPath: "img/",
        name: '[name].[ext]',
    },
};

const raw_loader = {
    test: /\.md?$/,
    use: 'raw-loader'
};

const pug_loader = {
    test: /\.pug?$/,
    include: path.join(SRC, 'templates'),
    use: [
        'pug-loader'
    ]
};

module.exports.entry = {
    app: `${SRC}/js/init.js`
};

module.exports.output = {
    filename: '[name].bundle.js',
    path: PUBLIC
};

module.exports.module = {
    rules: [
        css_loader,
        img_loader,
        pug_loader,
        raw_loader
    ]
};

function html_pug_plug(title, template, opts) {
    const options = Object.assign({
        title,
        template: path.join(SRC, template),
        filename: path.basename(template, '.pug') + '.html',
    }, opts);
    return new HtmlWebpackPlugin(options);
}

const TITLE = "Douman";
const STATIC_HTML = {
    inject: false
};

const get_blog_posts = require('./utils/get_blog_posts.js');

module.exports.plugins = [
    ...get_blog_posts(`${SRC}/templates/blog/post.pug`, `${SRC}/templates/blog/index.pug`),
    html_pug_plug(TITLE + ' | Home', "templates/index.pug", STATIC_HTML),
    html_pug_plug(TITLE + ' | Contacts', "templates/contacts.pug", STATIC_HTML),
    html_pug_plug(TITLE + ' | Gallery', "templates/gallery.pug", STATIC_HTML),
    html_pug_plug(TITLE + ' | Goodies', "templates/goodies.pug", STATIC_HTML),
    html_pug_plug("Arthur's CV", "templates/cv.pug", STATIC_HTML),
    html_pug_plug("Page not found", "templates/404.pug", STATIC_HTML),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async'
    }),
    new MiniCssExtract({
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
];

module.exports.devServer = {
    port: 3333,
    compress: true
};

module.exports.devtool = "cheap-source-map";
