import React from "react";
import '../App.css'
import axios from 'axios'
import firebase from "firebase";
import { storage, db } from "./../DB/firebase";

// let remoteimageurl = "https://s3-external-1.amazonaws.com/media.twiliocdn.com/AC3e78880c8d4ae0f9f463b33acd709f08/5af2b92dd73f84f20db063456dd29751"
// let filename = "images/prueba.jpeg"

class AITable extends React.Component {

  state = {
    allIntents: [],
  }

  componentDidMount() {
      this.getAllintents();
    //   this.uploadingTest();
  }

  async getAllintents() {
    let url = 'http://127.0.0.1:5002/getAllintents';
    const res = await axios.get(url);
    this.setState({allIntents: res.data.sort(this.compareRequests)});
  }   

//   uploadingTest(){
//     fetch(remoteimageurl).then(res => {
//         return res.blob();
//       }).then(blob => {
//           //uploading blob to firebase storage
//          firebase.storage().ref().child(filename).put(blob).then(function(snapshot) {
//           return snapshot.ref.getDownloadURL()
//        }).then(url => {
//          console.log("Firebase storage image uploaded : ", url); 
//         }) 
//       }).catch(error => {
//         console.error(error);
//       });
//   }

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
