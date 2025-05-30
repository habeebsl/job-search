import useFile from "../store/fileStore";

interface File {
  fileType: string; 
  fileName: string;
  fileSize: string;
}

function PDF() {
  return (
    <>
      <svg
        height="40"
        width="40"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
      >
        <path
          style={{ fill: "#E2E5E7" }}
          d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"
        />
        <path
          style={{ fill: "#B0B7BD" }}
          d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"
        />
        <polygon
          style={{ fill: "#CAD1D8" }}
          points="480,224 384,128 480,128 "
        />
        <path
          style={{ fill: "#F15642" }}
          d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16
                    V416z"
        />
        <g>
          <path
            style={{ fill: "#FFFFFF" }}
            d="M101.744,303.152c0-4.224,3.328-8.832,8.688-8.832h29.552c16.64,0,31.616,11.136,31.616,32.48
                        c0,20.224-14.976,31.488-31.616,31.488h-21.36v16.896c0,5.632-3.584,8.816-8.192,8.816c-4.224,0-8.688-3.184-8.688-8.816V303.152z
                        M118.624,310.432v31.872h21.36c8.576,0,15.36-7.568,15.36-15.504c0-8.944-6.784-16.368-15.36-16.368H118.624z"
          />
          <path
            style={{ fill: "#FFFFFF" }}
            d="M196.656,384c-4.224,0-8.832-2.304-8.832-7.92v-72.672c0-4.592,4.608-7.936,8.832-7.936h29.296
                        c58.464,0,57.184,88.528,1.152,88.528H196.656z M204.72,311.088V368.4h21.232c34.544,0,36.08-57.312,0-57.312H204.72z"
          />
          <path
            style={{ fill: "#FFFFFF" }}
            d="M303.872,312.112v20.336h32.624c4.608,0,9.216,4.608,9.216,9.072c0,4.224-4.608,7.68-9.216,7.68
                        h-32.624v26.864c0,4.48-3.184,7.92-7.664,7.92c-5.632,0-9.072-3.44-9.072-7.92v-72.672c0-4.592,3.456-7.936,9.072-7.936h44.912
                        c5.632,0,8.96,3.344,8.96,7.936c0,4.096-3.328,8.704-8.96,8.704h-37.248V312.112z"
          />
        </g>
        <path
          style={{ fill: "#CAD1D8" }}
          d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"
        />
      </svg>
    </>
  );
}

function DOC() {
  return (
    <svg
      height="40"
      width="40"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path
        style={{ fill: "#E2E5E7" }}
        d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"
      />
      <path
        style={{ fill: "#B0B7BD" }}
        d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"
      />
      <polygon style={{ fill: "#CAD1D8" }} points="480,224 384,128 480,128 " />
      <path
        style={{ fill: "#50BEE8" }}
        d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16
                V416z"
      />
      <g>
        <path
          style={{ fill: "#FFFFFF" }}
          d="M92.576,384c-4.224,0-8.832-2.32-8.832-7.936v-72.656c0-4.608,4.608-7.936,8.832-7.936h29.296
                    c58.464,0,57.168,88.528,1.136,88.528H92.576z M100.64,311.072v57.312h21.232c34.544,0,36.064-57.312,0-57.312H100.64z"
        />
        <path
          style={{ fill: "#FFFFFF" }}
          d="M228,385.28c-23.664,1.024-48.24-14.72-48.24-46.064c0-31.472,24.56-46.944,48.24-46.944
                    c22.384,1.136,45.792,16.624,45.792,46.944C273.792,369.552,250.384,385.28,228,385.28z M226.592,308.912
                    c-14.336,0-29.936,10.112-29.936,30.32c0,20.096,15.616,30.336,29.936,30.336c14.72,0,30.448-10.24,30.448-30.336
                    C257.04,319.008,241.312,308.912,226.592,308.912z"
        />
        <path
          style={{ fill: "#FFFFFF" }}
          d="M288.848,339.088c0-24.688,15.488-45.92,44.912-45.92c11.136,0,19.968,3.328,29.296,11.392
                    c3.456,3.184,3.84,8.816,0.384,12.4c-3.456,3.056-8.704,2.688-11.776-0.384c-5.232-5.504-10.608-7.024-17.904-7.024
                    c-19.696,0-29.152,13.952-29.152,29.552c0,15.872,9.328,30.448,29.152,30.448c7.296,0,14.08-2.96,19.968-8.192
                    c3.952-3.072,9.456-1.552,11.76,1.536c2.048,2.816,3.056,7.552-1.408,12.016c-8.96,8.336-19.696,10-30.336,10
                    C302.8,384.912,288.848,363.776,288.848,339.088z"
        />
      </g>
      <path
        style={{ fill: "#CAD1D8" }}
        d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"
      />
    </svg>
  );
}

