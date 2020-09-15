import React, { Component } from "react";

function InputSearch(props){
    const onChangeInput = (event) => {
        if(props.onChangeInput) props.onChangeInput(event.target.value)       
    } 

    return(
        <div className="InputBusqueda">
          <input
            type="text"
            placeholder="Name"
            onChange={onChangeInput}
          />
        </div>
    )
}

export default InputSearch;