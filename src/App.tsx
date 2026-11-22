
import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Finds from './pages/Finds'
import Categories from './pages/Categories'
import CategoryPage from './pages/Category'
import NewArrivals from './pages/NewArrivals'
import ProductPage from './pages/Product'
import Coupons from './pages/Coupons'
import Guides from './pages/Guides'
import Contact from './pages/Contact'
import { Login, Signup } from './pages/Auth'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

function Layout() {
  return (
    <div className="grain flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1 pt-[var(--header-h)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="finds" element={<Finds />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/:id" element={<CategoryPage />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="guides" element={<Guides />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

