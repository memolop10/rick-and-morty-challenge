import React from 'react';
import InputSearch from './components/InputSearch'
import './App.css';
import './lib/api';
import api from './lib/api';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modalActivo:false,
      personajes: [],
      pSeleccionado:{},
      searchPersonaje:''
    }
  }

    componentDidMount(){
      api.getAllCharacters()
        .then(results => {
          this.setState({
            personajes:results
          })
        })
        .catch(e => console.error(e))
    }

    handleInput = (e) => {
      console.log(e.target.value)
      this.setState({
        searchPersonaje:e.target.value
      })
    }

    ActivarModal(id){
      api.getCharacterById(id)
        .then(p => {
          this.setState({
            modalActivo:true,
            pSeleccionado:p
          })
        })
    }

    DesactivarModal(){
      this.setState({
        modalActivo:false
      })
    }

  renderCards(p){
    return(
      <div key={p.id} className="Card" onClick={() => this.ActivarModal(p.id)}>
        <div className="Card-image">
          <figure>
            <img alt='lo que sea' src={p.image}/>
          </figure>
        </div>
      <div className="Card-description">
        <div className="Card-name">
          <h3>{p.name}</h3>
        </div>
      </div>
    </div>
    )
  }

  render(){
    const {modalActivo,personajes} = this.state
     const cards = personajes.map(p => this.renderCards(p))

     let filteredPersonaje = this.state.personajes.filter((p) => {
       return p.name.toLowerCase().includes(this.state.searchPersonaje.toLowerCase())
     })
  return ( 
    <>
      <div className="App-contenedor">
        <h1>Rick and Morty</h1>
        <InputSearch handleInput={this.handleInput}/>
        <div className="Cards-container">
          {cards}
        </div>
        {modalActivo ? (
          <div className="Modal" onClick={e => this.DesactivarModal(e)}>
           <div className="Card-detalle">
            <div className="Card-image">
              <figure>
                <img alt='lo que sea' src={this.state.pSeleccionado.image}/>
              </figure>
            </div>

                <div className="Card-detalle-descripcion">
                  <div className="Descripcion">
                        <h3>{this.state.pSeleccionado.name}</h3>
                    <div className="Caracteristica">
                          <p>Status</p>
                        <p className="Caracteristica-valor">{this.state.pSeleccionado.status}</p>
                    </div>
                    <div className='Caracteristica'>
                        <p>Especie</p>
                      <p className='Caracteristica-valor'>
                      {this.state.pSeleccionado.species}
                      </p>
                    </div>
                    <div className='Caracteristica'>
                      <p>Genero</p>
                      <p className='Caracteristica-valor'>
                        {this.state.pSeleccionado.gender}
                      </p>
                    </div>
                    <div className='Caracteristica'>
                      <p>Origen</p>
                      <p className='Caracteristica-valor'>
                        {this.state.pSeleccionado.origin.name}
                      </p>
                    </div>
                  </div>
                </div>
            </div> 
          </div>
        ):null}
      </div>
    </>
    )
  };
}

export default App;
