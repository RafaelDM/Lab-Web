import React from "react";
import '../App.css'
import UMTable from "../Components/UMTable.jsx";

export default function UnrecognizedMessages() {

    return (
        <div>
            <h1 className="pageTitle">Mensajes No Reconocidos</h1>
            <p className="paragraphText"> En esta página se pueden ver todos los mensajes que no fueron reconocidos por IBM Watson. </p>
            <UMTable />
        </div>
   );
}