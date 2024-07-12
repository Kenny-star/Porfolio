// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// interface PieChartProps {
//   data: { label: string; value: number }[];
//   size: number;
//   duration: number;
// }

// const PieChart: React.FC<PieChartProps> = ({ data, size, duration }) => {
//   const ref = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     if (ref.current) {
//       const svg = d3.select(ref.current);
//       svg.selectAll('*').remove();

//       const width = size;
//       const height = size;
//       const radius = Math.min(width, height) / 2;

//       // Create a color scale
//       const color = d3.scaleOrdinal(d3.schemeCategory10);

//       // Create the arc generator
//       const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
//         .innerRadius(0)
//         .outerRadius(radius);

//       // Create the pie generator
//       const pie = d3.pie<{ label: string; value: number }>()
//         .value(d => d.value)
//         .sort(null);

//       // Append group element to the SVG
//       const g = svg.append('g')
//         .attr('transform', `translate(${width / 2}, ${height / 2})`);

//       // Add gray background circle
//       g.append('circle')
//         .attr('r', radius)
//         .attr('fill', '#ddd');

//       // Bind the data to the pie chart
//       const path = g.selectAll('path')
//         .data(pie(data))
//         .enter().append('path')
//         .attr('fill', (d, i) => color(i.toString()))
//         .attr('d', arc)
//         .each(function (d) { this._current = d; }); // Store the initial angles

//       // Animation function
//       function animatePie() {
//         path.transition()
//           .duration(duration)
//           .attrTween('d', function (d) {
//             const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//             return function (t) {
//               return arc(interpolate(t)) as string;
//             };
//           });
//       }

//       // Call the animation function
//       animatePie();
//     }
//   }, [data, size, duration]);

//   return (
//     <svg
//       ref={ref}
//       width={size}
//       height={size}
//       className="mx-auto my-4"
//     ></svg>
//   );
// };

// export default PieChart;
