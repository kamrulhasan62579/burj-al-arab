import React, { useContext, useState } from 'react';
import './Login.css'
import { useForm } from 'react-hook-form';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';




const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
 
  const onSubmit = data => {
        console.log(data.password, data.email)
       if (newUser) {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
         console.log('Creating user successfull');
         setLoggedInUser(data)
         history.replace(from);
        })
        .catch((error) => {
          console.log(error.message);
        });
       }
       if (!newUser) {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((res) => {
           console.log('user login successfull', res);
           setLoggedInUser(data)
           history.replace(from);
            })
            .catch((error) => {
            console.log(error.message);
            });
       }
    };
// Implement google sign in --------------------------------------------------------
var googleProvider = new firebase.auth.GoogleAuthProvider();
const handleGoogleSignIn = () =>{
  firebase.auth()
  .signInWithPopup(googleProvider)
  .then((res) => {
    setLoggedInUser(res.user)
    history.replace(from);
  }).catch((error) => {
     console.log(error.message);
  });
}
// implementation facebook sign in ---------------------------------------
var facebookProvider = new firebase.auth.FacebookAuthProvider();
const handleFacebookSignIn = () => {
  firebase
  .auth()
  .signInWithPopup(facebookProvider)
  .then((res) => {
    setLoggedInUser(res.user)
    history.replace(from);
  })
  .catch((error) => {
    console.log(error.message);
  });
}
// implementation github sign in -=----------------------------------------
var githubProvider = new firebase.auth.GithubAuthProvider();
const handleGithubSignIn = () => {
  firebase
  .auth()
  .signInWithPopup(githubProvider)
  .then((res) => {
    setLoggedInUser(res.user)
    history.replace(from);
  }).catch((error) => {
     console.log(error.message);
  });
}
  return (
   <div>
     {
         newUser ? <form onSubmit={handleSubmit(onSubmit)}>
         <div className="newUserForm">
             <input className="input" type="text" placeholder="First name" {...register("firstName", {required: true, maxLength: 8})} /> 
             <br/>{errors.firstName && errors.firstName.type === "required" && <span className="error">First name is required</span>}
             {errors.firstName && errors.firstName.type === "maxLength" && <span className="error">Max length exceeded</span> }
             <br/>
             <input className="input" type="text" placeholder="Last name" {...register("lastName", {required: true, maxLength: 8})} />
             <br/>{errors.firstName && errors.firstName.type === "required" && <span className="error">Last name is required</span>}
             {errors.firstName && errors.firstName.type === "maxLength" && <span className="error">Max length exceeded</span> }
             <br/>
             <input className="input" type="text" placeholder="Email" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />    
             <br/>{errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
             {errors.email && errors.email.type === "pattern" && <span className="error">You should insert email like  /\S+@\S+\.\S+/ pattern</span> }
             <br/>
             <input className="input" type="tel" placeholder="Mobile number" {...register("number", {required: true, minLength: 6, maxLength: 12})} />   
             <br/> {errors.number && errors.number.type === "required" && <span className="error">Mobile number is required</span>}
             {errors.number && errors.number.type === "maxLength" && <span className="error">Max length exceeded</span> }
             <br/>
             <input className="input" type="password" placeholder="Password" {...register("password", {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, minLength: 8, maxLength: 30})} />
             <br/> {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
             {errors.password && errors.password.type === "pattern" && <span className="error">Password must have min 1 uppercase letter, min 1 lowercase letter, min 1 special character, min 1 number, min 8 characters, max 30 characters.</span> }
             <br/> 
                 <div className="radioInput">
                 <span>Are you a developer?</span>  <br/>
                     <label htmlFor="Developer">1. Yes</label> <input  {...register("Developer", { required: true })} type="radio" value="Yes" /> <br/>
                     <label htmlFor="Developer">2. No</label> <input {...register("Developer", { required: true })} type="radio" value="No" /> 
                 </div>
             <br/>
 
             <input className="input" value="Submit" type="submit" />
         </div>
     </form>
      : 
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="newUserForm">
            <input className="input" type="text" placeholder="Email" {...register("email", {required: true})} />    
            <br/>{errors.email && errors.email.type === "required" && <span className="error">Email is required</span>}
            <br/>
            <input className="input" type="password" placeholder="Password" {...register("password", {required: true})} />
            <br/> {errors.password && errors.password.type === "required" && <span className="error">Password is required</span>}
            <br/>
            <input className="input" value="Submit" type="submit" />
        </div>
    </form>
     } <br/>
     {
       newUser ? <p style={{textAlign: 'center'}}>Already have an account? <span style={{color: 'blue'}} onClick={() => setNewUser(!newUser)}>Log In</span></p> : 
       <p style={{textAlign: 'center'}}>Are you a new user? <span style={{color: 'blue'}} onClick={() => setNewUser(!newUser)}>Sign Up</span></p>
     }
     <br/><br/>
     <div className="popup" style={{textAlign: 'center'}}>
         <button onClick={handleGoogleSignIn}>Sign in with Google</button> <br/> <br/>
         <button onClick={handleFacebookSignIn}>Sign in with Facebook</button> <br/> <br/>
         <button onClick={handleGithubSignIn}>Sign in with Github</button>
     </div>
   </div>
  );
}
export default Login;