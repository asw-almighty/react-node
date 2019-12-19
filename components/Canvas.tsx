import React from "react";
import CanvasPresenter from "./CanvasPresenter";

// const Canvas = () => <div>hi</div>;
class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <CanvasPresenter />
      </>
    );
  }
}

export default Canvas;
