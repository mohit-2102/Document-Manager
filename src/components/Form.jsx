// Form.jsx
import React, { useState, useEffect, useRef } from "react";
import { formatFileSize, getFileExtension } from "../utils/fileUtils.jsx";
import { db } from "../config/db";

function Form({ onClose, initialData }) {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const formRef = useRef();

  useEffect(() => {
    if (initialData) {
      setDesc(initialData.desc || "");
      setFile(initialData.file || null);
    }
  }, [initialData]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // ✅ Directly store the File/Blob
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!desc || !file) {
      alert("Please add description and upload a file.");
      return;
    }

    const newData = {
      desc,
      file, // ✅ Blob/File
      filesize: formatFileSize(file.size),
      extension: getFileExtension(file.name),
    };

    if (initialData?.id) {
      await db.docs.update(initialData.id, newData); // ✅ update
    } else {
      await db.docs.add(newData); // ✅ add
    }

    onClose();
  };

  return (
    <div className="overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-zinc-900/90 text-white p-6 rounded-3xl w-full max-w-md shadow-xl flex flex-col gap-4 border border-zinc-800 backdrop-blur-sm"
      >
        <h2 className="text-xl font-semibold text-center mb-2">
          {initialData ? "Edit Document" : "Add Document"}
        </h2>

        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-zinc-800 text-white placeholder-zinc-400 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="bg-zinc-800 text-white px-4 py-2 rounded-xl cursor-pointer"
        />

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-700 rounded-xl hover:bg-zinc-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          >
            {initialData ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;

