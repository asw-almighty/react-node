import React from "react";
import io from "socket.io-client";
import SelectBtn from "./SelectBtn";
import PdfBtn from "./PdfBtn";
import Canvas from "./Canvas";
import PaintBtn from "./PaintBtn";

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
        <PdfBtn />
        <Canvas />
        <PaintBtn />
      </>
    );
  }
}

export default Print;
