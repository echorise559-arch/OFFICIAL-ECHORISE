import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SpotifyPage from './pages/SpotifyPage'
import SoundCloudPage from './pages/SoundCloudPage'
import ChartPage from './pages/ChartPage'
import DancePage from './pages/DancePage'
import ContactPage from './pages/ContactPage'
import OrderPage from './pages/OrderPage'
import SuccessPage from './pages/SuccessPage'
import NotFound from './pages/NotFound'
import YouTubePage from './pages/YouTubePage'
import AppleMusicPage from './pages/AppleMusicPage'
import AIChatbot from './components/AIChatbot'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }) {
  return (
    <div className="noise min-h-screen flex flex-col bg-bg">
      <Navbar />
      <main className="flex-1 page-enter">{children}</main>
      <Footer />
      <AIChatbot />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/spotify" element={<Layout><SpotifyPage /></Layout>} />
        <Route path="/soundcloud" element={<Layout><SoundCloudPage /></Layout>} />
        <Route path="/chart" element={<Layout><ChartPage /></Layout>} />
        <Route path="/dance" element={<Layout><DancePage /></Layout>} />
        <Route path="/youtube" element={<Layout><YouTubePage /></Layout>} />
        <Route path="/apple-music" element={<Layout><AppleMusicPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/order" element={<Layout><OrderPage /></Layout>} />
        <Route path="/success" element={<Layout><SuccessPage /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
