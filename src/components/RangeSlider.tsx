import { effect, signal } from "@preact/signals-react";
import styled from "styled-components";
import { colorMode } from "../signals/colorMode";

const color = signal("");
effect(() => {
  color.value = colorMode.value == "dark" ? "#24C4F9" : "#086788";
});

const RangeSlider = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 8px;
  width: 100%;
  border-radius: 8px;

  background: ${(props) => `linear-gradient(to right,
    #C8DDE5 0%,
    #C8DDE5 ${
      100 - parseInt(typeof props.value == "string" ? props.value : "0")
    }%,
    ${color.value} ${
    100 - parseInt(typeof props.value == "string" ? props.value : "0")
  }%,
    ${color.value} 100%
   )`};
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    cursor: pointer;
    background-color: ${color.value};
  }
  &::-moz-range-thumb {
    -moz-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    cursor: pointer;
    background-color: ${color.value};
  }
`;
export default RangeSlider;
