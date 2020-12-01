import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Post.css';

function Post({username, caption, imageUrl, contacto}) {
    return (
        <div className="post">
        <div className="postHeader">
        <Avatar
            className="postAvatar"
            alt='Rafaeldm'
            src="/static/images/avatar/1.jpg"
            />
        <h3 className="postUsername">{username}</h3>
        </div>
            <img className="imagePost" src={imageUrl}></img>
            <div className="postInfoContainer">
                <h4 className="postSubtitle">Sobre el perro</h4>
                <p className="postCaption">{caption}</p>
                <h4 className="postSubtitle">Contacto</h4>
                <p className="postCaption">{contacto}</p>
            </div>
        </div>

    )
}

export default Post
