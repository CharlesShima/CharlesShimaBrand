import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { About, Contribute, Home, NotFound, Perspectives, Speaking, Ventures } from './pages/Pages'
import Post from './pages/Post'
import WorkWithMe from './pages/WorkWithMe'

// The admin is loaded only when someone opens /admin, so visitors never download it.
const AdminApp = lazy(() => import('./admin/AdminApp'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  return (
    <>
      <ScrollToTop />
      {!isAdmin && (
        <a href="#main" className="skip-link">
          Skip to content
        </a>
      )}
      {!isAdmin && <Header />}
      <main id="main" className={isAdmin ? '' : 'site-main'}>
        <Suspense fallback={<div className="a-center">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/ventures" element={<Ventures />} />
            <Route path="/perspectives" element={<Perspectives />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="/work-with-me" element={<WorkWithMe />} />
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      <WhatsAppButton />
    </>
  )
}
