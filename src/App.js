import './App.css';
import {BrowserRouter, Route, Routes, NavLink} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ProductList from "./component/ProductList";
import ProductCreate from "./component/ProductCreate";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<ProductCreate/>}/>
          <Route path="/product" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
