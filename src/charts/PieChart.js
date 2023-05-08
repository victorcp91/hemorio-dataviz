import { select, scaleLinear, max, pie, arc, scaleOrdinal } from "d3";

class PieChart {
  containerEl;
  props;
  svg;
  width;
  height;

  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    this.width = select(containerEl).node().getBoundingClientRect().width;
    this.height = this.width;

    this.svg = select(containerEl)
      .append("svg")
      .attr("id",props.data[0].name)
      .style("background-color", "white")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
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
      },
    } = this;

    const  aspect = this.width /this.height;
    window.addEventListener('resize', function(){
        const targetWidth = select(containerEl).node().getBoundingClientRect().width;
        svg.attr("width", targetWidth);
        svg.attr("height", targetWidth / aspect);
    });

    const width = select(containerEl).node().getBoundingClientRect().width;
    const height = this.width;
    const radius = this.width/2;

    var color = scaleOrdinal([
      "firebrick",
      "lightgrey",]
    );

    const chartContainer = svg
      .append("g")
      .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`); // Chart margins

    const arcs = pie().value((d) => d[key])(data); // return arcs data

    const arcConfig = arc().innerRadius(radius - 40).outerRadius(radius);

    const pieContainer = chartContainer
      .selectAll("arc")
      .data(arcs)
      .enter()
      .append("g")
      .attr("class", "pie-piece");
    pieContainer
      .append("path")
      .attr("id", "arcConfig")
      .attr("d", arcConfig)
      .attr("fill", (d, i) => color(i));
    pieContainer
      .append("text")
      .attr("id", "text")
      .text((d) => `${d.data.name}`)
      // .attr("transform", (d) => `translate(${label.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
  };

  resize = (width, height) => {
    const { svg } = this;
    svg.attr("width", width).attr("height", height);
  };

  destroy = () => {
    this.svg.remove();
  }
}

export default PieChart;
