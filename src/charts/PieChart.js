import { select, scaleLinear, max, pie, arc, scaleOrdinal } from "d3";

class PieChart {
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
    const radius = 200;

    const xValue = (d) => d[key]; //JSON key - number
    const yValue = (d) => d[value]; // JSON value - name

    var color = [
      "firebrick",
      "lightgray"
    ];

    const chartContainer = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`); // Chart margins

    const arcs = pie().value((d) => d[key])(data); // return arcs data
    console.log(arcs);

    const arcConfig = arc().innerRadius(radius - 100).outerRadius(radius);


    const label = arc()
      .outerRadius(radius + 150)
      .innerRadius(radius - 100);

    const pieContainer = chartContainer
      .selectAll("arc")
      .data(arcs)
      .enter()
      .append("g")
      .attr("class", "pie-piece");
    pieContainer
      .append("path")
      .attr("d", arcConfig)
      .attr("fill", (d, i) => color[i]);
    pieContainer
      .append("text")
      .text((d) => `${d.data.name}`)
      .attr("transform", (d) => `translate(${label.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
  };

  resize = (width, height) => {
    const { svg } = this;
    svg.attr("width", width).attr("height", height);
  };
}

export default PieChart;
