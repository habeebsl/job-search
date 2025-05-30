import './App.css'
import { UploadPage } from './pages/UploadPage'
import { JobsPage } from './pages/JobsPage'
import Notification from './components/Notification'
import useNotification from './store/notiStore'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const { message, type, isVisible, setIsVisible } = useNotification()

  return (
    <>
      <Notification
        message={message}
        type={type}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
      <Router>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
