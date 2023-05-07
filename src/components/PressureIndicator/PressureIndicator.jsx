import { observer } from "mobx-react-lite";
import { useGauge } from "use-gauge";
import { Fragment } from 'react'

const PressureIndicator = observer(({value, color}) => {
    const gauge = useGauge({
        domain: [680, 780],
        startAngle: 50,
        endAngle: 310,
        numTicks: 41,
        diameter: 250
    });

    const needle = gauge.getNeedleProps({
        value,
        baseRadius: 8,
        tipRadius: 2
    });

    return (
        <div className="p-4 relative">
            <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
                <g id="ticks">
                    {gauge.ticks.map((angle) => {
                        const asValue = gauge.angleToValue(angle);
                        const showText = asValue % 20 === 0;

                        return (
                            <Fragment key={`tick-group-${angle}`}>
                                <line
                                    className={`stroke-gray-400`}
                                    strokeWidth={2}
                                    {...gauge.getTickProps({
                                        angle,
                                        length: showText ? 16 : 8
                                    })}
                                />
                                {showText && (
                                    <text
                                        className="text-sm fill-gray-400 font-medium"
                                        {...gauge.getLabelProps({ angle, offset: 20 })}
                                    >
                                        {asValue}
                                    </text>
                                )}
                            </Fragment>
                        );
                    })}
                </g>
                <g id="needle">
                    <circle className="fill-gray-300" {...needle.base} r={12} />
                    <circle className="fill-gray-700" {...needle.base} />
                    <circle className="fill-gray-700" {...needle.tip} />
                    <polyline className="fill-gray-700" points={needle.points} />
                    <circle className="fill-white" {...needle.base} r={4} />
                </g>
            </svg>
            <div className={`absolute bottom-0 left-0 w-full text-center`}>
                <div className={`text-${color} text-2xl font-bold`}>
                    {value}
                </div>
                <div>мм рт. ст</div>
            </div>
        </div>
    );
})

export default PressureIndicator