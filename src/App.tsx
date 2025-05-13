import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/signup"
import LogIn from "./pages/login"
import ProtectedRoute from "./components/custom/protection"
import Dashboard from "./pages/dashboard"
import { Toaster } from "sonner"
import Profile from "./pages/profile"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
