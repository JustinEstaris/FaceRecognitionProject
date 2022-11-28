import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";

import Clarifai from 'clarifai';

import './App.css';

const app = new Clarifai.App({
  apiKey: '33c0e84ee16341bbb11e8fb5e62ac793'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},

    }
  }

  calculateFaceLocation = (data) => {
    const clarafaiFace = data.outputs[0].data.regions[0].region_info.bounding_box // Get the bounding box of the 1st face

    //DOM Manipulation
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightCol: width - (clarafaiFace.right_col * width),
      bottomRow: height - (clarafaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log("bounding box values:", box);
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    // console.log(event.target.value); // Gets the input value from the component. 
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }); //Have image url updated to the input. -> Used for the FaceRecognition component.

    // Face Detection API (Model, URL)
    // Models available here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))) // Similar to f(g(x)) - Composite Function.
      .catch(err => console.log(err));
  }



  render() {
    const particlesInit = async (main) => {
      await loadFull(main);
    };

    const particlesLoaded = (container) => {
      //console.log(container);
    };

    return (
      <div className="App" >

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <Particles className="particles" options={particlesOptions} init={particlesInit} loaded={particlesLoaded} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />

      </div>
    );
  }
}


export default App;
