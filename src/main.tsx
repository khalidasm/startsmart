import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Registeration from './components/Registeration.tsx';
import Navbar from './components/navbar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
    <Registeration />
    <ToastContainer />
  </React.StrictMode>,
)
