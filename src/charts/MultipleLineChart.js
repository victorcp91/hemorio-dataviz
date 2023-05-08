import { select, scaleTime, extent, scaleLinear, max, axisBottom,axisLeft, line, curveBasis, interpolateReds } from 'd3';

class MultipleLineChart{
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
          width,
          height,
      },
    } = this;

    const  aspect = width / height;
    select(window).on('resize', function(){
      const targetWidth = select(containerEl).node().getBoundingClientRect().width;
      svg.attr("width", targetWidth);
      svg.attr("height", targetWidth / aspect);
    });

    const margin = { top: 20, right: 20, bottom: 40, left: 70 };
    const innerWidth = width - margin.left - margin.right; // chart area without margins;
    const innerHeight = height - margin.top - margin.bottom; // chart area without margins;

    const xScale = scaleTime()
      .domain(extent([].concat(...data[0].values), d => d.date))
      .range([0, innerWidth])
      .nice();

    const yScale = scaleLinear()
    .domain([0, max(data, (s) => max(s.values, (d) => d.value))]).nice()
    .range([height - margin.bottom, margin.top]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);
    
    const chartLine = line()
      .defined(info => !isNaN(info.value))
      .x(info => xScale(info.date))
      .y(info => yScale(info.value))
      .curve(curveBasis);
  
    const chartContainer = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    chartContainer.append("g").call(yAxis.tickSize(-innerWidth));

    chartContainer
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight + 15})`); 

    
    chartContainer.append('g')
      .selectAll('path')
      .data(data)
      .join('path')
      .attr("class", (d) => `line-path ${d.id}`)
      .attr('d', (d) => chartLine(d.values));
  } 
  destroy = () => {
    this.svg.remove();
  }
}

export default MultipleLineChart;