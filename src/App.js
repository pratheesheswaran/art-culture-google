import React, {Component} from 'react';
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

      this.getRandomArt(); 
    
  }
  componentDidMount() {
    document.addEventListener('click', this.getArt);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.getArt);
  }
  getArt=()=>{
    let jsonLength = json.length;
    let randomArt =Math.abs(Math.floor(Math.random() * (0 - Math.floor(jsonLength))) + 0); 
    console.log('randomArt',randomArt)
    this.setState({currentArt: json[randomArt],loading:false})
    console.log('art', json[randomArt], randomArt)
  }
  getRandomArt(){
    setInterval(()=> {
     this.getArt()
      }, 10000);

  }
  render() {
    return (
      <div class='wrapper'>
        <img id='img' src={this.state.currentArt.image}></img>
      </div>
    )
  }
}

export default App;
