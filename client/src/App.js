
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import PageNotFound from './pages/PageNotFound.js';
import Policy from './pages/Policy.js';
import Header from './components/Layout/Header.js';
import Footer from './components/Layout/Footer.js';
import Register from './pages/auth/Register.js';
import Login from './pages/auth/Login.js';
import Dashboard from './pages/user/Dashboard.js';
import PrivateRoute from './components/Routes/Private.js';
import Check from './components/Layout/Check.js';
import ForgotPassword from './pages/auth/ForgotPassword.js';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/check" element={<Check />} />

        <Route path="/dashboard" element={<PrivateRoute />}>

          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />



    </>
  );
}

export default App;
