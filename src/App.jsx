import { Routes, Route } from 'react-router-dom';
import './index.css'; 
import NavBar from './Components/Layout/NavBar';
import Footer from './Components/Layout/Footer';
import Page1 from './Pages/Page1';
function App() {
  return (
		<div className="flex flex-col min-h-screen bg-[#05030e]">
			<NavBar />

				<main className="flex-grow mt-[68px]"> {/* Add top margin to offset fixed navbar */}
					<Routes>
						<Route path="/" element={<Page1 />} />
					</Routes>
				</main>

			<Footer />
		</div>
  );
}

export default App;
