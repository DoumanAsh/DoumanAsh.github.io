//Generate waifu data before running brunch.
module.exports = {
    files: {
        javascripts: {
            joinTo: 'app.js'
        },
        stylesheets: {
            joinTo: 'style.css'
        }
    },

    conventions: {
        ignored: [
            '_*.*',
            'test/**/*.js',
        ],
        assets: [
            /^app\/assets/,
            'app/templates/',
            'app/templates/**/*.jade'
        ],
    },

    plugins: {
        babel: {
            presets: ['es2015'],
            pattern: /^app\/js\/.*\.js$/
        },
        stylus: {
            includeCss: true,
            plugins: ['autoprefixer-stylus']
        },
        eslint: {
            pattern: /^app\/.*\.js$/,
            warnOnly: true
        },
        jade: {
            staticBasedir: 'app/templates',
            noRuntime: true,
            locals: {
                require: require,
                root_dir: __dirname
            }
        }
    }
};
