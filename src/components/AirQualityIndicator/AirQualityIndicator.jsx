import React, {Fragment} from "react";
import {useGauge} from "use-gauge";
import cc from "classcat";

const START_ANGLE = 45;
const END_ANGLE = 315;

export default function AirQualityIndicator({value}) {
    const gauge = useGauge({
        domain: [0, 300],
        startAngle: START_ANGLE,
        endAngle: END_ANGLE,
        numTicks: 21,
        diameter: 120
    });

    const needle = gauge.getNeedleProps({
        value,
        baseRadius: 12,
        tipRadius: 2
    });


    return (
        <div className="p-4 relative w-fit">

            <svg className="overflow-visible p-2" {...gauge.getSVGProps()}>
                <g id="arcs" filter="url(#filter0_d_510_1894)" style={{
                    transform: "translate(-69px, -69px) scale(1.2)"
                }}>
                    <path
                        d="M19.8908 95.6092C18.2066 97.2934 15.4623 97.3034 13.9091 95.4978C9.93568 90.8787 6.71556 85.6503 4.37692 80.0043C1.48728 73.0281 -3.73613e-06 65.551 -2.5134e-06 58C-1.29068e-06 50.449 1.48728 42.9719 4.37693 35.9957C7.26658 29.0195 11.502 22.6807 16.8414 17.3413C22.1807 12.002 28.5195 7.76656 35.4957 4.87692C42.4719 1.98727 49.949 0.499995 57.5 0.499997C65.051 0.5 72.5281 1.98728 79.5043 4.87693C85.1503 7.21558 90.3787 10.4357 94.9978 14.4091C96.8034 15.9623 96.7934 18.7066 95.1093 20.3908V20.3908C93.4251 22.0749 90.7059 22.0583 88.8799 20.5291C85.0762 17.3437 80.8029 14.7505 76.2037 12.8454C70.2739 10.3892 63.9184 9.125 57.5 9.125C51.0817 9.125 44.7261 10.3892 38.7964 12.8454C32.8666 15.3016 27.4786 18.9017 22.9402 23.4401C18.4017 27.9786 14.8016 33.3665 12.3454 39.2963C9.88919 45.2261 8.625 51.5816 8.625 58C8.625 64.4183 9.88918 70.7739 12.3454 76.7036C14.2504 81.3029 16.8437 85.5762 20.0291 89.3799C21.5583 91.2059 21.5749 93.9251 19.8908 95.6092V95.6092Z"
                        fill="url(#paint0_linear_527_2334)"/>
                    <path
                        d="M57.5 4.81251C57.5 2.43078 59.4335 0.483178 61.8086 0.661626C71.6635 1.40208 81.1878 4.67304 89.4453 10.1905C98.9011 16.5087 106.271 25.489 110.623 35.9957C114.975 46.5025 116.114 58.0638 113.895 69.2177C111.958 78.9581 107.536 88.0057 101.091 95.4978C99.5377 97.3034 96.7934 97.2934 95.1092 95.6093V95.6093C93.4251 93.9251 93.4418 91.2059 94.971 89.3799C100.222 83.1095 103.831 75.6017 105.436 67.5351C107.322 58.0542 106.354 48.2271 102.655 39.2964C98.9554 30.3656 92.691 22.7324 84.6535 17.3619C77.8149 12.7925 69.9541 10.0358 61.8071 9.31512C59.4346 9.10525 57.5 7.19424 57.5 4.81251V4.81251Z"
                        fill="url(#paint1_linear_527_2334)"/>
                    <defs>
                        <linearGradient id="paint0_linear_527_2334" x1="7.00001" y1="85" x2="38.5" y2="3.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#36E166"/>
                            <stop offset="0.328125" stopColor="#E8EC20"/>
                            <stop offset="0.671875" stopColor="#ECBF20"/>
                            <stop offset="1" stopColor="#EC5D20"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_527_2334" x1="73" y1="0.999999" x2="108" y2="85" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#EC5D20"/>
                            <stop offset="0.338542" stopColor="#DC2A3F"/>
                            <stop offset="0.6875" stopColor="#C936E1"/>
                            <stop offset="1" stopColor="#6236E1"/>
                        </linearGradient>
                    </defs>
                </g>
                <g id="needle">
                    <circle className="fill-gray-300" {...needle.base} r={20}/>
                    <circle className="fill-gray-700" {...needle.base} />
                    <circle className="fill-gray-700" {...needle.tip} />
                    <polyline className="fill-gray-700" points={needle.points}/>
                    <circle className="fill-white" {...needle.base} r={4}/>
                </g>
            </svg>
            <div className={`absolute bottom-0 left-0 w-full text-center`}>
                <div className={cc(["text-3xl font-bold"])}>
                    {value}
                </div>
            </div>
        </div>
    );
}
