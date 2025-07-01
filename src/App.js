/*
import logo from './logo.svg';
import './App.css';

function Welcome(props){
  return <h2> Welcome, {props.name}!</h2>;
}

function App() {
  return (
    <div style={{textAlign: "center"}}>
      <Welcome name="Kyle Eurie"/>
      <Welcome name="A."/>
      <Welcome name="Gulapa"/>
    </div>
  );
}



export default App;
*/
/*
import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function Counter(){
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count + 1);
  }

  function resetClick(){
    setCount(count * 0);
  }

  return(
    <div style={{textAlign: "center"}}>
      <p>You clicked {count} times.</p>
      <button onClick={handleClick}>Click me</button>
      <button onClick={resetClick}>Reset</button>
    </div>
  )
}
  function App(){
    return(
      <div>
      <Counter />
      </div>
    )
  }
  export default App;
*/
import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',

];

function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}

function App() {
  const [images, setImages] = useState(Array(4).fill().map(getRandomImage));

  const handleClick = () => {
    setImages(images.map(() => getRandomImage()));
  };

  return (
    <div className="container">
      <h1> Chicken Banana Game!</h1>
      <div className="grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Random"
            className="square"
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;