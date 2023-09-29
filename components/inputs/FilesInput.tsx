import { useRef } from "react";

const FilesInput = ({ handleChange, warning, accept, previewName }: FileInputProps) => {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="bg-white flex items-center pl-3 justify-between rounded-10 my-2 w-full ...">
        <div>
          {previewName !== undefined &&
                previewName.length > 10
                ? previewName.slice(0, 9) +
                    "..." +
                    previewName.slice(-3)
                : previewName}
        </div>
        <button
          className="p-2 rounded-r-10 bg-ads360gray-100"
          onClick={() => input.current?.click()}
        >
          browse
        </button>
      </div>
      <input
        type="file"
        hidden
        onChange={(e)=>handleChange(e, accept)}
        ref={input}
        accept={`${accept}/*`}
      />
      <p className="text-red-500 mb-6">
        {warning}
      </p>
    </div>
  );
};

export default FilesInput;
