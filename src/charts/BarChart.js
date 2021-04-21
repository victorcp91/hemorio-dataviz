import {
  select,
  csv,
  scaleLinear,
  scaleBand,
  max,
  axisLeft,
  axisBottom,
  format,
} from "d3";

class BarChart {
  containerEl;
  props;
  svg;

  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height } = props;
    this.svg = select(containerEl)
      .append("svg")
      .style("background-color", "white")
      .attr("width", width)
      .attr("height", height);
    this.updateDatapoints();
  }

  updateDatapoints = () => {
    const {
      svg,
      props: {
        data,
        dataFields: [key, value],
        width,
        height,
      },
    } = this;

    const margin = { top: 20, right: 20, bottom: 20, left: 70 };
    const innerWidth = width - margin.left - margin.right; // chart area without margins;
    const innerHeight = height - margin.top - margin.bottom; // chart area without margins;

    const xValue = (d) => d[key]; //JSON key
    const yValue = (d) => d[value]; // JSON value

    const xScale = scaleBand()
      .domain(data.map(xValue))
      .range([0, innerWidth])
      .padding(0.1); // Bar between spacement

    const yScale = scaleLinear()
      .domain([0, max(data, yValue)])
      .range([0, innerHeight]);

    const chartContainer = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`); // Chart margins

    const xAxis = axisBottom(xScale);
    chartContainer
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`); // X Axis to bottom

    const yAxis = axisLeft(
      scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0]) // Inverted range
    );
    chartContainer
      .append("g")
      .call(yAxis.tickFormat(format("s")).tickSize(-innerWidth));
    // formating examples: http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e

    chartContainer
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(xValue(d)))
      .attr("y", (d) => innerHeight - yScale(yValue(d)))
      .attr("width", (d) => xScale.bandwidth())
      .attr("height", (d) => yScale(yValue(d)));
  };

  resize = (width, height) => {
    const { svg } = this;
    svg.attr("width", width).attr("height", height);
  };
}

export default BarChart;
