# Drag and Drop Package

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

It is simple React drag and drop package.

## [**Live Demo**](https://rasoul678.github.io/dragdropme/)

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

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const Javascript = () => <div>This a react component</div>

const items = {
  'group one' : [{ id: '1', value: <Javascript /> }],
  'group two' : [{ id: '2', value: 'Typescript' }],
  'group three' : [{ id: '3', value: 'ReactJS' }],
  'group four' : [{ id: '4', value: 'NextJS' }],
  'group five' : [{ id: '5', value: 'VueJS' }],
}

const DnDItem = ({ item }) => (<div>{item?.value}</div>);

root.render(
    <React.StrictMode>
        <DnDMaker
          items={items}
          renderItem={<DnDItem />}
          animation={{
            enable: true,
            duration: 200
          }}/>
    </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/dragdropme
[npm-image]: https://img.shields.io/npm/v/dragdropme
[github-license]: https://img.shields.io/github/license/Rasoul678/dragdropme
[github-license-url]: https://github.com/Rasoul678/dragdropme/blob/master/LICENSE
[github-build]: https://github.com/Rasoul678/dragdropme/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/Rasoul678/dragdropme/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/dragdropme
