import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseContext } from './store/Context.jsx'
import Context from './store/Context.jsx'
import { app, auth, db, storage } from './firebase.js';

createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={{ app, auth, db, storage }}>
    <Context>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </Context>
  </FirebaseContext.Provider>,
)
