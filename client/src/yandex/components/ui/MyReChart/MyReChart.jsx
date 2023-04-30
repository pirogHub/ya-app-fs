import React from "react";

import { ReferenceLine, Area, AreaChart, Label, XAxis, YAxis, Tooltip } from 'recharts';
import { thousandDelimeter } from "../../../utils/thousandDelimeter"

import "./myRechart.scss"

const CustomizedLabel = (props) => {

    // console.log("props", props);

    const y = props.position === "under" ? props.viewBox.y + 35 : props.viewBox.y - 80
    const x = 0
    return (
        <foreignObject x={x} y={y} className="foreignObject" offset="10"  >
            <div className="CustomizedLabel">
                <div className="labelContent">
                    <div className="TmpCustom">702 млн ₽</div>
                    <div>2,94 млн ₽/м²</div>
                </div>
            </div>

        </foreignObject>

    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="CustomTooltip">
                <div className="TooltipCol TooltipCol-label">
                    <div><span>Месяц</span><span> &nbsp; : &nbsp;  </span></div>
                    <div><span>₽/м² </span><span> &nbsp; : &nbsp;  </span></div>
                </div>
                <div className="TooltipCol TooltipCol-value">
                    <div><span className="TooltipingValue">{payload[0].payload.mounth}</span></div>
                    <div><span className="TooltipingValue"> {thousandDelimeter(`${payload[0].payload.price}`).formattedString}</span><span>&nbsp;  ₽/м²</span></div>
                </div>
            </div>
        )
    }
}



const MyReChart = ({ data, averagePrice, currentTotalPriceLabel }) => {



    return (
        <div className="reChart_wrapper">
            <AreaChart width={600} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}

            >
                <defs>

                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f9b000" stopOpacity={0.8} />
                        <stop offset="75%" stopColor="#f9b000" stopOpacity={0} />
                    </linearGradient>
                </defs>


                <XAxis
                    dataKey="name"
                    tickLine={false}
                    strokeWidth="0.2"
                    xAxisId={0} />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={false} />

                <Tooltip
                    content={<CustomTooltip />} />
                <ReferenceLine
                    y={averagePrice}
                    stroke="#d9d7d3"
                    strokeDasharray="3 3" >

                    <Label
                        value={`Средняя цена за предложение (${thousandDelimeter(averagePrice).formattedString} ₽)`}
                        offset={5}
                        position="insideBottom" />

                </ReferenceLine>
                {/* <ReferenceLine
                    y={data[data.length - 1].price}
                    stroke="#d9d7d3"
                    strokeDasharray="3 3"
                    className="ReferenceLine">
                </ReferenceLine> */}
                <Area type="linear" dataKey="price" stroke="#f9b000" fillOpacity={1} fill="url(#colorPv)" />

            </AreaChart>
        </div>
    )
}

export default MyReChart