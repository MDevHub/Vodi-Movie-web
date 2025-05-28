import { Routes, Route } from 'react-router-dom';
import './index.css'; 
import NavBar from './Components/Layout/NavBar';
import Footer from './Components/Layout/Footer';
import Page1 from './Pages/Page1';
import WatchPage from './Pages/WatchPage';
import Blog from './Pages/Blog';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#05030e]">
      <NavBar />

      <main className="flex-grow mt-[68px]"> {/* Add top margin to offset fixed navbar */}
			<Routes>
				<Route path="/" element={<Login />} />        {/* Login landing page */}
				<Route path="/home" element={<Page1 />} />    {/* Page1 as post-login home */}
				<Route path="/watch/:id" element={<WatchPage />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
