import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home';
import Menu from './Menu/Menu';
import Cart from './Cart/Cart';
import Menu2 from './Menu2/Menu2';
import TodoList from './Todo-list/TodoList';
import Todo2 from './Todo2/Todo2';
import Timer from './Timer/Timer';
import Counter from './Counter/Counter';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menus' element={<Menu />} />
        <Route path='/menus2' element={<Menu2 />} />
        <Route path='/my-cart' element={<Cart />} />
        <Route path='/todo-list' element={<TodoList />} />
        <Route path="/todo2" element={<Todo2 />} />
        <Route path='/timer' element={<Timer />} />
        <Route path='/counter' element={<Counter />} />
      </Routes>
    </div>
  );
}

export default App;
