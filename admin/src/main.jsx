import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './index.css'
import App from './App.jsx'

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
