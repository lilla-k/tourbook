import './Root.css';
import '@fontsource/roboto/700.css';
import Header from '../Header/Header.js';
import { Outlet } from "react-router-dom";
import tours from "../../trips";

function Root() {

  
  return (
    <div className="Root">
      <Header/>
      <Outlet context={tours}/>
    </div>
  );
}

export default Root;
