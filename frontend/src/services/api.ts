import axios from "axios"

const VITE_API_BASE = import.meta.env.VITE_API_BASE

const apiClient = axios.create({
	baseURL: `${VITE_API_BASE}/api`,
	headers: {
		'Content-Type': 'application/json'
	}
})

interface ResumeText {
    text: string
}

export const apiService = {
    async uploadResume (formData: FormData) {
        return await apiClient.post("/users/resume/upload/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    },

    async getUserJobs (text: ResumeText) {
        return await apiClient.post("/jobs/user-jobs/", text)
    },

    async getJobs (keyword: string, location: string) {
        return await apiClient.get("/jobs", {
            params: {
                keyword: keyword,
                location: location
            }
        })
    }
}