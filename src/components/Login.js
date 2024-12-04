import { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignInForm, setisSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm);
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
            <form className="absolute p-10 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-600" />
                )}
                <input type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-600" />
                
                <input type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-600" />
                <button className="p-4 my-2 bg-red-700 w-full">{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="p-4 my-2 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In now"}</p>
            </form>
        </div>
    )
};
export default Login;