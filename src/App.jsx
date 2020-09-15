import React from 'react';
import CardCharacter from './components/CardCharacter'
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
      searchPersonaje:'',
      personajesFiltrados:[],

    }
    this.onChangeInput = this.onChangeInput.bind(this)
    
  }


    componentDidMount(){
      api.getAllCharacters()
        .then(results => {
          this.setState({
            personajes:results,
            personajesFiltrados:results
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

    onChangeInput(value){
      
      if(!value){
        this.setState({
          personajesFiltrados:[...this.state.personajes]
        })
      }else{
        let filteredPersonaje = this.state.personajes.filter((p) => {
          return p.name.toLowerCase().includes(value.toLowerCase())
        })
        
        this.setState({
          personajesFiltrados:[...filteredPersonaje]
        })
      }
    }

  render(){
    const {modalActivo,personajesFiltrados} = this.state
    const cards = personajesFiltrados.map(character => {
      return  (<CardCharacter key={character.id} name={character.name} image={character.image}/>)
    })

  return ( 
    <>
      <div className="App-contenedor">
        <h1>Rick and Morty</h1>
        <InputSearch onChangeInput={this.onChangeInput}/>
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
