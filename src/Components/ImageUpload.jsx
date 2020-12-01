import React, { useState } from "react";
import firebase from "firebase";
import { storage, db } from "./../DB/firebase";
import "./ImageUpload.css";
import { Input, Button } from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import Fab from "@material-ui/core/Fab";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Zoom from "@material-ui/core/Zoom";

function ImageUpload ({ username }) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [contact, setContact] = useState("");
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);

  function resetStates(){
    setProgress(0);
    setCaption("");
    setContact("");
    setImage(null);
    setLoading(false);
    setExpand(false);
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  
  const handleUpload = (e) => {
  
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    setLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);

            // post image inside db
            db.collection("Posts").add({
              imageUrl: url,
              caption: caption,
              contacto: contact,
              username: username,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            resetStates();
          });
      }
    );
    
  };

  return (
    <div>
      <form className="imageupload" onSubmit={(e)=>e.preventDefault()}>
        {loading && (<progress className="imageupload__progress" value={progress} max="100" />)}
        <textarea className="imageCapt"
          placeholder="Enter a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          onClick={()=>setExpand(true)}
          rows={expand? "2": "1"}
        />
        <textarea className="imageCapt"
          placeholder="Enter a contact..."
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onClick={()=>setExpand(true)}
          rows={expand? "2": "1"}
        />
          <Fab 
            className="imageupload__button"  
            type="submit" 
            onClick={
              (e)=>{if(image==null){
                      alert("No image was provided!");
                      resetStates();
                    } else {
                      handleUpload(e)
                    }
                  }}>
            <PublishIcon />
          </Fab>
          <input type="file" onChange={handleChange} />
        <br />
      </form>
    </div>
  );
};

export default ImageUpload;