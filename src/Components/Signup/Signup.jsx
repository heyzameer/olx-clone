import React, { useState, useContext } from 'react';
import Logo from '../../assets/olx-logo.svg';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const [signupState, setSignupState] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { auth, db } = useContext(FirebaseContext); // Use context auth
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    if (signupState === "Sign Up") {
      // Handle sign-up logic
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        await addDoc(collection(db, 'users'), {
          id: userCredential.user.uid,
          username: username,
          email: email,
          phone: phone,
        });
        toast.success('User created successfully!');
        navigate('/'); // Redirect to home after successful sign-up
      } catch (error) {
        console.error('Error during sign-up:', error.message); // Log error details
        toast.error(error.code.split('/')[1].split('-').join(" "));
      }
    } else {
      // Handle sign-in logic
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in successfully!');
        navigate('/'); // Redirect to home after successful login
      } catch (error) {
        console.log('Error during sign-in:', error); // Log error details
        toast.error(error.code.split('/')[1].split('-').join(" "));
      }
    }
  };

  return (
    <div className="signupParentDiv">
      <img width="100px" height="100px" src={Logo} alt="Logo" />
      <form onSubmit={handleSubmit}> {/* Use onSubmit for form handling */}
        {signupState === "Sign Up" && (
          <>
            <label>Username</label>
            <input
              className="input"
              type="text"
              id="fname"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required // Added required attribute
            />
            <label htmlFor="email">Phone</label>
            <input
              className="input"
              type="number"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone Number"
              required // Added required attribute
            />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required // Added required attribute
        />


        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required // Added required attribute
        />

        <button type="submit">{signupState}</button>
      </form>

      <div className="form_switch">
        {signupState === 'Sign In' ? (
          <p>Don't have an account? <span onClick={() => setSignupState("Sign Up")}>Sign Up Now</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => { setSignupState("Sign In"); }}>Sign In Now</span></p>
        )}
      </div>
    </div>
  );
}
