import './App.css';
import '@fontsource/roboto/700.css';
import Header from './components/Header/Header.js';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
