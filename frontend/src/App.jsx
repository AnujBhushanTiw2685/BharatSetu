import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import AddPage from "./pages/AddPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPage />} /> 
          
          {/* This ONE route handles "Hinduism" */}
          <Route path="/category/:slug" element={<Category />} />
          
          {/* This handles "Hinduism/Shaivism" - Note: We map it to the SAME component */}
          <Route path="/category/:parentSlug/:slug" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;