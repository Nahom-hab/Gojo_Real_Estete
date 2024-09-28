import React from 'react';
import { BrowserRouter, Routes, matchPath, Route, useLocation } from 'react-router-dom';
import Signup from './pages/auth/signup';
import Profile from './pages/profile'
import Login from './pages/auth/login';
import Home from './pages/home';
import Navigation from './component/navigation';
import './App.css';
import ProtectedRoute from './component/protectedRoute';
import EditListing from './pages/MyListing/EditListing';
import ViewListing from './pages/viewlisting';
import MyListing from './pages/MyListing/MyListing';
import SearchBuy from './pages/search/SearchBuy';
import SearchRent from './pages/search/SearchRent';
import About from './pages/about';
import SellYourHomePage from './pages/sell/sell';
import Footer from './component/footer';
import AffordabilityCalculator from './pages/AfordablityCalcualtor';
import Search from './pages/search/Search';
import ListingPage from './pages/sell/AdressPage';
import ConfirmationPage from './pages/sell/CorrectAdressPage';
import LIstingInputs from './pages/sell/LIstingInputs';
import SuccessListingUpload from './pages/sell/succsesLIstingUpload';
import ShowListing from './pages/showListing';
import Otpcheck from './pages/auth/otpcheck';
import SignInSuccsus from './pages/auth/signInSuccsus';
import Favorite from './pages/MyListing/Favorite';
import ContactUs from './pages/constactUs';
import AccountPrompt from './pages/sell/AccountPrompt';
import ListingWithPrice from './pages/ListingWithPrice';
import ProductList from './pages/admin/AllListings';
import AdminNavigation from './pages/admin/adminNavigation';
import InactiveListings from './pages/admin/inactiveListings';
import ActiveListings from './pages/admin/ActivatedListing';
import Dashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/admin/users';
import AdminLogin from './pages/admin/AdminLogin';
import ViewAdminListing from './pages/admin/view';
import UserListings from './pages/admin/UserListings';
import EditListingAdmin from './pages/admin/editListingAdmin';
import ThemeToggle from './component/toggle';

function App() {
  return (
    <BrowserRouter >
      <HeaderConditional />
      <ThemeToggle />
      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/afordablityCalculator' element={<AffordabilityCalculator />}></Route>
        <Route path='/editListing/:id' element={<EditListing />}></Route>
        <Route path='/viewListing/:id' element={<ViewListing />}></Route>


        {/* //auth */}
        <Route path='/otpcheck' element={<Otpcheck />}></Route>
        <Route path='/signUpSuccess' element={<SignInSuccsus />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>




        {/* //sell */}
        <Route path='/sell' element={<SellYourHomePage />}></Route>
        <Route path='/addadress' element={<ListingPage />}></Route>
        <Route path='/ConfirmationPage' element={<ConfirmationPage />}></Route>
        <Route path='/listingInputs' element={<LIstingInputs />}></Route>
        <Route path='/listingSuccuss' element={<SuccessListingUpload />}></Route>
        <Route path='/signupSell' element={<AccountPrompt />}></Route>




        {/* admin */}
        <Route path='/admin/allListings' element={<ProductList />}></Route>
        <Route path='/admin/inactive' element={<InactiveListings />}></Route>
        <Route path='/admin/active' element={<ActiveListings />}></Route>
        <Route path='/admin/dashboard' element={<Dashboard />}></Route>
        <Route path='/admin/users' element={<UserDashboard />}></Route>
        <Route path='/admin/login/secret' element={<AdminLogin />}></Route>
        <Route path='/admin/ViewListing/:id' element={<ViewAdminListing />}></Route>
        <Route path='/admin/editListing/:id' element={<EditListingAdmin />}></Route>







        <Route path="/user/:id" element={<UserListings />} />
        <Route path='/Listings' element={<ShowListing />}></Route>
        <Route path='/favorite' element={<Favorite />}></Route>
        <Route path='/contactUs' element={<ContactUs />}></Route>
        <Route path='/ListingswithPrice' element={<ListingWithPrice />}></Route>


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
  if (
    location.pathname === '/signUpSuccess' ||
    location.pathname === '/admin/login/secret' ||
    location.pathname === '/otpcheck' ||
    location.pathname === '/login' ||
    location.pathname === '/signup'
  ) {
    return null;
  }

  // Check if the current path matches the dynamic admin ViewListing route
  const isAdminViewListing = matchPath('/admin/ViewListing/:id', location.pathname);

  if (
    location.pathname === '/admin/active' ||
    isAdminViewListing || // Use the matchPath result here
    location.pathname === '/admin/inactive' ||
    location.pathname === '/admin/dashboard' ||
    location.pathname === '/admin/allListings' ||
    location.pathname === '/admin/users'
  ) {
    return <AdminNavigation />;
  }

  return <Navigation />;
}

export default App;
