import { Routes, Route } from 'react-router-dom'
import Home        from '../pages/Home'
import Converter   from '../pages/Converter'
import Arithmetic  from '../pages/Arithmetic'
import Temperature from '../pages/Temperature'
import Volume      from '../pages/Volume'
import NotFound    from '../pages/NotFound'
import Login from "../pages/Login"
import OAuthSuccess from "../pages/OAuthSuccess"

// Central route registry — add new pages here
const AppRoutes = () => (
  <Routes>
    <Route path="/"            element={<Home />} />
    <Route path="/converter"   element={<Converter />} />
    <Route path="/arithmetic"  element={<Arithmetic />} />
    <Route path="/temperature" element={<Temperature />} />
    <Route path="/volume"      element={<Volume />} />
    <Route path="*"            element={<NotFound />} />
    <Route path="/login" element={<Login />} />
    <Route
  path="/oauth-success"
  element={<OAuthSuccess />}
/>
  </Routes>
)

export default AppRoutes
