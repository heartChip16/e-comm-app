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
import Checkout from './pages/Checkout';
import AuthProvider, { useAuth } from './firebase/Auth';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login"></Navigate>
  } else {
    return children;
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path='/' element={<h1>This is the index route</h1>}></Route>
    <>
      <Route path="/login" element={<Login />}></Route>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }></Route>
      </Route>

    </>

  )
);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AuthProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>

      </AuthProvider>
    </div>
  )
}

export default App
