import React, { useState } from "react"

interface Job {
    companyName: string
    jobTitle: string
    jobLocation: string
    jobDescription: string
    applyLink: string
}

export function JobCard({ companyName, jobLocation, jobDescription, jobTitle, applyLink }: Job) {
  const [expanded, setExpanded] = useState(false)

  const renderDescription = (desc: string) => 
    desc.split("\n").map((line, idx, arr) => (
      <React.Fragment key={idx}>
        {line}
        {idx < arr.length - 1 && <br />}
      </React.Fragment>
    ))


  const shortDescription = jobDescription.split("\n").slice(0, 3).join("\n")
  const isLong = jobDescription.split("\n").length > 3

  return (
    <div className="w-[65%] bg-white border border-gray-300 rounded-md p-10 shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{jobTitle}</h2>
          <p className="text-lg text-gray-600">{companyName}</p>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {jobLocation}
        </span>
      </div>
      <div className="text-gray-700 mt-2">
        {expanded ? renderDescription(jobDescription) : renderDescription(shortDescription)}
        {isLong && (
          <button
            className="text-blue-600 hover:underline ml-1 text-sm"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <a
          href={applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Apply
        </a>
      </div>
    </div>
  )
}