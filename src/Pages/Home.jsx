import React,  {useState, useEffect} from "react";
import "../App.css";
import Post from "../Components/Post/Post";
import {db} from "../DB/firebase.jsx";

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
      <div className="Home">
      <div className="row">
      
      <div className="column">
        {/* Columna Izquierda */}
      </div>

        <div className="column">

        {
        posts.map(({id, post})=>(
            <Post key={id} caption={post.caption} username={post.username} imageUrl={post.imageUrl}/>
         ))
         }
      </div>
  

      </div>
      </div>
    );
  
}

