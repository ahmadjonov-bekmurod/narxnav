import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../CartContext";
import "../../index.css";

const Companies = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [visibleBooksCount, setVisibleBooksCount] = useState(12);
  const [showScrollLeft, setShowScrollLeft] = useState(false);

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

  useEffect(() => {
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

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    }, 2000); // Adjust the interval time as needed

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
      <div className="">
        <div>
          <div className="relative flex items-center">
            {showScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 ml-4 p-2 bg-gray-300 rounded-full z-10"
              >
                &larr;
              </button>
            )}
            <div
              className="market-reklama flex overflow-hidden"
              ref={carouselRef}
            >
              {books.slice(0, visibleBooksCount).map((book, index) => (
                <div key={index} className="my-2 bg-center">
                  <Link to={`/companyabout/${book.name}`} key={book.id}>
                    <img
                      className="bg-center rounded-full m-4 w-24 h-24"
                      src={book.company_photo}
                      alt={book.name}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
