# Dice Gen

## Contributing - Getting Started

This project is a single page React app built with Typescript. To start working run `yarn install` to install all the project dependencies. You then can run `yarn start` to start the development server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Since this displays lint errors, Typescript errors will prevent compilation.

### Code Styling

Prettier will be running on a pre-commit hook to format for you, but in general:

- No semicolons
- Tabs = 2 spaces
- Trailing commas

### React Components

React components should all be functional (arrow syntax) and using hooks. The name of the file should be `ComponentName.tsx` and should be in a directory called `ComponentName`. This directory should reside in the `src/views/` directory or in another component's directory if relevant. Every react component should have its props in a type alias before the component is declared. There should only be one component per file and it should be exported as default at the end of the file. A base react component should look like the following:

```typescript jsx
import React from 'react'

type Props = {
  prop1: number
  prop2: string
  prop3: Array<number>
}

const ComponentName: React.FC<Props> = ({ prop1, prop2, prop3 }: Props) => {
  return <div>Content</div>
}

export default ComponentName
```

### Global State

For the time being we are trying out [react-hooks-global-state](https://github.com/dai-shi/react-hooks-global-state) as a lightweight global state manager. Use local state hooks for any state that is only required only by a component and its children. However if state is needed to be shared up or across the tree, then add the value to the initial state in `src/modules/global.ts` and import the `useGlobalState` function from that file to be used as a hook in your component. Read the library's documentation for any additional details.

### Component Styling

We are using [styled-components](https://styled-components.com/) for styling our components instead of importing spreadsheets or using inline js object styling (except for edge cases where it is necessary). If a component requires styling either create a `style.ts` file inside the component directory where needed and import into the component or import directly one of our more reusable global styled-components. Read the library's documentation for any additional details.

### Utility Functions

Utility functions may be created and added to the `src/utils` directory.

### Models and Consts

Models, consts and reusable type aliases may be created added to the `src/models` directory.

### Web Workers

The process of subtracting faces from dice using ThreeBSP takes some JS processing power and time. If this were to be done in the main thread of the client, it would hang, meaning a loader would stall in showing progress. For that reason, we use a web worker to perform this subtraction. It, and any future web workers are stored in the `/src` directory. They are imported in the client using the `worker-loader` library and the syntax, `import Worker from 'worker-loader![PATH_TO_WORKER]'`. This import line requires a `// eslint-disable-line import/no-webpack-loader-syntax` to cooperate with our linter.

### Font Processing

Some parts of the font processing for `TextGeometry` are somewhat hacked together beyond three.js's default classes and warrant some explanation. There are two major issues in imported fonts based on the fonts not being created following glyph standards.

First, there could be multiple solid paths that could overlap. So, for example, if there were a plus sign glyph that was two separate paths of rectangles that overlap. That would cause the subtraction to get confused and not subtract where they overlap or leave lines around where they intersect. Note that the extrusion will likely look fine until it is actually subtracted from the die. To get around this the combinedTextGeometry is saving every different shape that the glyph generates so that rather than rather than extruding all the shapes together, we extrude each shape separately and then use ThreeBSP to take the union of them in the geometryGenerator.

Second issue is hole detection. Basically the font loader starts by going in and making a path for every glyph. For a given glyph and its ShapePath, the subpaths will eventually generate different shapes mentioned above all being solid unless it finds a subpath that is counterclockwise. Apparently this usually means that it is supposed to be a hole rather than a solid and treats it as such. The problem is, not all fonts follow this standard, meaning if a shape happens to be drawn counterclockwise, it will render as an extruded hole. To get around this, `combinedTextGeometry` uses a custom `generateShapes` function that in turn calls a custom `toShapes` function, both found in `src/models/threejs`. Note that these are the only allowed uses of javascript with Typescript as they are mostly copied directly from Three.js. These functions do an extra check for counter clockwise shapes that are assumed be be holes and checks if every point of them is inside their supposed parent. If not the "hole" is instead added as an actual shape.

## Running scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `yarn lint`

Manually runs the linter (including typescript checks).

### `yarn pretty-quick`

Manually runs prettier cleanup script. This is run automatically pre-commit as well.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
