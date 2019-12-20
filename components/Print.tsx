import React from "react";
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
  render() {
    return (
      <>
        <GlobalStyle />
        <Canvas />
      </>
    );
  }
}

export default Print;
