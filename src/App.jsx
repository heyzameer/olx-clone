import React, { useEffect, useContext} from 'react';
import './App.css';
import Home from './page/Home';
import Signup from './page/Signup'
import ViewPost from './page/ViewPost'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext,FirebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import Create from './page/Create';
import Post from './store/PostContaxt'

// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from './firebase';


function App() {

  const {user,setUser} = useContext(AuthContext)
  const {auth} = useContext(FirebaseContext)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);
  
  
  return (
    <>
    <Post>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/viewpost' element={<ViewPost />}></Route>
      </Routes>
    </Post>
    </>

  );
}

export default App;
