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

##### 참고

    git rm -r --cached node_modules
    git commit -am "node_modules be gone!"
    git push origin master

이걸 하면 git에 올라간 node_modules를 제거할 수 있다.
