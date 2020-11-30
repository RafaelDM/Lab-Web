import React from "react";
import '../App.css'
import AITable from "../Components/AITable.jsx";

export default function AllIntents() {

    return (
        <div>
            <h1 className="pageTitle">Todos los Intents</h1>
            <p className="paragraphText"> En esta página se pueden ver todos los intents detectados por IBM Watson de acuerdo a los mensajes de los usuarios. </p>
            <AITable />
        </div>
   );
}