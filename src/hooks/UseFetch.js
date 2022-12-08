import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UseFetch() {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rand, setRand] = useState();
  useEffect(() => {
    if (!user) return;
    let isActive = true;
    const getData = async () => {
      setLoading(true);
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && isActive) {
        setData(docSnap.data());
        setError(false);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    };
    getData();
    return () => {
      isActive = false;
    };
  }, [user, rand]);

  return { data, error, loading, setRand };
}
