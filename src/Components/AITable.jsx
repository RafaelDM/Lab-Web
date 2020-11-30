import React from "react";
import '../App.css'
import axios from 'axios'

class AITable extends React.Component {

  state = {
    allIntents: [],
  }


  componentDidMount() {
      this.getAllintents();
  }

  async getAllintents() {
    let url = 'http://127.0.0.1:5002/getAllintents';
    const res = await axios.get(url);
    this.setState({allIntents: res.data.sort(this.compareRequests)});
  }   

  render() {

    return (
          <div className = "tableContainer">
            <table className="table table-bordered table-striped table-light table-hover">
            <thead>
              <tr>
                <th className="text-center" scope="col">Intent</th>
                <th className="text-center" scope="col">Entidad</th>
                <th className="text-center" scope="col">Valor de entidad</th>
                <th className="text-center" scope="col">Fuente</th>
                <th className="text-center" scope="col">Peticiones</th>
              </tr>
            </thead>
            <tbody>
              { 
                this.state.allIntents.map(intent => {
                  return (
                    <tr>
                      <td className="text-center">{ intent.intent }</td>
                      <td className="text-center">{ intent.entity }</td>
                      <td className="text-center">{ intent.entity_value }</td>
                      <td className="text-center">{ intent.source }</td>
                      <td className="text-center">{ intent.requests }</td>
                    </tr>
                  )
                })
              }
            </tbody>
            </table>
          </div>
    );
  }
}
export default AITable;
