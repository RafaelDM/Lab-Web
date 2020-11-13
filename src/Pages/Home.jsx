import React,  {useState, useEffect} from "react";
import "../App.css";
import Post from "../Components/Post/Post";
import {db} from "../DB/firebase.jsx";
import Dogid from "../Components/dogID"

export default function Home ()
  {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
      db.collection('Posts').onSnapshot(snapshot=>{
        setPosts(snapshot.docs.map(doc=>({
          id: doc.id,
          post: doc.data()
        })));
      })
    },[]);

    return (
      <div className="cardRow">
      
      {/*<div className="row">*/}
        
        {/*<div className="column">*/}
          {/* Columna Izquierda */}
        {/*</div>*/}

          {/*<div className="column">*/}
            {/*<Dogid dogName="Pugberto" raza=" Pug" edad=" 10 años"   ubicacion=" Nuevo Leon" imageUrl="https://64.media.tumblr.com/c0d3bffc41a0d2159dd4388a2f65cea2/8bbb2176638ce146-46/s400x600/bbdc6f5813e88c8bef17a600df1984db2c39a38b.jpg" />*/}
            {
            posts.map(({id, post})=>(
                <Post key={id} caption={post.caption} username={post.username} imageUrl={post.imageUrl}/>
            ))
            }
        {/*</div>*/}
      {/*</div>*/}
      </div>
    );
  
}

