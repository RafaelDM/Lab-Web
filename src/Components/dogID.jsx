import React from 'react';
import './dogI.css';

function Dogid({dogName, imageUrl, raza, ubicacion, edad}){

    return (
        <div className="dogID">
            <div className="dogHead">
            <h3>{dogName}</h3>
            </div>
                <img className="imageDog" src={imageUrl}></img>
                <p className="dogInfo"><strong>Raza</strong>{raza}</p>
                <p className="dogInfo"><strong>Edad</strong>{edad}</p>
                <p className="dogInfo"><strong>Ubicacion</strong>{ubicacion}</p>
        </div>
    )
}

export default Dogid
