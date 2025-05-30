import { JobCard } from "./JobCard"
import useJob from "../store/jobStore"
import ButtonSpinner from "./buttonSpinner"

export function JobsContainer () {
  const { isLoading, jobs } = useJob();

  const hasJobs = Array.isArray(jobs) && jobs.length > 0;
  
  return (
    <div className="flex w-full h-auto justify-center">
      {isLoading ? (
        <div className="mt-10">
          <ButtonSpinner color="#0000FF" size={30} />
        </div>
      ) : hasJobs ? (
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          {jobs.map((job) => (
            <JobCard 
              key={`${job.job_title}-${job.company_name}-${job.job_location}`}
              jobTitle={job.job_title} 
              jobDescription={job.job_description} 
              jobLocation={job.job_location} 
              applyLink={job.apply_link}
              companyName={job.company_name}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500 text-lg font-medium">No jobs found</p>
        </div>
      )}
    </div>
  );
}