function TXT() {
  return (
    <svg
      height="40"
      width="40"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <path
        style={{ fill: "#E2E5E7" }}
        d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"
      />
      <path
        style={{ fill: "#B0B7BD" }}
        d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"
      />
      <polygon style={{ fill: "#CAD1D8" }} points="480,224 384,128 480,128 " />
      <path
        style={{ fill: "#576D7E" }}
        d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16
                V416z"
      />
      <g>
        <path
          style={{ fill: "#FFFFFF" }}
          d="M132.784,311.472H110.4c-11.136,0-11.136-16.368,0-16.368h60.512c11.392,0,11.392,16.368,0,16.368
                    h-21.248v64.592c0,11.12-16.896,11.392-16.896,0v-64.592H132.784z"
        />
        <path
          style={{ fill: "#FFFFFF" }}
          d="M224.416,326.176l22.272-27.888c6.656-8.688,19.568,2.432,12.288,10.752
                    c-7.68,9.088-15.728,18.944-23.424,29.024l26.112,32.496c7.024,9.6-7.04,18.816-13.952,9.344l-23.536-30.192l-23.152,30.832
                    c-6.528,9.328-20.992-1.152-13.68-9.856l25.696-32.624c-8.048-10.096-15.856-19.936-23.664-29.024
                    c-8.064-9.6,6.912-19.44,12.784-10.48L224.416,326.176z"
        />
        <path
          style={{ fill: "#FFFFFF" }}
          d="M298.288,311.472H275.92c-11.136,0-11.136-16.368,0-16.368h60.496c11.392,0,11.392,16.368,0,16.368
                    h-21.232v64.592c0,11.12-16.896,11.392-16.896,0V311.472z"
        />
      </g>
      <path
        style={{ fill: "#CAD1D8" }}
        d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"
      />
    </svg>
  );
}

export function FileCard({ fileType, fileName, fileSize }: File) {

  const { selectedFile, setSelectedFile } = useFile()
 
  const handleClick = () => {
    if (selectedFile) {
      setSelectedFile(null)
    }
  }

  return (
    <>
      <div className="flex w-full h-[70px] rounded-[20px] bg-gray-100 p-4 transition-shadow relative">
        <button 
          className="absolute top-2 right-2 p-1
          text-gray-500 hover:text-white
          bg-gray-50 hover:bg-red-500
          active:scale-98 
          transform transition-all duration-100
          rounded-full
          border border-gray-200"
          aria-label="Remove file"

          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-4 w-full">
          <div className="w-[40px] h-[40px]">
            {fileType === "application/pdf" && <PDF />}
            {fileType === "application/msword" && <DOC />}
            {fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && <DOC />}
            {fileType === "text/plain" && <TXT />}
          </div>
          <div className="flex flex-col flex-grow">
            <span className="text-lg font-medium text-gray-800 truncate">
              {fileName}
            </span>
            <span className="text-sm text-gray-500">{fileSize}</span>
          </div>
        </div>
      </div>
    </>
  );
}
