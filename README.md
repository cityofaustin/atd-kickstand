# ATD DTS ADMIN COMPONENTS & THEME

### [Visit the Component Documentation (aka Storybook) here](https://5f3da07f2d377100223182dd-fdlsdzujeh.chromatic.com/)

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

### TODO

- [ ] Set up Github Action to auto deploy updates.
- [ ] Explore how to import component library into other repositories and projects.
- [ ] Learn more about Chromatic deployment and hosting
- [ ] Starting making MOPED components!!

---

## License

MIT © [](https://github.com/)
