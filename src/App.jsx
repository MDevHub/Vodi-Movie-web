	import { Routes, Route, useLocation } from 'react-router-dom';
	import './index.css';
	import NavBar from './Components/Layout/NavBar';
	import Footer from './Components/Layout/Footer';
	import MinimalNav from './Components/Layout/MinimalNav';

	import Page1 from './Pages/Page1';
	import WatchPage from './Pages/WatchPage';
	import Blog from './Pages/Blog';
	import Login from './Pages/Login';
	import Register from './Pages/Register';
	import NotFound from './Pages/NotFound';

	function App() {
	const location = useLocation();
	const isAuthPage = ['/', '/login', '/register'].includes(location.pathname);

	return (
		<div className="flex flex-col min-h-screen bg-[#05030e]">
			{isAuthPage ? <MinimalNav /> : <NavBar />}

			<main className={`flex-grow ${isAuthPage ? '' : 'mt-[68px]'}`}>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Page1 />} />
				<Route path="/watch/:id" element={<WatchPage />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			</main>

			<Footer /> {/* Left untouched like you asked */}
		</div>
	);
	}

	export default App;
