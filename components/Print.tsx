import React from "react";
import io from "socket.io-client";
import SelectBtn from "./SelectBtn";
import PdfBtn from "./PdfBtn";
import Canvas from "./Canvas";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #bdc3c7;
    display:flex;
    justify-content: center;
  }
`;

class Print extends React.Component {
  constructor(props) {
    super(props);
  }
  initSocket = () => {
    const socket = io("http://localhost:3000");
    socket.emit("connected", { message: "connected" });
  };

  componentDidMount() {
    this.initSocket();
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <SelectBtn />
        <PdfBtn />
        <Canvas />
      </>
    );
  }
}

export default Print;
