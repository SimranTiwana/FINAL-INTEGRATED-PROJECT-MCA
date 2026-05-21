import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Wraps every page with the Navbar at the top and Footer at the bottom
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-slate-50">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
)

export default MainLayout

