import { create } from 'zustand';

interface NotificationState {
    message: string
    setMessage: (message: string) => void
    type: "success" | "error"
    setType: (type: "success" | "error") => void
    isVisible: boolean
    setIsVisible: (val: boolean) => void
}

const useNotification = create<NotificationState>((set) => ({
    message: "",
    setMessage: (message) => set({ message: message }),
    type: "success",
    setType: (type) => set({ type: type }),
    isVisible: false,
    setIsVisible: (val) => set({ isVisible: val }) 
}))

export default useNotification;