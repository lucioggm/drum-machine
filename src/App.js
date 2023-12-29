  import './App.css';
  import { useState, useEffect } from "react";

  function App() {
    const [buttonSelected, setButtonSelected] = useState();
    const [soundSelected, setSoundSelected] = useState("Display");
    const buttonLetters = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
    const soundList = ["Alien", "Beep", "Boom", "Coin", "Fun", "Hat", "Kick", "Random", "Rare"];

    useEffect(() => {
      const handleKeyPress = (e) => {
        const tecla = e.key.toUpperCase();
        setButtonSelected(tecla);
        setSoundSelected(relecionadorEntreLetraSonido(tecla));
      };

      document.addEventListener("keydown", handleKeyPress);

      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, []);

    function relecionadorEntreLetraSonido(letra) {
      const soundMapping = {
        "Q": "Alien",
        "W": "Beep",
        "E": "Boom",
        "A": "Coin",
        "S": "Fun",
        "D": "Hat",
        "Z": "Kick",
        "X": "Random",
        "C": "Rare"
      };

      return soundMapping[letra] || "Display";
    }

    function Display() {
      return <div id={"display"}>{soundSelected}</div>;
    }

    useEffect(() => {
      if (buttonLetters.includes(buttonSelected)) {
        const button = document.getElementById("b"+buttonSelected)
        const audio = document.getElementById(buttonSelected);
        audio.play().catch(err => {
          console.error("Error al reproducir el sonido:", err);
        });
      }
    }, [buttonSelected]);

    function handleClick(e) {
      const nuevo = e.currentTarget.innerText;
      setButtonSelected(nuevo);
      setSoundSelected(relecionadorEntreLetraSonido(nuevo));
    }

    function Pad() {
      return buttonLetters.map((key, index) => (
          <button
              id={"b"+key}
              className={`drum-pad ${key === buttonSelected ? 'active' : ''}`}
              key={index}
              onClick={handleClick}
          >
            {key}
            <audio id={key} src={`/${soundList[index]}.wav`}></audio>
          </button>
      ));
    }


    return (
        <div id={"drum-machine"}>
          <h1 className={"title"}>{"Drum Machine Cliptune"}</h1>
          <Display />
          <Pad />

          <p className={"firma"}>{"By lucioggm"}</p>
        </div>
    );
  }

  export default App;
