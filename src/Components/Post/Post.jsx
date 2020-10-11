import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';

function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
        <div className="postHeader">

        <Avatar
            className="postAvatar"
            alt='Rafaeldm'
            src="/static/images/avatar/1.jpg"
            />
        <h3>{username}</h3>
        </div>

            <img className="imagePost" src={imageUrl}></img>
    <h3 className="postText"><strong>{username}</strong>{caption}</h3>
        </div>

    )
}

export default Post
