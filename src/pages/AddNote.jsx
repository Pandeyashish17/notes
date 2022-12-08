import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

const AddNote = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [user] = useAuthState(auth);

  const notify = () =>
    toast("Added", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const errorFunction = () =>
    toast("Error", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const AddDetails = async () => {
    if (editorRef.current && noteTitle && noteTitle.length != 0) {
      setError(false);
      setLoading(true);
      const pathRef = doc(db, "users", user.email);
      await updateDoc(pathRef, {
        notes: arrayUnion({
          id: uuid(),
          title: noteTitle,
          details: editorRef.current.getContent(),
        }),
      }).then((res) => {
        notify();
        setLoading(false);
        setNoteTitle("");
      });
    } else {
      setLoading(false);
      errorFunction();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Title Here"
        value={noteTitle}
        className="mb-2 rounded-md "
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      <Editor
        apiKey="7ex0fvqgqqi0w1pqauigf3vhp0el66d9ne1swvcv90h7dnjf"
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          skin: "oxide",
          height: 300,
          skin: useDarkMode ? "oxide-dark" : "oxide",
          content_css: useDarkMode ? "dark" : "default",
          plugins:
            "preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export footnotes mergetags autocorrect",
          mobile: {
            plugins:
              "preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable footnotes mergetags autocorrect",
          },
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags",
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          spellchecker_ignore_list: ["Ephox", "Moxiecode"],
          autocorrect_capitalize: true,
          toolbar_mode: "sliding",
          tinycomments_mode: "embedded",
          image_caption: true,
          noneditable_class: "mceNonEditable",
          content_style: ".mymention{ color: gray; }",
          contextmenu: "link image editimage table configurepermanentpen",
          a11y_advanced_options: true,
          menu: {
            tc: {
              title: "Comments",
              items: "addcomment showcomments deleteallconversations",
            },
            favs: {
              title: "My Favorites",
              items: "code visualaid | searchreplace | emoticons",
            },
          },
          menubar: "favs file edit view insert format tools table help",
          content_css: "css/content.css",
        }}
      />
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={AddDetails}
          className="relative inline-block px-4 py-2 font-medium group"
          disabled={loading}
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span className="relative text-black group-hover:text-white">
            {loading ? "...adding" : "Add Note"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddNote;
