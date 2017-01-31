//Generate waifu data before running brunch.
module.exports = {
    files: {
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
