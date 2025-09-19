// Card.jsx
import React, { useEffect, useState } from "react";
import { LuDownload } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { getFileIcon } from "../utils/fileUtils.jsx";

function Card({ data, reference, onRemove, onEdit }) {
    const storageKey = `starred-card-${data.id}`;
    const [isStarred, setIsStarred] = useState(false);
    const [fileURL, setFileURL] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved === "true") setIsStarred(true);
    }, [storageKey]);

    // Build Blob URL from IndexedDB file
    useEffect(() => {
        if (data.file) {
            const url = URL.createObjectURL(data.file);
            setFileURL(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [data.file]);

    const starToggle = () => {
        const newValue = !isStarred;
        setIsStarred(newValue);
        localStorage.setItem(storageKey, newValue);
    };

    const handleDownload = () => {
        const confirmDownload = confirm("Are You sure you want to download the file?")
        if (!confirmDownload) {
            e.preventDefault();
            return;
        }

        const a = document.createElement("a");
        a.href = fileURL;
        a.download = data.file.name;
        a.click();
        URL.revokeObjectURL(fileURL)
    }


    const { icon, label } = getFileIcon(data.extension);

    return (
        <motion.div
            drag
            dragConstraints={reference}
            whileDrag={{ scale: 1.1 }}
            dragMomentum={true}
            dragTransition={{ bounceStiffness: 150, bounceDamping: 20 }}
            className="relative flex flex-col flex-shrink-0 w-42 h-58 sm:w-52 sm:h-65 
             rounded-[40px] bg-zinc-900/90 text-white px-4 sm:px-6 py-6 overflow-hidden"
        >
            {/* Header */}
            <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1">
                    {icon} {label}
                </span>
                <span className="flex items-center gap-2">
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

            {/* Description */}
            <div className="mt-4 flex-1 overflow-hidden">
                <p className="text-xs leading-tight line-clamp-4">
                    {data.desc}
                </p>
            </div>

            {/* Footer */}
            <div className="footer absolute bottom-0 w-full left-0 mt-auto">
                <div className="flex items-center justify-between px-4 sm:px-6 py-2 my-1">
                    <p className="text-xs">• {data.filesize}</p>
                    <span className="flex items-center justify-center gap-2">
                        <span
                            onClick={() => onEdit(data)}
                            className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center cursor-pointer"
                        >
                            <CiEdit />
                        </span>

                        {fileURL && (
                            <button
                                onClick={handleDownload}
                                className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center cursor-pointer"
                            >
                                <LuDownload size=".8em" />
                            </button>
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

