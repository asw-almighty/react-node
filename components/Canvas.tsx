import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import PDFJS from "../static/pdf.js";
import "../static/pdf.worker.js";

let __PDF_DOC;
let __CURRENT_PAGE;
let __TOTAL_PAGES;
let __PAGE_RENDERING_IN_PROGRESS = 0;
let currentPage;
let socket;
let scaleToggle = false;
let scale;

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
  display: none;
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
      socket.emit("beginPath", { x, y });
    } else {
      strokePath(x, y);
      socket.emit("strokePath", { x, y, color: ctx.strokeStyle });
    }
  }

  socket.on("beganPath", ({ x, y }) => {
    beginPath(x, y);
  });
  socket.on("strokedPath", ({ x, y, color }) => {
    let currentColor = ctx.strokeStyle;
    if (color !== null) ctx.strokeStyle = color;
    strokePath(x, y);
    ctx.strokeStyle = currentColor;
  });
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

const initSocket = () => {
  socket = io("http://localhost:3000");
  socket.emit("connected", { message: "hi" });
};

const Canvas = () => {
  const myCanvas: React.RefObject<HTMLCanvasElement> = useRef();
  const myColors: React.RefObject<HTMLDivElement> = useRef();
  const myUpload: React.RefObject<HTMLInputElement> = useRef();
  const myUploadBtn: React.RefObject<HTMLButtonElement> = useRef();
  const pdfTotalPages: React.RefObject<HTMLDivElement> = useRef();
  const pdfMeta: React.RefObject<HTMLDivElement> = useRef();
  const clickReset: React.RefObject<HTMLButtonElement> = useRef();
  const erasePaint: React.RefObject<HTMLButtonElement> = useRef();
  const pdfPrev: React.RefObject<HTMLButtonElement> = useRef();
  const pdfNext: React.RefObject<HTMLButtonElement> = useRef();
  const pdfCurrent: React.RefObject<HTMLButtonElement> = useRef();

  const pdfUpload = () => {
    myUploadBtn.current.addEventListener("click", () => {
      myUpload.current.click();
    });
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = myCanvas.current.getContext("2d");

    function showPDF(pdf_url) {
      PDFJS.getDocument({ url: pdf_url })
        .then(function(pdf_doc) {
          __PDF_DOC = pdf_doc;
          __TOTAL_PAGES = __PDF_DOC.numPages;
          pdfTotalPages.current.innerHTML = __TOTAL_PAGES;

          // Show the first page
          showPage(1);
          pdfMeta.current.style.display = "flex";
          clickReset.current.style.display = "flex";
        })
        .catch(function(error) {
          alert(error.message);
        });
    }
    function showPage(page_no) {
      __PAGE_RENDERING_IN_PROGRESS = 1;
      __CURRENT_PAGE = page_no;
      currentPage = page_no;
      // Disable Prev & Next buttons while page is being loaded
      // pdfNext.current.setAttribute("disabled", true);
      // pdfPrev.current.setAttribute("disabled", true);

      // Update current page in HTML
      pdfCurrent.current.innerHTML = page_no;

      // Fetch the page
      __PDF_DOC.getPage(page_no).then(function(page) {
        // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
        // var scale_required = __CANVAS.width / page.getViewport(1).width;

        if (!scaleToggle) {
          scale = 1;
        }

        // Get viewport of the page at required scale
        // var viewport = page.getViewport(scale_required);
        var viewport = page.getViewport(scale);

        // Set canvas height
        myCanvas.current.height = viewport.height > 700 ? 700 : viewport.height;
        myCanvas.current.width = viewport.width > 700 ? 700 : viewport.width;
        ctx.lineWidth = 2.5;

        var renderContext = {
          canvasContext: ctx,
          viewport
        };

        // Render the page contents in the canvas
        page.render(renderContext).then(function() {
          __PAGE_RENDERING_IN_PROGRESS = 0;

          // // Re-enable Prev & Next buttons
          // pdfPrev.current.removeAttribute("disabled");
          // pdfNext.current.removeAttribute("disabled");
        });
        // getImages(page);
      });
    }

    myUpload.current.addEventListener("change", () => {
      const pdfURL = URL.createObjectURL(myUpload.current.files[0]);
      socket.emit("showPDF", { pdfURL });
      showPDF(pdfURL);
      myUpload.current.value = "";
      pdfMeta.current.style.display = "flex";
    });

    initSocket();
    if (!myCanvas.current) {
      return;
    }

    stroke(myCanvas.current, ctx);
    colorChange(myColors.current.childNodes, ctx);
    pdfUpload();
  }, []);
  return (
    <>
      <Select>
        <Select>
          <SelectBtn ref={myUploadBtn}>Select PDF</SelectBtn>
          <Input type="file" accept="application/pdf" ref={myUpload} />
        </Select>
        <Select>
          <SelectBtn id="reset-all" ref={clickReset}>
            Reset Board
          </SelectBtn>
          <SelectBtn ref={erasePaint}>Erase Paint</SelectBtn>
        </Select>
      </Select>
      <PdfMeta ref={pdfMeta}>
        <PdfZoom>
          <Btn>➖</Btn>
          <Btn>➕</Btn>
        </PdfZoom>
        <PdfPage>
          Page{"   "}
          <PageNum ref={pdfCurrent} />
          {"   "}of {"   "}
          <PageNum ref={pdfTotalPages} />
        </PdfPage>
        <PdfMove>
          <Btn ref={pdfPrev}>⬅</Btn>
          <Btn ref={pdfNext}>➡️</Btn>
        </PdfMove>
      </PdfMeta>
      <Board ref={myCanvas} />
      <PaintItems>
        <Controls ref={myColors}>
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
