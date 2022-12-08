import { PencilAltIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db } from "../config/firebase";
import useFetch from "../hooks/UseFetch";

const Archive = () => {
  const { data, setRand } = useFetch();
  const [user] = useAuthState(auth);
  const deleteNote = async (note) => {
    let del = confirm(`Are you sure you want to delete '${note.title}' note?`);
    if (del == true) {
      const pathRef = doc(db, "users", user.email);
      await updateDoc(pathRef, {
        archive: arrayRemove(note),
      });
      setRand(Math.random());
      alert(`${note.title} has been deleted`);
    } else {
      alert("function aborted");
    }
  };
  return (
    <>
      {data && (
        <div className="relative h-[75vh]">
          {data.archive.length == 0 ? (
            " no notes in archive"
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
              {data.archive.map((note) => {
                return (
                  <div
                    className="p-4 h-[10vh] bg-slate-300 rounded-md line-clamp-1 overflow-y-scroll "
                    key={note.id}
                  >
                    <div className="flex justify-between">
                      <span>{note.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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

export default Archive;
