import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './lib/store';
import { AnnouncementBar, CartDrawer, Header } from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductPage from './pages/Product';
import Cart from './pages/Cart';
import Story from './pages/Story';
import Journal from './pages/Journal';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [pathname, search]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <AnnouncementBar />
      <Header overHero={isHome} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/footwear" element={<Collection />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/our-story" element={<Story />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Shell />
      </CartProvider>
    </BrowserRouter>
  );
}
