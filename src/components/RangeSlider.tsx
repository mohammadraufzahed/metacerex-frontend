import styled from "styled-components";

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
    #086788 ${
      100 - parseInt(typeof props.value == "string" ? props.value : "0")
    }%,
    #086788 100%
   )`};
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    cursor: pointer;
    background-color: #086788;
  }
  &::-moz-range-thumb {
    -moz-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    cursor: pointer;
    background-color: #086788;
  }
`;
export default RangeSlider;
