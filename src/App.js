import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Home/Home';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import Menu2 from './Menu2/Menu2';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menus' element={<Menu />} />
        <Route path='/menus2' element={<Menu2 />} />
        <Route path='/my-cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
