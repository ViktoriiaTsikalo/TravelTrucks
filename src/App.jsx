import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CamperDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
