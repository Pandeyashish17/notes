import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const saveUser = async (user) => {
    const userRef = doc(db, "users", user.email);
    const docSnap = await getDoc(userRef);
    docSnap.exists()
      ? null
      : await setDoc(doc(db, "users", user.email), {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          imageUrl: user.photoURL,
          notes: [],
          archive: [],
        });
  };

  const handleUserAuth = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        saveUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="grid place-content-center min-h-screen">
        <h1 className=" text-4xl font-semibold leading-[50px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 mb-10">
          Login To Get Access
        </h1>
        <div className="flex justify-center items-center p-2 rounded-md">
          <div>
            <button
              onClick={() => handleUserAuth()}
              className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden cursor-pointer font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
              <span className="relative">Login using Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
