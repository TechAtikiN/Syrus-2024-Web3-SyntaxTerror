import { File, FilePen } from "lucide-react";
import React from "react";

const PDFUpload = () => {
  return (
    <div className="border-2 py-3 rounded-md w-[30%] mx-auto border-dashed">
      <div className="flex flex-col items-center justify-center pt-7 cursor-pointer">
        <FilePen className="mx-auto w-24 h-24" />
        <input
          type="file"
          multiple
          className="h-10 w-full mx-auto opacity-0 cursor-pointer"
          accept="application/pdf"
        />
        <p className="py-1 text-base font-semibold ">
          Drag & Drop here to upload
        </p>
      </div>
    </div>
  );
};

export default PDFUpload;
