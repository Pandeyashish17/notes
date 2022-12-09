import { useParams } from "react-router-dom";
import React, { useRef, useState } from "react";
import useFetch from "../hooks/UseFetch";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuid } from "uuid";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const Edit = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const { data } = useFetch();
  const [disabled, setDisabled] = useState(true);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  const notify = (text) =>
    toast(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const updateDetails = async (note) => {
    if (editorRef.current) {
      setLoading(true);
      const pathRef = doc(db, "users", user.email);
      await updateDoc(pathRef, {
        notes: arrayUnion({
          id: uuid(),
          title: noteTitle,
          details: editorRef.current.getContent(),
        }),
      });
      await updateDoc(pathRef, {
        notes: arrayRemove(note),
      });
      setLoading(false);
      notify("Updated");
    } else {
      notify("Error");
    }
  };

  const itemDetails = data?.notes.filter((note) => {
    return note.id === id;
  });
  const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <>
      {itemDetails && (
        <div>
          <input
            type="text"
            placeholder="Enter Title Here"
            className="mb-2 rounded-md "
            defaultValue={itemDetails[0]?.title}
            onChange={(e) => setNoteTitle(e.target.value)}
            disabled={disabled}
          />
          <button
            onClick={() => setDisabled(!disabled)}
            className="ml-2 px-3 py-1 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white "
          >
            {disabled ? "Edit" : "Disable"}
          </button>
          <Editor
            apiKey="7ex0fvqgqqi0w1pqauigf3vhp0el66d9ne1swvcv90h7dnjf"
            onInit={(evt, editor) => (editorRef.current = editor)}
            disabled={disabled}
            initialValue={itemDetails[0]?.details}
            init={{
              skin: "oxide",

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
          {!disabled && (
            <div className="flex justify-center items-center mt-4">
              {" "}
              <button
                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                onClick={() => updateDetails(itemDetails[0])}
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  {loading ? "..Updating" : "Update"}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Edit;
