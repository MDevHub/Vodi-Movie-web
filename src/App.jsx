import { Routes, Route } from 'react-router-dom';
import './index.css'; 
import NavBar from './Components/Layout/NavBar';
import Footer from './Components/Layout/Footer';
import Home from './Components/Home Page/Home';

function App() {
  return (
		<div className="flex flex-col min-h-screen">
			<NavBar />

				<main className="flex-grow mt-[68px]"> {/* Add top margin to offset fixed navbar */}
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</main>

			<Footer />
		</div>
  );
}

export default App;
