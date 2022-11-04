import { useSignal } from "@preact/signals-react";
import React, { useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useRecoilValue } from "recoil";
import { statusData } from "../atoms/status";
import { colorMode } from "../signals/colorMode";

const Timer: React.FC = () => {
  const status = useRecoilValue(statusData);
  const value = useSignal(0);
  const date = useSignal(0);
  const timerString = useSignal("");
  useEffect(() => {
    if (status) {
      date.value = status.register_request_expires_in_seconds;
      setInterval(() => {
        if (date.value > 0) {
          value.value += 1;
          date.value -= 1;
          const time = (date.value / 60).toFixed(2);
          const minute = parseInt(time.toString().split(".")[0]);
          const second = parseInt(
            (parseFloat("0." + time.toString().split(".")[1]) * 60).toFixed(0)
          );
          timerString.value = `${minute >= 10 ? minute : `0${minute}`}:${
            second >= 10 ? second : `0${second}`
          }`;
        } else {
          window.location.reload();
        }
      }, 1000);
    }
  }, [status]);
  return (
    <div style={{ maxWidth: 150 }} className="bg-pr">
      <CircularProgressbar
        minValue={0}
        maxValue={status ? status.register_request_expires_in_seconds : 100}
        value={value.value}
        text={timerString}
        styles={buildStyles({
          pathColor:
            colorMode.value == "dark"
              ? "rgb(36, 196, 249)"
              : "rgb(8, 103, 136)",
          textColor:
            colorMode.value == "dark"
              ? "rgb(36, 196, 249)"
              : "rgb(8, 103, 136)",
        })}
      />
    </div>
  );
};

export default Timer;
