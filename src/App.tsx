import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [resttime, setresttime] = useState(false);
  const [worktime, setworktime] = useState(false);
  const [min, setmin] = useState(25);
  const [second, setsecond] = useState(0);

  useEffect(() => {
    //---------------------------------------------------------------------------------------------------------------
    let timer;
    timer = setInterval(() => {
      if (worktime || resttime) {
        if (second > 0) {
          setsecond(second - 1);
        } else if (min > 0) {
          setmin(min - 1);
          return setsecond(59);
        } else {
          clearInterval(timer);
          if (worktime) {
            setresttime(true);
            setworktime(false);
            setmin(5);
            setsecond(0);
          } else if (resttime) {//on peut ajouter nmbre de section
            setworktime(true);
            setresttime(false);
            setmin(25);
            setsecond(0);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [worktime, resttime, min, second]);

  const demarer = () => {
    setworktime(true);
  };

  const reset = () => {
    setworktime(false);
    setsecond(0);
    setmin(25);
  };

  return (
    <body>
      <section>
        <h1 id="title">{resttime ? "Setion de repos" : "Setion de travail"}</h1>
        <p id="timer">
          {min < 10 ? "0" + min : min}:{second < 10 ? "0" + second : second}
        </p>
        
        <div className="demarer-reni">
          <button onClick={demarer} id="demarer">
            Demarer
          </button>
          <button onClick={reset} id="reinitialiser">
            Réinitialiser
          </button>
        </div>
      </section>
    </body>
  );
}

export default App;