import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Signup from './pages/signup';
import Profile from './pages/profile';
import Login from './pages/login';
import Home from './pages/home';
import CreateLising from './pages/CreateLising';
import Navigation from './component/navigation';
import './App.css';
import ProtectedRoute from './component/protectedRoute';
import EditListing from './pages/editListing';
import ViewListing from './pages/viewlisting';
import MyListing from './pages/MyListing';
import SearchBuy from './pages/SearchBuy';
import SearchRent from './pages/SearchRent';
import About from './pages/about';
import SellYourHomePage from './pages/sell';
import Footer from './component/footer';
import AffordabilityCalculator from './pages/AfordablityCalcualtor';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/sell' element={<SellYourHomePage />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/afordablityCalculator' element={<AffordabilityCalculator />}></Route>
        <Route path='/editListing/:id' element={<EditListing />}></Route>
        <Route path='/viewListing/:id' element={<ViewListing />}></Route>

        <Route path='/search' element={<Search />}></Route>
        <Route path='/buy' element={<SearchBuy />}></Route>
        <Route path='/rent' element={<SearchRent />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/createListing' element={<CreateLising />}></Route>
          <Route path='/mylisting' element={<MyListing />}></Route>
        </Route>
      </Routes>
      <FooterConditional />
    </BrowserRouter>
  );
}

function FooterConditional() {
  const location = useLocation();

  // Render Footer only if the current path is not '/search'
  if (location.pathname === '/search' || (location.pathname === '/buy') || (location.pathname === '/rent')) {
    return null;
  }

  return <Footer />;
}

export default App;
