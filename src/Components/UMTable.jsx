import React from "react";
import '../App.css'
import axios from 'axios'

class UMTable extends React.Component {

  state = {
    unrecognized_messages: []
  }

  componentDidMount() {
      this.getUnrecognizedMessages();
  }

  async getUnrecognizedMessages() {
    let url = 'http://127.0.0.1:5002/getUnrecognizedMessages';
    const res = await axios.get(url);
    this.setState({unrecognized_messages: res.data});
  }   

  render() {

    return (
          <div className = "tableContainer">
            <table className="table table-bordered table-striped table-light table-hover">
            <thead>
              <tr>
                <th className="text-center" scope="col">Mensaje</th>
                <th className="text-center" scope="col">Fuente</th>
                <th className="text-center" scope="col">Repeticiones</th>
              </tr>
            </thead>
            <tbody>
              { 
                this.state.unrecognized_messages.map(unrecognized_message => {
                  return (
                    <tr>
                      <td className="text-center">{ unrecognized_message.message }</td>
                      <td className="text-center">{ unrecognized_message.source }</td>
                      <td className="text-center">{ unrecognized_message.repetitions }</td>
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
export default UMTable;
