# DoumanAsh.github.io Generator

[![Build Status](https://travis-ci.org/DoumanAsh/DoumanAsh.github.io.svg?branch=generator2)](https://travis-ci.org/DoumanAsh/DoumanAsh.github.io)

Just generator of my site.

## JS Free

Yep, for now there is no JavaScript.

All animations are done through CSS alone.

## Data generation

My generator heavily uses jade for HTML generation.

### Waifu Gallery

Script `ci\get_images.js` is used to retrieve my [imgur album](http://imgur.com/a/U6D9Y) information.
It saves in file `waifu.json` in root dir of project.

The file is then used to generate image gallery.
Gallery itself is bunch of divs with unique IDs.
CSS target selector is used to display particular image.
Each div consist of links to prev/next image and div with image itself.
It uses CSS `background-image` for lazy load.

### Goodies (aka Portfolio)

Data is located in `data/goodies.json`
It is used to generate both links and sub-pages for goodies.

Structure of each element:

- **name** - Name of element for reader;
- **img** - Image link for Goodies main page link;
- **title** - Description of goodie which is used as title to links and goodie page;
- **id** - ID of goodie to be used as unique div ID for navigation. Result format `<id>`;
- **data** - List with elements of goodie page:
    - **name** - Name of goodie;
    - **link** - Link to project;
    - **description** - Description of goodie.

### CV

Data is located in `data/cv.json`
The json consist of keys for each CV template section with all information.

Each section has own data and differs from one another.
Due to that it is rather complex.
Too bothersome to describe it, better to look at json and CV template.
