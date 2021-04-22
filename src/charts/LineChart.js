import {
  select,
  scaleLinear,
  scaleTime,
  max,
  axisLeft,
  axisBottom,
  extent,
  line,
  curveBasis,
} from "d3";


class LineChart {
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

    const xValue = (d) => d[key]; //JSON key timestamp
    const yValue = (d) => d[value]; // JSON value temperature

    const xScale = scaleTime()
      .domain(extent([].concat(...data), xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })]).nice()
      .range([innerHeight, 0])
      .nice();

    const chartContainer = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`); // Chart margins

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    chartContainer
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`); // X Axis to bottom

    chartContainer.append("g").call(yAxis.tickSize(-innerWidth));

    const lineGenerator = line()
      .x((d) => xScale(xValue(d)))
      .y((d) => yScale(yValue(d)))
      .curve(curveBasis); // reduce curves

    data.forEach((dataset) => {
      chartContainer
        .append("path")
        .attr("class", "line-path")
        .attr("d", lineGenerator(dataset));
    });

    // chartContainer
    //   .selectAll("circle")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("r", 6)
    //   .attr("cx", (d) => xScale(xValue(d)))
    //   .attr("cy", (d) => yScale(yValue(d)));
  };

  resize = (width, height) => {
    const { svg } = this;
    svg.attr("width", width).attr("height", height);
  };
}

export default LineChart;
