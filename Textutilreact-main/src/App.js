import logo from "./logo.svg";
import "./App.css";
import Navbr from "./components/Navbar";
import TextForm from "./components/TextForm";
import { useState } from "react";
import Alert from "./components/Alert";
import React from "react";

let name = "Dhvani";
function App() {
  const [mode, setMode]= useState('light'); //tell dark mode is enabled or not

  const [alert,setAlert]= useState(null); //text to analyze

  const showAlert= (message, type)=> {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(()=> {
      setAlert(null);
    },1500); // 1.5 seconds
  };

  const toggleMode = ()=> {
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = "black";
      showAlert("Dark mode has been enabled","success");
      document.title = "TextUtils - Dark Mode";
    }else{
      setMode('light');
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled","success");
      document.title = "TextUtils - Light Mode";
    }
  };

  return (
    <>
        <Navbr title="TextUtils" aboutText="About TextUtils" mode={mode} toggleMode={toggleMode}/>
        <Alert alert={alert}/>
        <div className="container my-3">
        <TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode}/>
        </div>
    </>
  );
}

export default App;
