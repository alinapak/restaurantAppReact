
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Restoran from './components/Restaurant/Restaurant';
import Dishes from './components/Dishes/Dishes';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
 
  return (

    <BrowserRouter >
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/restaurants' element={<Restoran />} />
        <Route path='/dishes' element={<Dishes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
