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
        .domain(extent([].concat(...data), yValue))
        .range([innerHeight, 0])
        .nice();

        const chartContainer = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`); // Chart margins
  
        const xAxis = axisBottom(xScale);
        const yAxis = axisLeft(yScale);

        chartContainer.append("g").call(yAxis.tickSize(-innerWidth));


        chartContainer
            .append("g")
            .call(xAxis)
            .attr("transform", `translate(0,${innerHeight})`); // X Axis to bottom
    

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

    }
}

export default LineChart;