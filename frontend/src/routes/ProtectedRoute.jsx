import { Navigate } from 'react-router-dom'

// Redirects to /login if no JWT token is found in localStorage.
// Wrap any route that requires authentication with this component.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
