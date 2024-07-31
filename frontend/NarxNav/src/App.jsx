import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import Savatcha from "./Components/User/Savatcha";
import Sevimlilar from "./Components/User/Sevimlilar";
import ProductsAbout from "./Components/User/ProductsAbout";
import Xarid from "./Components/User/Xarid";
import Bolalar from "./Components/User/Bolalar";
import { CartProvider } from "./CartContext";
import { UserProvider } from "./Components/User/UserContext";
import Chegirmalar from "./Components/User/Chegirmalar";
import { FavoriteProvider } from "./FavoriteContext";
import AdminPanel from "./Components/Admin/AdminPanel";
import Accound from "./Components/User/Accound";
import NotFound from "./Components/User/NotFound";
import LeftFilter from "./Components/User/LeftFilter";
import CompanyAbout from "./Components/User/CompanyAbout";
import Companies from "./Components/User/Companies";
import Texnikalar from "./Components/User/Texnikalar";
import CenterMenu from "./Components/User/CenterMenu";
import PriceChangeGraph from "./Components/User/PriceChangeGraph";


export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <FavoriteProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/xarid" element={<Xarid />} />
              <Route path="/savatcha" element={<Savatcha />} />
              <Route path="/sevimlilar" element={<Sevimlilar />} />
              <Route path="/Bolalar" element={<Bolalar />} />
              <Route path="/productsabout/:id" element={<ProductsAbout />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/pricechangegraph" element={<PriceChangeGraph />} />
              <Route path="/companyabout/:categoryName" element={<CompanyAbout />} />
              {/* <Route path="/company/:companyId" component={<CompanyAbout />} /> */}
              <Route path="/texnikalar" element={<Texnikalar />} />
              <Route path="/chegirmalar" element={<Chegirmalar />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/accound" element={<Accound />} />
              <Route path="/centermenu" element={<CenterMenu />} />
              <Route path="/leftfilter/:categoryName" element={<LeftFilter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </FavoriteProvider>
      </CartProvider>
    </UserProvider>
  );
}
