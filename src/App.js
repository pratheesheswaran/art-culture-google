import React, { Component } from 'react';
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
let json = require('./data.json');
// const path = require('path')
const getColors = require('get-image-colors')

let randColor ='';
class App extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      currentArt: json[Math.abs(Math.floor(Math.random() * (0 - Math.floor(json.length))) + 0)],
      imageStatus:'loading'
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
    this.setState({ currentArt: json[randomArt], loading: false })
    this.setState({ imageStatus: "loading" });
    getColors(json[randomArt].image).then(colors=>{
      let colorsArrLen = colors.length;
      let randomColor = colors[Math.abs(Math.floor(Math.random() * (0 - Math.floor(colorsArrLen))) + 0)];
      let rgb =randomColor && randomColor._rgb ? `rgba(${randomColor._rgb[0]},${randomColor._rgb[1]},${randomColor._rgb[2]},${randomColor._rgb[3]})` : '#b8b8b8;'
      rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 let hexVal = rgb && (rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  console.log('hex', hexVal)
  document.getElementsByClassName('sub-details')[0].style.color = hexVal+'';
  randColor = hexVal+'';
    })
    
  }
  // getRandomArt(){
  //   setInterval(()=> {
  //    this.getArt()
  //     }, 10000);

  // }
  handleImageLoaded=()=>{
    this.setState({ imageStatus: "loaded" });
  }
  handleImageErrored=()=>{
    this.setState({ imageStatus: "failed to load" });
  }
  render() {
    return (
      <div className='container'>
        <div className='wrapper'>
          <img id='img' src={this.state.currentArt.image} 
          onLoad={this.handleImageLoaded} 
          onError={this.handleImageErrored}></img>

        </div>
        <div className='details'>
          <div className='sub-details'>
        <h1>{this.state.imageStatus==='loaded' ? this.state.currentArt.title :''}{this.state.imageStatus==='loading'?'loading...':''}</h1>
          <span className='sub-title'>{this.state.imageStatus=='loaded' ? <p>{this.state.currentArt.title} | {this.state.currentArt.attribution}</p>: ''}</span>
          </div>
          <div className='refresh-btn' onClick={this.getArt} style={{color:randColor}}>
            <p><FontAwesomeIcon icon={faRedo} /></p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
