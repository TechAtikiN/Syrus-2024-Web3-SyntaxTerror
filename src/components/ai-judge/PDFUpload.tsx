import { UploadButton } from "@/utils/uploadThing";
import { FilePen } from "lucide-react";
import React from "react";

const PDFUpload = ({
  setFileKey,
  setFileName,
  setFileUrl
}: {
  setFileKey: (fileKey: string) => void;
  setFileName: (fileName: string) => void;
  setFileUrl: (fileUrl: string) => void;
}) => {
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
        <button className="">
          <UploadButton
            endpoint="pdfUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              setFileKey(res[0].key);
              setFileName(res[0].name)
              setFileUrl(res[0].url)
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </button>

      </div>
    </div>
  );
};

export default PDFUpload;
