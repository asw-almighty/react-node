# React with node.js

### React와 Server는 다른 방식으로 동작한다. webpack을 이용해서 소스를 하나로 모아놓고 서버로 실행시킨다.

#### package.json

    ...
    "build": "webpack-cli app.tsx --config webpack-config.js",
    "start": "npm run build && cd server && node server.js"
    ...

#### webpack-config.js

    ...
    entry: "./app.tsx",
    mode: "development",
    output: {
      filename: "./app-bundle.js"
    },
    ...
