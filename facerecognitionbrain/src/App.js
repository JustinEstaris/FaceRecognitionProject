import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";

import './App.css';

class App extends Component {
  render() {
    const particlesInit = async (main) => {
      await loadFull(main);
    };

    const particlesLoaded = (container) => {
      console.log(container);
    };

    return (
      <div className="App" >

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        <Particles className="particles" options={particlesOptions} init={particlesInit} loaded={particlesLoaded} />
        {/*<FaceRecognition /> */}

      </div>
    );
  }
}


export default App;
