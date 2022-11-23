import { activeEndpoint, sidebar } from "../../pages/OnchainPage";
import OnchainActions from "./OnchainActions";
import { useState, useEffect } from "react";
import HighCharts from "highcharts";
import { screen } from "../../signals/screen";
import HighchartsReact from "highcharts-react-official";
import { useQuery } from "@tanstack/react-query";
import { getOnchainChart } from "../../functions/onchain";
import SelectMenu from "../SelectMenu";

const OnchainContent = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [resolution, setResolution] = useState("1h");

  const chartsQuery = useQuery(
    ["chart", activeEndpoint.value?.ID ?? 277, resolution],
    () => getOnchainChart(activeEndpoint.value?.ID ?? 277, resolution),
    {
      suspense: false,
    }
  );

  useEffect(() => {
    if (screen.value.width > 1024) {
      if (sidebar.value) {
        setWidth(screen.value.width * 0.95);
      } else {
        setWidth(screen.value.width * 0.7);
      }
    }
    setHeight(screen.value.height * 0.8);
  }, [screen.value]);

  return (
    <div className="w-full flex flex-col gap-2">
      <OnchainActions />
      <div className="w-full flex flex-col items-end bg-neutral-50 rounded-xl">
        <SelectMenu
          options={
            activeEndpoint.value?.resolutions.map((item) => ({
              label: item.toUpperCase(),
              value: item,
            })) ?? undefined
          }
          onChange={(v) => setResolution(v)}
        />
        <BrushChart chart={chartsQuery.data ?? []} />
      </div>
      <div className="w-full bg-neutral-50 dark:bg-neutral-900 font-vazir text-sm lg:text-base rounded-t-lg">
        <div className="w-full p-2 border-b-[1px] border-neutral-900 dark:border-neutral-50">
          <span className="font-bold text-neutral-900 dark:text-neutral-50">
            مشخصات متریک
          </span>
        </div>
        <div className="p-4 flex text-neutral-900 dark:text-neutral-50 flex-col gap-6">
          <p className="font-normal text-justify">
            {activeEndpoint.value
              ? activeEndpoint.value.description
              : "Please select"}
          </p>
          <div className="flex flex-col gap-2">
            <span className="font-bold">دارایی ها</span>
            <div dir="ltr" className="flex flex-row gap-2">
              {activeEndpoint.value &&
                activeEndpoint.value.assets.map((item, key) => {
                  return (
                    <span key={key} className="font-normal">
                      {item.symbol}
                      {activeEndpoint.value &&
                      key !== activeEndpoint.value.assets.length - 1
                        ? ","
                        : null}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">بازه زمانی</span>
            <div dir="ltr" className="flex flex-row gap-2">
              {activeEndpoint.value &&
                activeEndpoint.value.resolutions.map((item, key) => {
                  return (
                    <span key={key} className="font-normal">
                      {item}
                      {activeEndpoint.value &&
                      key !== activeEndpoint.value.resolutions.length - 1
                        ? ","
                        : null}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function BrushChart({ chart }) {
  return (
    <div className="h-full w-full py-2 bg-neutral-50 relative overflow-hidden">
      <HighchartsReact
        highcharts={HighCharts}
        options={{
          chart: {
            height: "40%",
            backgroundColor: "rgb(250 250 250)",
            zooming: {
              type: "x",
            },
          },
          title: { text: "" },
          xAxis: {
            type: "datetime",
          },
          series: [
            {
              type: "line",
              name: "",
              data: chart.map((item) => [item.time, item.value]),
              color: "#333333",
            },
          ],
        }}
      />
    </div>
  );
}

export default OnchainContent;
