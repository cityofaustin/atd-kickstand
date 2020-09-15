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

### Importing in a separate repository for local development

To develop locally and import into another local target repository, clone this repository and navigate to the project folder. Then, run:

`npm link`

For the target app, navigate to the project folder of the app you want to develop within and add `atd-kickstand` as a dependency in `package.json` (if it is not already a dependency). Then, run:

`npm link atd-kickstand`

To unlink:
**Note that `unlink` is an alias of `uninstall`**

a. If the target app already had this package as a dependency, you need to unlink the local package and reinstall from the npm registry. To do this, run:

`npm unlink --no-save atd-kickstand && npm install`

b. If the target app did not already have this package as a dependency, you need remove the dependency from `package.json` and unlink the local package. To do this, run:

`npm unlink --no-save atd-kickstand`

In either case, finish by unlinking `atd-kickstand` by navigating to the project folder of this repository. Then, run:

`npm unlink`

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
