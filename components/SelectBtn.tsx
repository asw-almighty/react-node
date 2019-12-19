import React from "react";
import styled from "styled-components";

const Select = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 5px;
`;
const Btn = styled.button`
  display: ${props => (props.id === "reset-all" ? "none" : "inline")};
  cursor: pointer;
`;
const Input = styled.input`
  display: none;
`;

const SelectBtn = () => (
  <Select id="selectPdf">
    <Select>
      <Btn id="upload-button">Select PDF</Btn>
      <Input id="file-to-upload" type="file" accept="application/pdf" />
    </Select>
    <Select>
      <Btn id="reset-all">Reset Board</Btn>
      <Btn id="erase-paint">Erase Paint</Btn>
    </Select>
  </Select>
);

export default SelectBtn;
