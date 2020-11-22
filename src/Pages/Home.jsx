import React,  {useState, useEffect} from "react";
import "../App.css";
import Post from "../Components/Post/Post";
import {db} from "../DB/firebase.jsx";
import Dogid from "../Components/dogID";
import ImageUpload from "./../Components/ImageUpload";
import { useAuth0 } from '@auth0/auth0-react';

export default function Home ()
  {
    const { user } = useAuth0();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
      db.collection('Posts')
      //.orderBy("timestamp", "desc")
      .onSnapshot(snapshot=>{
    
        setPosts(snapshot.docs.map(doc=>({
          id: doc.id,
          post: doc.data()
        })));
      })
    },[]);

    return (
      <div>
        <ImageUpload username={user.name}></ImageUpload>
        <div className="cardRow">
              {posts.map(({id, post})=>(
                  <Post 
                    key={id} 
                    caption={post.caption} 
                    username={post.username} 
                    imageUrl={post.imageUrl}/>
              ))}
        </div>
      </div>
    );
  
}

