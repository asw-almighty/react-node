import React from "react";
import styled from "styled-components";

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

const PdfBtn = () => (
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
);

export default PdfBtn;
