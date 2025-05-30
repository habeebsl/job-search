import React, { useCallback, useRef, useState } from "react";
import useFile from "../store/fileStore";

const acceptedTypes = [
  "text/plain",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const DragAndDrop: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selectedFile, setSelectedFile } = useFile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  React.useEffect(() => {
    if (!selectedFile) {
      clearFileInput();
    }
  }, [selectedFile]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!acceptedTypes.includes(file.type)) {
      setError("Only .txt, .doc, .docx, or .pdf files are allowed.");
      setSelectedFile(null);
      return;
    }
    setError(null);
    setSelectedFile(file);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  return (
    <div
      onClick={() => {
        if (!selectedFile) onBrowseClick();
      }}
      onDrop={selectedFile ? undefined : onDrop}
      onDragOver={selectedFile ? undefined : onDragOver}
      onDragLeave={selectedFile ? undefined : onDragLeave}
      className="flex w-full justify-center items-center flex-col"
      style={{
        height: `${
          selectedFile 
          ? "220px" 
          : "100%"
        }`,
        border: `${
          selectedFile
            ? "2px dashed #ccc"
            : isDragging
            ? ""
            : "2px dashed #007bff"
        }`,
        borderRadius: 8,
        padding: 40,
        textAlign: "center",
        background: "#fff",
        transition: "border-color 0.2s",
        color: "#333",
        outline: isDragging && !selectedFile ? "2px solid #007bff" : "none",
        position: "relative",
        opacity: selectedFile ? 0.6 : 1,
        pointerEvents: selectedFile ? "none" : "auto",
        userSelect: selectedFile ? "none" : "auto",
        cursor: selectedFile ? "not-allowed" : "pointer",
      }}
    >
      <p>
        {selectedFile
          ? `File selected: ${selectedFile.name}`
          : isDragging
          ? "Drop your .txt, .doc, .docx, or .pdf file here"
          : "Drag and drop a .txt, .doc, .docx, or .pdf file here"}
      </p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onBrowseClick();
        }}
        className={`mt-4 mb-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-[5px] 
          ${
            selectedFile
              ? "cursor-not-allowed opacity-60 pointer-events-none"
              : "cursor-pointer opacity-100"
          }`}
        disabled={!!selectedFile}
      >
        Browse File
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.doc,.docx,.pdf"
        style={{ display: "none" }}
        onChange={onFileChange}
        disabled={!!selectedFile}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DragAndDrop;
