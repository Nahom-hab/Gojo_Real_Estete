import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Signup from './pages/auth/signup';
import Profile from './pages/profile';
import Login from './pages/auth/login';
import Home from './pages/home';
import Navigation from './component/navigation';
import './App.css';
import ProtectedRoute from './component/protectedRoute';
import EditListing from './pages/MyListing/EditListing';
import ViewListing from './pages/viewlisting';
import MyListing from './pages/MyListing/MyListing';
import SearchBuy from './pages/SearchBuy';
import SearchRent from './pages/SearchRent';
import About from './pages/about';
import SellYourHomePage from './pages/sell/sell';
import Footer from './component/footer';
import AffordabilityCalculator from './pages/AfordablityCalcualtor';
import Search from './pages/Search';
import ListingPage from './pages/sell/AdressPage';
import ConfirmationPage from './pages/sell/CorrectAdressPage';
import LIstingInputs from './pages/sell/LIstingInputs';
import SuccessListingUpload from './pages/sell/succsesLIstingUpload';
import ShowListing from './pages/showListing';
import Otpcheck from './pages/auth/otpcheck';
import SignInSuccsus from './pages/auth/signInSuccsus';
import Favorite from './pages/Favorite';
import ContactUs from './pages/constactUs';
import AccountPrompt from './pages/sell/AccountPrompt';
import ListingWithPrice from './pages/ListingWithPrice';

function App() {
  return (
    <BrowserRouter>
      <HeaderConditional />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/afordablityCalculator' element={<AffordabilityCalculator />}></Route>
        <Route path='/editListing/:id' element={<EditListing />}></Route>
        <Route path='/viewListing/:id' element={<ViewListing />}></Route>


        <Route path='/editListing/:id' element={<EditListing />}></Route>


        //auth
        <Route path='/otpcheck' element={<Otpcheck />}></Route>
        <Route path='/signUpSuccess' element={<SignInSuccsus />}></Route>




        //sell
        <Route path='/sell' element={<SellYourHomePage />}></Route>
        <Route path='/addadress' element={<ListingPage />}></Route>
        <Route path='/ConfirmationPage' element={<ConfirmationPage />}></Route>
        <Route path='/listingInputs' element={<LIstingInputs />}></Route>
        <Route path='/listingSuccuss' element={<SuccessListingUpload />}></Route>
        <Route path='/signupSell' element={<AccountPrompt />}></Route>


        <Route path='/ListingswithPrice' element={<ListingWithPrice />}></Route>




        <Route path='/Listings' element={<ShowListing />}></Route>
        <Route path='/favorite' element={<Favorite />}></Route>
        <Route path='/contactUs' element={<ContactUs />}></Route>





        //search
        <Route path='/search' element={<Search />}></Route>
        <Route path='/buy' element={<SearchBuy />}></Route>
        <Route path='/rent' element={<SearchRent />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />}></Route>
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
  if (location.pathname === '/signUpSuccess' || location.pathname === '/otpcheck' || location.pathname === '/search' || (location.pathname === '/buy') || (location.pathname === '/rent') || (location.pathname === '/login') || (location.pathname === '/signup')) {
    return null;
  }


  return <Footer />;
}


function HeaderConditional() {
  const location = useLocation();

  // Render Footer only if the current path is not '/search'
  if (location.pathname === '/signUpSuccess' || location.pathname === '/otpcheck' || (location.pathname === '/login') || (location.pathname === '/signup')) {
    return null;
  }


  return <Navigation />;
}

export default App;
