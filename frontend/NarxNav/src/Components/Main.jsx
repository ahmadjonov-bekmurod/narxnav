import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SwipeCarousel from "./SwipeCarousel";
import NewCentury from "./User/NewCentury";
import Navbar from "./User/Navbar";
import Texnikalar from "./User/Texnikalar";
import CenterMenu from "./User/CenterMenu";
import Footer from "./Footer";
import LeftMenu from "./LeftMenu";
import SmsChat from "./SmsChat";
import Companies from "../Components/User/Companies";
import "./SmsChat.css";
import "tailwindcss/tailwind.css";
import { useTranslation } from "react-i18next";
import { CartContext } from "../CartContext";
import "../index.css";
import Chegirmalar from "./User/Chegirmalar";

const Main = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [visibleBooksCount, setVisibleBooksCount] = useState(5); // State for pagination

  const { cart, favoriteBooks } = useContext(CartContext);
  const cartItemsCount = cart.length;
  const favoriteItemsCount = favoriteBooks.length;

  const handleSearchIconClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleMenuIconClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleClickOutside = (e) => {
    if (e.target.closest(".search-container") === null) {
      setSearchOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpen = () => setOpenKirish(true);
  const handleClose = () => {
    setOpenKirish(false);
    setOpen(false);
  };

  const handleLeftMenuToggle = () => {
    setLeftMenuOpen(!leftMenuOpen);
  };

  const { t, i18n } = useTranslation();
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const carouselRef = useRef(null);

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetch(`http://185.105.89.222:8080/api/companies/`)
      .then((response) => response.json())
      .then((data) => {
        const lang = localStorage.getItem("i18nextLng");

        setBooks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className="min-h-[55vh] min-w-[100vh]  mx-auto px-4">
        <Navbar cartItems={cartItemsCount} favoriteItems={favoriteItemsCount} />
        <div>
          <Companies />
          {/* <div className="relative flex items-center">
            <div
              className="market-reklama flex overflow-hidden"
              ref={carouselRef}
            >
              {books.slice(0, visibleBooksCount).map((book, index) => (
                <div key={index} className="my-2 bg-center">
                  <Link to={`/companyabout/${book.id}`}
                    key={book.id}
                    target="_blank">
                    <img
                      className="bg-center rounded-full m-4 w-24 h-24"
                      src={book.company_photo}
                      alt={book.name}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-0 mr-4 p-2 bg-gray-300 rounded-full"
            >
              &rarr;
            </button>
          </div> */}

          <div className="flex">
            <div
              className={`w-1/5 ${
                leftMenuOpen ? "block" : "hidden"
              } md:block transition-all duration-300 ease-in-out`}
            >
              <LeftMenu />
            </div>
            <div className="w-4/5">
              <SwipeCarousel />
            </div>
          </div>
          <SmsChat />
        </div>

        <Chegirmalar />
        <CenterMenu />
        <Texnikalar />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
