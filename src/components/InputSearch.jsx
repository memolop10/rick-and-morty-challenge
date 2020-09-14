import React, { Component } from "react";

function InputSearch(props){
    return(
        <div className="InputBusqueda">
          <input
            type="text"
            placeholder="Name"
            onChange={props.handleInput}
          />
        </div>
    )
}

export default InputSearch;