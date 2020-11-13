import React  from "react";
import {Bar } from 'react-chartjs-2';


class Chart extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      chartData: {
        labels: ['Adoption', 'Adoptar Especifico', 'Information', 'Ubicaciones', 'Anything Else'],
        datasets: [
          {
            label: 'Visited',
            data: [
              20,
              30,
              40,
              50,
              90
            ],
              backgroundColor:[
              'rgba(255, 189, 58, 1)',
              'rgba(255, 0, 0, 0.46)',
              'rgba(255, 191, 0, 0.46)',
              'rgba(20, 154, 0, 0.46)',
              'rgba(74, 224, 173, 0.46)'
            ],
          }
        ]
      }
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend:true, 
    legendPosition:'top'
  }
    render(){
        return (
            <div className="chart">
              <Bar 
              data = {this.state.chartData}
              width = {700}
              height= {500}
              options = {
                {
                  title:{
                    display:this.props.displayTitle,
                    text: 'Intents visited ',
                    fontSize: 25
                  },
                  legend:{
                    display:this.props.displayLegend,
                    position:this.props.legendPosition,
                    labels:{
                      fontColor:'#fff'
                    }
                  },
                  layout:{
                    padding:{
                      left:50,
                      right:0,
                      bottom:0,
                      top:10
                    }
                  },
                  tooltips:{
                    enabled:true
                  }
                }
              }
              ></Bar>
            </div>
          );
    }
}
export default Chart;