# ATD DTS ADMIN COMPONENTS & THEME

### [Visit the Component Documentation (aka Storybook) here](https://master--5f3da07f2d377100223182dd.chromatic.com/)

Our Storybook instance is hosted on Chromatic. [Here is Storybook deployment documentation.](https://www.learnstorybook.com/intro-to-storybook/react/en/deploy/)

[![NPM](https://img.shields.io/npm/v/atd-kickstand.svg)](https://www.npmjs.com/package/atd-kickstand) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Made with create-react-library

## Install

```bash
npm install --save atd-kickstand
```

## Usage

```jsx
import React, { Component } from "react";

import MyComponent from "atd-kickstand";
import "atd-kickstand/dist/index.css";

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}
```

### Local Development

Local development involves running rollup in watch mode from the root project folder and running the built-in React app in `/example/` concurrently. This will automatically compile new changes to the library in to `/dist/` folder and make them available for import in the example app.

To run rollup in watch mode, in the root project folder, run:

`npm start`

Then, to start the example app developement server in a separate tab or terminal, run:

`cd example`
`npm install` (only first time)
`npm start`

### Importing in a separate repository for local development

To import this library into another local repository, run:

`npm install --save cityofaustin/atd-kickstand#<branch name>`

The branch name can point to `main` or another branch that you are developing.

---

## Storybook

### Running locally

`yarn storybook`

http://localhost:6006/

#### Test

`yarn test`

#### Generate static build

`yarn build-storybook`

### Developing components

1. Create a React component and test file in `/src/components`
2. Create a storybook file in `src/stories`

---

## License

MIT © [](https://github.com/)
