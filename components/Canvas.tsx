import React, { useEffect, useContext, createContext } from "react";
import styled from "styled-components";

//style
const Select = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 5px;
`;
const SelectBtn = styled.button`
  display: ${props => (props.id === "reset-all" ? "none" : "inline")};
  cursor: pointer;
`;
const Input = styled.input`
  display: none;
`;
const PdfMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PdfZoom = styled.div``;
const PdfPage = styled.div`
  width: 30%;
  text-align: center;
`;
const PageNum = styled.span``;
const PdfMove = styled.div``;
const Btn = styled.button`
  cursor: pointer;
`;
const Board = styled.canvas`
  background-color: white;
  width: 700px;
  height: 700px;
`;
const Color = styled.div`
  background-color: ${props => props.id};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
`;
const Controls = styled.div`
  display: flex;
  justify-content: center;
`;
const PaintItems = styled.div``;

//logic
const stroke = (canvas, ctx) => {
  let painting = false;

  const INITIAL_WIDTH = 700;
  const INITIAL_HEIGHT = 700;
  canvas.width = INITIAL_WIDTH;
  canvas.height = INITIAL_HEIGHT;

  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 2.5;

  const beginPath = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const strokePath = (x, y) => {
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
      beginPath(x, y);
    } else {
      strokePath(x, y);
    }
  }

  function startPainting() {
    painting = true;
  }
  function stopPainting() {
    painting = false;
  }

  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mousedown", startPainting);
  }
};

const colorChange = (colors, ctx) => {
  function handleColor(event) {
    const color = event.target.id;
    ctx.strokeStyle = color;
  }

  colors.forEach(color => color.addEventListener("click", handleColor));
};

const Canvas = () => {
  let myCanvas: React.RefObject<HTMLCanvasElement> = React.useRef();
  let myColors: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    if (!myCanvas.current) {
      return;
    }
    console.log(myColors);
    const canvas: HTMLCanvasElement = myCanvas.current;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    const colors: NodeListOf<ChildNode> =
      myCanvas.current.nextElementSibling.childNodes[0].childNodes;

    stroke(canvas, ctx);
    colorChange(colors, ctx);
  }, []);
  return (
    <>
      <Select id="selectPdf" ref={myColors}>
        <Select>
          <SelectBtn id="upload-button">Select PDF</SelectBtn>
          <Input id="file-to-upload" type="file" accept="application/pdf" />
        </Select>
        <Select>
          <SelectBtn id="reset-all">Reset Board</SelectBtn>
          <SelectBtn id="erase-paint">Erase Paint</SelectBtn>
        </Select>
      </Select>
      <PdfMeta>
        <PdfZoom>
          <Btn id="pdf-zoomOut">➖</Btn>
          <Btn id="pdf-zoomIn">➕</Btn>
        </PdfZoom>
        <PdfPage>
          Page{"   "}
          <PageNum id="pdf-current-page">1</PageNum>
          {"   "}of {"   "}
          <PageNum id="pdf-total-pages">12</PageNum>
        </PdfPage>
        <PdfMove>
          <Btn id="pdf-prev">⬅</Btn>
          <Btn id="pdf-next">➡️</Btn>
        </PdfMove>
      </PdfMeta>
      <Board ref={myCanvas} />
      <PaintItems>
        <Controls>
          <Color id="black" />
          <Color id="white" />
          <Color id="red" />
          <Color id="blue" />
        </Controls>
      </PaintItems>
    </>
  );
};

export default Canvas;
