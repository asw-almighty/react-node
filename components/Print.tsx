import React from "react";
// import React = require("react");
import io from "socket.io-client";
import SelectBtn from "./SelectBtn";
import PdfContainer from "./PdfContainer";
import Canvas from "./Canvas";
import PaintContainer from "./PaintContainer";

class Print extends React.Component {
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
        <SelectBtn />
        <PdfContainer />
        <Canvas />
        <PaintContainer />
      </>
    );
  }
}

export default Print;
