import React from 'react';

interface RadarChartProps {
    data: number[];
    labels: string[];
    maxValue: number;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, labels, maxValue }) => {
    const numPoints = data.length;
    const angleSlice = (2 * Math.PI) / numPoints;

    // Scaling factor to increase the size of the chart
    const scaleFactor = 1.5; // Change this to scale the chart size

    // Helper to get coordinates for each data point
    const getCoordinates = (value: number, index: number) => {
        const angle = index * angleSlice;
        const radius = ((value / maxValue) * 100) * scaleFactor;
        return {
            x: radius * Math.sin(angle),
            y: -radius * Math.cos(angle),
        };
    };

    // Generate the points for the data polygon
    const dataPoints = data
        .map((value, index) => {
            const { x, y } = getCoordinates(value, index);
            return `${x},${y}`;
        })
        .join(' ');

    // Generate grid lines
    const gridLevels = [0.25, 0.5, 0.75, 1].map((level) => (
        <polygon
            key={level}
            points={Array.from({ length: numPoints })
                .map((_, index) => {
                    const { x, y } = getCoordinates(maxValue * level, index);
                    return `${x},${y}`;
                })
                .join(' ')}
            className="stroke-gray-300 fill-none"
        />
    ));

    // Generate labels
    const labelElements = labels.map((label, index) => {
        const { x, y } = getCoordinates(maxValue, index);
        const words = label.split(' ');
        const max_word_length = 10;
        return (
            <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fill: '#a5f3fc', fontSize: `${16 * scaleFactor}px` }}
                className="font-mono italic transform transition-transform duration-500 hover:scale-105"
            >
                 {words.length === 2 && label.length > max_word_length ? (
                // If the label has two words and exceeds 8 characters, break the line
                words.map((word, wordIndex) => (
                    <tspan
                        key={wordIndex}
                        x={x}
                        dy={wordIndex === 1 ? '1.2em' : '0'}
                    >
                        {word}
                    </tspan>
                ))
            ) : (
                // Otherwise, print the label as it is
                label
            )}
        </text>
        );
    });

    // Generate lines from center to each data point
    const edgeLines = data.map((_, index) => {
        const { x, y } = getCoordinates(maxValue, index);
        return <line key={index} x1="0" y1="0" x2={x} y2={y} className="stroke-gray-400" />;
    });

    return (
        <div className="flex justify-center items-center scale-105">
            <svg
                viewBox={-150 * scaleFactor + " " + -150 * scaleFactor + " " + 300 * scaleFactor + " " + 300 * scaleFactor}
                width="300"
                height="220"
            >
                {/* Grid levels */}
                {gridLevels}

                {/* Lines from center to edges */}
                {edgeLines}

                {/* Data polygon */}
                <polygon points={dataPoints} className="fill-blue-400 opacity-70 stroke-blue-600 " />

                {/* Data points */}
                {data.map((value, index) => {
                    const { x, y } = getCoordinates(value, index);
                    return <circle key={index} cx={x} cy={y} r={3} className="fill-blue-500" />; // Increase point size
                })}

                {/* Labels */}
                {labelElements}
            </svg>
        </div>
    );
};

export default RadarChart;
