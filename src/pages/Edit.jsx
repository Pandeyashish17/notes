import { useParams } from "react-router-dom";
import React from "react";
import useFetch from "../hooks/UseFetch";
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuid } from "uuid";

const Edit = () => {
  const { id } = useParams();
  const { data } = useFetch();
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
            defaultValue={itemDetails[0].title}
            disabled={true}
          />
      
            <Editor
              apiKey="7ex0fvqgqqi0w1pqauigf3vhp0el66d9ne1swvcv90h7dnjf"
              initialValue={itemDetails[0].details}
              disabled={true}
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                skin: "oxide",
                height: 600,
                skin: useDarkMode ? "oxide-dark" : "oxide",
                content_css: useDarkMode ? "dark" : "default",

                content_css: "css/content.css",
              }}
            />
          </div>

      )}
    </>
  );
};

export default Edit;
