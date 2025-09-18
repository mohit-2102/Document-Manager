import React, { useEffect, useState } from "react";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { getFileIcon } from "../utils/fileUtils";

function Card({ data, reference, onRemove, onEdit }) {
  const storageKey = `starred-card-${data.id}`;
  const [isStarred, setIsStarred] = useState(false);
  const [fileURL, setFileURL] = useState(null);
  

  // Restore starred state
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "true") setIsStarred(true);
  }, [storageKey]);

  // Build Blob URL from Base64
  useEffect(() => {
    if (data.file?.data) {
      const byteString = atob(data.file.data.split(",")[1]);
      const mimeString = data.file.type;
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);
      setFileURL(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [data.file]);

  const starToggle = () => {
    const newValue = !isStarred;
    setIsStarred(newValue);
    localStorage.setItem(storageKey, newValue);
  };

  const { icon, label } = getFileIcon(data.extension);

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragMomentum={true}
      dragTransition={{
        bounceStiffness: 150,
        bounceDamping: 20,
      }}
      className="relative flex-shrink-0 w-52 sm:w-52 h-65 rounded-[40px] bg-zinc-900/90 text-white px-6 py-8 overflow-hidden"
    >
      <span className="flex items-center justify-between gap-2">
        {icon} {label}
        <span className="flex items-center justify-center gap-2">
          <span onClick={starToggle} className="cursor-pointer">
            {isStarred ? <FaStar color="yellow" /> : <FaRegStar />}
          </span>
          <span
            onClick={onRemove}
            className="w-5 h-5 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer"
          >
            <IoClose size=".8em" color="#000" />
          </span>
        </span>
      </span>

      <p className="text-xs mt-6 leading-tight">{data.desc}</p>

      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between px-6 py-2 my-1">
          <p className="text-xs">• {data.filesize}</p>
          <span className="flex items-center justify-center gap-2">
            <span
              onClick={() => onEdit(data)}
              className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center cursor-pointer"
            >
              <CiEdit />
            </span>

            {fileURL && (
              <a
                href={fileURL}
                download={data.file.name}
                onclick={(e)=>{
                    const confirmDelete = confirm("Are you sure you want to download this file?")
                    if(!confirmDelete) e.preventDefault();
                    }
                }
                className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center cursor-pointer"
              >
                <LuDownload size=".8em" />
              </a>
            )}
          </span>
        </div>

        {fileURL && (
          <div
            onClick={() => window.open(fileURL, "_blank")}
            className="tag w-full py-3 flex items-center justify-center text-center cursor-pointer bg-green-600"
          >
            <h3 className="text-sm font-semibold">Reveal</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Card;


