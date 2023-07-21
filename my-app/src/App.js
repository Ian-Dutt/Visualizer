import './App.css';
import SearchAlgorithmVisualizer from "./Components/SearchAlgorithmVisualizer"
import Sorting from './Components/Sorting';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './Components/NavBar';


function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/pathfinder' element={<SearchAlgorithmVisualizer />}></Route>
        <Route path='/sorting' element={<Sorting />}></Route>
      </Routes>
    </Router>
  );
}

function Main(){
  return (
    <div className='App-header'>
      <p>
        <h1> Search and Sorting Algorithm Visualizer</h1>
        This is a search and sorting algorithm visualizer
        <br/>
        Created by Ian Dutt
      </p>
    </div>
  )
}

export default App;
