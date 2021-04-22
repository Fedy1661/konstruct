const { src, dest, series, parallel, watch } = require('gulp')
const gulpSass = require('gulp-sass')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const sync = require('browser-sync').create()
const pug = require('gulp-pug')

function html() {
    // return src('src/index.html')
    //     .pipe(htmlmin({ collapseWhitespace: true }))
    //     .pipe(dest('dist/'))
    return src('src/index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(dest('dist/'))
}

function scss() {
    return src('src/scss/**.scss').pipe(gulpSass()).pipe(dest('dist'))
}

function clean() {
    return del('dist')
}

function server() {
    sync.init({ server: './dist' })

    watch('src/**/*.pug', html).on('change', sync.reload)
    watch('src/scss/**.scss', scss).on('change', sync.reload)
}

function fonts() {
    return src('src/fonts/**').pipe(dest('dist/fonts'))
}
function images() {
    return src('src/images/**').pipe(dest('dist/images'))
}

exports.default = series(clean, parallel(html, scss, fonts, images), server)
