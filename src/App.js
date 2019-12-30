import React, { Component } from 'react';
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
let json = require('./data.json');


class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      currentArt: json[Math.abs(Math.floor(Math.random() * (0 - Math.floor(json.length))) + 0)]
    }
  }
  // onClickEvent= () => {
  // console.log("testing",json.length)
  // this.setState({loading:true})
  // this.getRandomArt();

  //   }
  componentWillMount() {

    this.getArt();

  }
  // componentDidMount() {
  //   document.addEventListener('click', this.getArt);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('click', this.getArt);
  // }
  getArt = () => {
    let jsonLength = json.length;
    let randomArt = Math.abs(Math.floor(Math.random() * (0 - Math.floor(jsonLength))) + 0);
    console.log('randomArt', randomArt)
    this.setState({ currentArt: json[randomArt], loading: false })
    console.log('art', json[randomArt], randomArt)
  }
  // getRandomArt(){
  //   setInterval(()=> {
  //    this.getArt()
  //     }, 10000);

  // }
  render() {
    return (
      <div className='container'>
        <div className='wrapper'>
          <img id='img' src={this.state.currentArt.image}></img>

        </div>
        <div className='details'>
          <div className='sub-details'>
          <h1>{this.state.currentArt.title}</h1>
          <span className='sub-title'><p>{this.state.currentArt.title} | {this.state.currentArt.attribution}</p></span>
          </div>
          <div className='refresh-btn' onClick={this.getArt}>
            <p><FontAwesomeIcon icon={faRedo} /></p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
