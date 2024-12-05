import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
    const [isSignInForm, setisSignInForm] = useState(true);
    const [errorMessage, seterrorMessage] = useState(null);
    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        //validate the form data
        const message = checkValidData(email.current.value, password.current.value);
        seterrorMessage(message);
        if(message) return;

        //Sign in/signup logics
        if(!isSignInForm){
            //sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value,
                  }).then(() => {
                    const {uid,email,displayName,photoUrl} = auth.currentUser;
                  dispatch(addUser({uid:uid,email:email,displayName:displayName}));
                  navigate("/browse");
                  }).catch((error) => {
                    seterrorMessage(error.message);
                  });
                console.log(user);
                navigate("/browse");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                seterrorMessage(errorCode + "-" + errorMessage)
                
            });
        }
        else{
            //sign in logics
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate("/browse");
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterrorMessage(errorCode + "-" + errorMessage);
            });
        }

    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img 
                src="https://user-images.githubusercontent.com/16425113/129554147-6ac7ba51-43e7-4c8e-ba77-e646a3ef6b12.jpg" 
                alt="Background-image"
                />
            </div>
            <form onSubmit={(e)=> e.preventDefault()} className="absolute p-10 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input type="text" ref={name} placeholder="Full Name" className="p-2 my-2 w-full bg-gray-600" />
                )}
                <input type="text" 
                ref={email} placeholder="Email Address" className="p-2 my-2 w-full bg-gray-600" />
                
                <input type="password" 
                ref={password}
                placeholder="Password" className="p-2 my-2 w-full bg-gray-600" />
                <p className="text-red-700 text-lg font-bold">{errorMessage}</p>
                <button className="p-2 my-2 bg-red-700 w-full rounded-md" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="p-4 my-2 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In now"}</p>
            </form>
        </div>
    )
};
export default Login;