# @meanie/multer-mime-types-filter

[![npm version](https://img.shields.io/npm/v/@meanie/multer-mime-types-filter.svg)](https://www.npmjs.com/package/@meanie/multer-mime-types-filter)
[![node dependencies](https://david-dm.org/meanie/multer-mime-types-filter.svg)](https://david-dm.org/meanie/multer-mime-types-filter)
[![github issues](https://img.shields.io/github/issues/meanie/multer-mime-types-filter.svg)](https://github.com/meanie/multer-mime-types-filter/issues)
[![codacy](https://img.shields.io/codacy/c0decdb116194cc9b1e7c1d53b6a8b3d.svg)](https://www.codacy.com/app/meanie/multer-mime-types-filter)


Helper to create a mime types filter for Multer given an array of mime types

![Meanie](https://raw.githubusercontent.com/meanie/meanie/master/meanie-logo-full.png)

## Installation

You can install this package using `yarn` or `npm`.

```shell
#yarn
yarn add @meanie/multer-mime-types-filter

#npm
npm install @meanie/multer-mime-types-filter --save
```

## Usage

```js
const multer = require('multer');
const mimeTypesFilter = require('@meanie/multer-mime-types-filter');

/**
 * Upload middleware
 */
upload(req, res, next) {

  //Get locals
  const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  //Create upload middleware
  let upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: mimeTypesFilter(mimeTypes),
  }).single('file');

  //Use middleware
  upload(req, res, next);
}
```

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [@meanie/multer-mime-types-filter issue tracker](https://github.com/meanie/multer-mime-types-filter/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Sponsor

This package has been kindly sponsored by [Hello Club](https://helloclub.com?source=meanie), an [all in one club and membership management solution](https://helloclub.com?source=meanie) complete with booking system, automated membership renewals, online payments and integrated access and light control. Check us out if you happen to belong to any kind of club or if you know someone who helps run a club!

## License

(MIT License)

Copyright 2016-2020, Adam Reis
