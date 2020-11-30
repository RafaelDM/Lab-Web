  import React from "react";
  import { Bar } from "react-chartjs-2";
  
  class Chart extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        chartData: this.getData(),
      };
    }
 
  
    getData = () => {
      fetch("http://127.0.0.1:5002/getAnalytics").then((response) =>
        response.json().then((data) => {
          this.setState({
            chartData: {
              labels: data.labels,
              datasets: [
                {
                  label: "Número de reconocimientos",
                  data: data.data,
                  backgroundColor: [
                    "rgba(255, 189, 58, 1)",
                    "rgba(234, 81, 81, 1)",
                    "rgba(51,153,102,1)",
                    "rgba(51,153,204,1)",
                    "rgba(74, 224, 173, 1)",
                  ],
                },
              ],
              chartIsLoaded: false,
            },
          });
        })
      );
    };


    static defaultProps = {
      displayTitle:true,
      displayLegend:true, 
      legendPosition:'top',
    }
   
    render() {
      return (
        <div className="chart">
          <Bar
            data={this.state.chartData}
            width={700}
            height={500}
            options={{
              title: {
                display: this.props.displayTitle,
                text: " 5 Intentos más reconocidos ",
                fontSize: 25,
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition,
                labels: {
                  fontColor: "#fff",
                },
              },
              layout: {
                padding: {
                  left: 50,
                  right: 0,
                  bottom: 0,
                  top: 10,
                },
              },
              tooltips: {
                enabled: true,
              },
            }}
          ></Bar>
        </div>
      );
    }
  }
  export default Chart;
  

  
