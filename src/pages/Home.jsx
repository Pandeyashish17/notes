import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Modal from "../components/Modal";

const Home = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    let isActive = true;
    if (!user) return;
    const getData = async () => {
      setError(false);
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && isActive) {
        setData(docSnap.data());
      } else {
        setError(trues);
      }
    };
    getData();
    return () => {
      isActive = false;
    };
  }, [user]);
  console.log(data);
  return (
    <div className="relative h-[75vh]">
      Home
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <button className="fixed right-5 bottom-4 bg-indigo-700 transition-all hover:scale-105 duration-500 p-2 hover:bg-indigo-500 rounded-full" onClick={()=>setModalOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Home;
