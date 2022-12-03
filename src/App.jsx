import { Button } from '@mui/material'
import { useState } from 'react'
import { RouterProvider } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path='/' element={<h1>This is the index route</h1>}></Route>

    <Route path='/' element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Route>

  )
);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
