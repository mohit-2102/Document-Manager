import React from "react"

// Format file size dynamically
export function formatFileSize(sizeInBytes) {
  if (sizeInBytes < 1024) return sizeInBytes + " B";
  if (sizeInBytes < 1024 * 1024)
    return (sizeInBytes / 1024).toFixed(2) + " KB";
  return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
}

// Safely get extension
export function getFileExtension(fileName) {
  const parts = fileName.split(".");
  if (parts.length > 1 && parts[parts.length - 1] !== "")
    return parts.pop().toUpperCase();
  return "UNKNOWN";
}

// Extension → icon + label
export function getFileIcon(extension) {
  const ext = extension.toLowerCase();
  const map = {
    pdf: { icon: "📄", label: ".pdf" },
    doc: { icon: "📝", label: ".doc" },
    docx: { icon: "📝", label: ".docx" },
    xls: { icon: "📊", label: ".xls" },
    xlsx: { icon: "📊", label: ".xlsx" },
    png: { icon: "🖼️", label: ".png" },
    jpg: { icon: "🖼️", label: ".jpg" },
    jpeg: { icon: "🖼️", label: ".jpeg" },
    gif: { icon: "🖼️", label: ".gif" },
    txt: { icon: "📜", label: ".txt" },
    mp4: { icon: "🎥", label: ".mp4" },
    mp3: { icon: "🎵", label: ".mp3" },
    zip: { icon: "🗂️", label: ".zip" },
    rar: { icon: "🗂️", label: ".rar" },
    exe: { icon: "🗂️", label: ".exe" },
    js: { icon: <img src="/js.png" width={18}  alt="" /> , label: ".js" },
    jsx: { icon: <img src="/jsx.png" width={18} alt="" />, label: ".jsx" },
    html: { icon: <img src="/html.png" width={18} alt="" />, label: ".html" },
    css: { icon: <img src="/css.png" width={18} alt="" />, label: ".css" },
  };

  return map[ext] || { icon: "📁", label: "Unknown File" };
}
