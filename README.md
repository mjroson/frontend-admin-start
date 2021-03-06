### Local deploy

1. docker-compose run --rm node npm i
2. docker-compose up

if use vscode then can configure the auto code formatter with CTRL + SHIFT + I and choose Prettier.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Manejo de colores y estilos generales parametrizados:

(https://ant.design/docs/react/customize-theme#How-to-do-it)
Valores por defecto: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

Para modificar estos valores se pueden agregar con el mismo nombre de variable dentro del archivo config-override.js

### Link utiles

Paquete para manejar los queryparams
https://github.com/pbeshai/use-query-params

Hooks para usar redux
https://react-redux.js.org/next/api/hooks

Paquete para consumir APIs
https://github.com/axios/axios

Layout base creado con
https://ant.design/components/layout/

Componentes
https://ant.design/components/

Redux ToolKit
https://redux-toolkit.js.org/introduction/quick-start

Redux Tools to develepment
https://github.com/zalmoxisus/redux-devtools-extension

### Structure to create a CRUD from API Rest

![General Common CRUD](docs/images/crud.png)

|                 Open Filters                  |                Open Form                |
| :-------------------------------------------: | :-------------------------------------: |
| ![Open Filters](docs/images/open_filters.png) | ![Open Form](docs/images/open_form.png) |
