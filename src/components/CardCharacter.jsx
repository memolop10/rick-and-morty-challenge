import React, { Component } from "react";


function CardCharacter(props){
    
    const { name , image , clickHandler} = props
    return(

        <div className="Card" onClick={clickHandler}>
        <div className="Card-image">
          <figure>
            <img alt='lo que sea' src={image}/>
          </figure>
        </div>
      <div className="Card-description">
        <div className="Card-name">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
    )
}

export default CardCharacter;