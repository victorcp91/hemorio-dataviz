import {
  select,
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
    const { height } = props;
    const width = select(containerEl).node().getBoundingClientRect().width;

    this.svg = select(containerEl)
      .append("svg")
      .style("background-color", "white")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("perserveAspectRatio","xMinYMid");

    this.updateDatapoints();
  }

  updateDatapoints = () => {
    const {
      svg,
      containerEl,
      props: {
        data,
        dataFields: [key, value],
        width,
        height,
      },
    } = this;

    const  aspect = width / height;
    window.addEventListener('resize', function(){
      const targetWidth = select(containerEl).node().getBoundingClientRect().width;
      svg.attr("width", targetWidth);
      svg.attr("height", targetWidth / aspect);
    });
    
    const margin = { top: 40, right: 20, bottom: 20, left: 70 };
    const innerWidth = width - margin.left - margin.right; // chart area without margins;
    const innerHeight = height - margin.top - margin.bottom; // chart area without margins;

    const xValue = (d) => d[key]; //JSON key
    const yValue = (d) => parseInt(d[value]); // JSON value

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
      .call(yAxis.tickFormat(format("")).tickSize(-innerWidth));
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

  destroy = () => {
    this.svg.remove();
  }
}

export default BarChart;
