import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Changelog from './pages/Changelog'
import Contact from './pages/Contact'
import Analytics from './pages/Analytics'

export default function App() {
  return (
    <div className="app-shell">
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  )
}
