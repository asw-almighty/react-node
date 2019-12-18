import * as React from "react";
import * as ReactDOM from "react-dom";
import * as io from "socket.io-client";

export class Hello extends React.Component {
  initSocket = () => {
    const socket = io("http://localhost:3000");
    socket.emit("hello");
  };
  componentDidMount() {
    this.initSocket();
  }
  render() {
    return <h1>Welcome to React!</h1>;
  }
}

ReactDOM.render(<Hello />, document.getElementById("root"));
