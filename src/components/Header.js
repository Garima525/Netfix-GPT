import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {}).catch((error) => {
            navigate("/error");
        });
    }
    useEffect(()=>{
        const unsbscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid,email,displayName} = user;
              dispatch(addUser({uid:uid,email:email,displayName:displayName}));
              navigate("/browse");
            } else {
              // User is signed out
              dispatch(removeUser());
              navigate("/");
            }
          });
          // unsubscribe when component unmount
          return () => unsbscribe();
    },[]);
    return (
        <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img 
            className="w-44"
            src= {LOGO}
            alt="Logo"
            />
            {user && (<div className="flex p-2">
                {/* <img className="w-12 h-12" src={user.photoUrl} 
                alt="user-icon"  /> */}
                <button className="font-bold text-white " onClick={handleSignOut}>(Sign Out)</button>
            </div>)
            }
        </div>
    )
};
export default Header;