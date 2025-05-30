import { create } from 'zustand';

interface Job {
    company_name: string
    job_title: string
    job_location: string
    job_description: string
    apply_link: string
    source: string
}

interface JobState {
    jobs: Job[] | []
    setJobs: (jobs: Job[] | []) => void
    isLoading: boolean
    setIsLoading: (val: boolean) => void
    showRecommendedJobs: boolean,
    setShowRecommendedJobs: (val: boolean) => void
}

const useJob = create<JobState>((set) => ({
    jobs: [],
    setJobs: (jobs) => {
        set({jobs: jobs })
    },
    isLoading: false,
    setIsLoading: (val) => set({ isLoading: val }),
    showRecommendedJobs: false,
    setShowRecommendedJobs: (val) => set({ showRecommendedJobs: val }),
}))

export default useJob;