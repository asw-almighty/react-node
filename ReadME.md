# React with node.js

---

### 할일

[] 확대 축소 버튼, 이전&다음 페이지 버튼, ~~업로드 버튼~~, paint지우기 버튼, resetAll버튼

[x] ~~그리기 공유~~

---

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

---

##### 참고

    git rm -r --cached node_modules
    git commit -am "node_modules be gone!"
    git push origin master

이걸 하면 git에 올라간 node_modules를 제거할 수 있다.

---

## Socket 연결

#### App.tsx

    import * as io from "socket.io-client";

    export class Hello extends React.Component {
        initSocket = () => {
            const socket = io("http://localhost:3000");
            socket.emit("hello");
        };
        componentDidMount() {
            this.initSocket();

#### server.js

    const io = socketIO(server);
    io.on("connection", socket => {
        socket.on("hello", () => {
            console.log("hi");
        });
    });

---

#### tsconfig.json

    "esModuleInterop": true

ECMA스크립트 모듈과 상호 운영성을 가능하게하는 속성으로
true이면 CommonJS모듈을 디폴트 모듈처럼 호출 할수 있다.

---

## dom을 제어할 때

useEffect()는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다. 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 상태로 볼 수 있다.

- 마운트 될 때만 실행하고, 업데이트시 실행할 필요가 없을 경우

  > useEffect(fn, [])

  두 번째 파라미터로 비어있는 배열을 넣어주면 된다.

- 특정 값이 업데이트 될 때만 실행할 경우

  > componentDidUpdate(prevProps, prevState) : props안에 들어있는 value 값이 바뀔 때만 특정 작업을 수행

  > useEffect(fn, [name])

  두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 된다. 배열 안에는 useState를 통해 관리하고 있는 상태를 넣어줘도 되고, props로 전달받은 값을 넣어줘도 된다.

### useRef를 사용하기

js에서 사용하던 document.getElementByID를 대신해서 useRef를 사용한다.

    >const idReference = useRef();
    const passwordReference = useRef();
    ...
    return(
        ...
        <input ref={idReference} />
        <input ref={passwordReference} />
        ...
    )

이렇게 사용하면 된다.

#### type

useRef를 사용하면 HTMLDivElement 타입을 포함할 수 있는 RefObject 인스턴스를 만든다.
RefObject는 단일 프로퍼티를 가지고, null이나 HTMLElement를 가질 수 있다(확인해봐야함.)

---

## styled-components에서 태그로부터 style로 props를 넘기는 방법

태그에 옵션값을 주고, props로 받으면 된다. 이 프로젝트에서는 id값으로 style을 제어했다.

    ...
    const SelectBtn = styled.button`
        display: ${props => (props.id === "reset-all" ? "none" : "inline")};
    `
    ...
