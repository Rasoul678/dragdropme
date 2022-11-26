# Drag and Drop Package

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

This repo is the example of the article ["How to create and publish React Typescript npm package with demo and automated build"](https://medium.com/@igaponov/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca).

You can clone it and step by step create your own NPM package and publish it.

It is simple React drag and drop package.

[**Live Demo**](https://rasoul678.github.io/dragdrop/)

## Installation:

```bash
npm install dragdropme --save-dev
```

or

```bash
yarn add -D dragdropme
```

## Usage :

Add `DnDMaker` to your component:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { DnDMaker } from 'dragdropme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const groups = ['group one', 'group two', 'group three', 'group four', 'group five']
const items = [
  { id: '1', group: groups[0], value: 'Chicken' },
  { id: '4', group: groups[1], value: 'Rhino' },
  { id: '6', group: groups[2], value: 'Ostrich' },
  { id: '8', group: groups[3], value: 'Sandwich' },
  { id: '11', group: groups[4], value: 'Ostrich' },
]
root.render(
    <React.StrictMode>
        <DnDMaker
            defaultItems={items}
            groups={groups}
        />
    </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/my-react-typescript-package
[npm-image]: https://img.shields.io/npm/v/my-react-typescript-package
[github-license]: https://img.shields.io/github/license/gapon2401/my-react-typescript-package
[github-license-url]: https://github.com/gapon2401/my-react-typescript-package/blob/master/LICENSE
[github-build]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/gapon2401/my-react-typescript-package/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/my-react-typescript-package