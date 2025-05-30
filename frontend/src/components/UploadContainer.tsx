import { useState } from "react";
import DragAndDrop from "./DragandDrop";
import { FileCard } from "./FileCard";
import useFile from "../store/fileStore";
import ButtonSpinner from "./buttonSpinner";
import { apiService } from "../services/api";
import IntermediateUI from "./IntermediateUI";
import useJob from "../store/jobStore";
import { useNavigate } from "react-router-dom";
import useNotification from "../store/notiStore";

export function UploadContainer() {
  const { setIsVisible, setMessage, setType } = useNotification()
  const { selectedFile } = useFile();
  const { setJobs, setShowRecommendedJobs } = useJob()
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const loadingTexts = [
    "Fetching job listings...",
    "Analyzing your preferences...",
    "Matching you with top companies...",
    "Almost there! Preparing results...",
  ]
  
  const navigate = useNavigate();

  const handleNextClick = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    let resumeData;

    try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await apiService.uploadResume(formData);
        resumeData = response.data;
        console.log(resumeData);
    } catch (error) {
        console.error("Error uploading resume:", error);
        setMessage("Error uploading resume, please try again")
        setType("error")
        setIsVisible(true)
        return
    } finally {
      setIsLoading(false);
    }

    try {
      setShowLoader(true)
      const jobsResponse = await apiService.getUserJobs(resumeData)
      const jobData = jobsResponse.data
      console.log(jobData)
      setJobs(jobData)
      setShowLoader(false)
      setShowRecommendedJobs(true)
      setMessage("Hurray.. You're officially amazing")
      setType("success")
      setIsVisible(true)
      navigate("/jobs");
    } catch (error) {
      console.error("Error getting jobs:", error);
      setShowLoader(false)
      setMessage("Sorry.. We couldn't get your jobs")
      setType("error")
      setIsVisible(true)
    }
};

  if (showLoader) {
    return (
      <IntermediateUI loadingTexts={loadingTexts} />
    )
  }

  return (
    <>
      <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
        <div className="bg-white w-170 h-140 shadow-sm rounded-[20px]">
          <div className="flex gap-4 items-center p-10 h-20 w-full border-b-1 border-gray-300">
            <div className="p-2 border-gray-200 border-2 rounded-full">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Upload Resume</span>
              <span className="text-sm text-gray-400">
                First step to building your profile
              </span>
            </div>
          </div>
          <div className="h-[70%] w-full flex p-10 justify-between items-center flex-col">
            <DragAndDrop />
            {selectedFile && (
              <FileCard
                fileName={selectedFile.name}
                fileType={selectedFile.type}
                fileSize={`${(selectedFile.size / 1024).toFixed(2)}KB`}
              />
            )}
          </div>
          <div className="px-10 pb-5 flex w-full justify-end items-center">
            <button
              disabled={!selectedFile || isLoading}
              onClick={handleNextClick}
              className={`flex items-center gap-2 justify-center text-white ${
                !selectedFile || isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } px-6 py-3 rounded-[6px] font-semibold transition-all duration-200 ease-in-out transform hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 min-w-[160px]`}
            >
              {isLoading ? (
                <>
                  <ButtonSpinner size={20} color="#fff" />
                  <span>Matching...</span>
                </>
              ) : (
                <span>Start Matching</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
