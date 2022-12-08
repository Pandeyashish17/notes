import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import Modal from "../components/Modal";
import useFetch from "../hooks/UseFetch";
import { PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Home = () => {
  const [user] = useAuthState(auth);
  const [modalOpen, setModalOpen] = useState(false);
  const { data, loading, error, setRand } = useFetch();

  const deleteNote = async (note) => {
    let del = confirm(
      `Are you sure you want to move '${note.title}' to archive?`
    );
    if (del == true) {
      const pathRef = doc(db, "users", user.email);
      await updateDoc(pathRef, {
        notes: arrayRemove(note),
      });
      setRand(Math.random());
      alert(`${note.title} has been deleted`);
      await updateDoc(pathRef, {
        archive: arrayUnion(note),
      });
    } else {
      alert("function aborted");
    }
  };
  return (
    <>
      {data && (
        <div className="relative h-[75vh]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
            {data.notes.map((note) => {
              return (
                <div
                  className="p-4 h-[10vh] bg-slate-300 rounded-md line-clamp-1 overflow-y-scroll "
                  key={note.id}
                >
                  <div className="flex justify-between">
                    <span>{note.title}</span>
                    <div className="flex gap-2">
                      <TrashIcon
                        className="w-6 h-6 text-black   hover:text-gray-500   hover:scale-105 duration-300 transition-all cursor-pointer"
                        onClick={() => deleteNote(note)}
                      />
                      <Link to={`/edit/${note.id}`}>
                        <PencilAltIcon className="w-6 h-6 text-black hover:text-gray-500 hover:scale-105 duration-300 transition-all cursor-pointer" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            className="fixed right-5 bottom-4 bg-indigo-700 transition-all hover:scale-105 duration-500 p-2 hover:bg-indigo-500 rounded-full"
            to="/add"
          >
            <PlusIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
