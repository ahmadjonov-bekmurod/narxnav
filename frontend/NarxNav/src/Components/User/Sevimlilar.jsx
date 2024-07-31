import { Container } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { CartContext } from "../../CartContext";
import Navbar from "./Navbar";
import Footer from "../Footer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";


function Sevimlilar() {
  const { cart, addToCart, removeFromCart, favoriteBooks, removeFromFavorites } = useContext(CartContext);
  const favoriteItemsCount = favoriteBooks.length;

  const isBookInCart = (bookId) => {
    return cart.some(book => book.id === bookId);
  };

  const handleFavoriteClick = (bookId) => {
    removeFromFavorites(bookId);
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <Container className="min-h-[55vh] flex flex-col justify-between">
        <Navbar favoriteItems={favoriteItemsCount} />
        <div className="mt-24 flex-grow">
          <div className="flex flex-wrap justify-center mt-12 gap-4">
            {favoriteBooks.length === 0 ? (
              <div className="text-center text-xl">{t("sevimli_bosh")} 😢</div>
            ) : (
              favoriteBooks.map((book, index) => (
                <Link
                  to={`/productsabout/${book.id}`}
                  key={index}
                  className="flex flex-col justify-between"
                >
                <div
                  key={index}
                  className="border-2 shadow-2xl rounded-md drop-shadow-2xl w-full sm:w-56 m-4 p-4"
                >
                  <img
                    src={book.product_cover}
                    alt={`kitob-${index + 1}`}
                    className="w-full h-[200px] object-cover rounded-md mb-4"
                  />
                  <div className="book-name text-md text-black">{book.book_name}</div>
                  <div className="text-slate-400">{book.book_author.name}</div>
                  <div className="text-2xl text-green-600">{book.product_price} UZS</div>
                  <div className="flex justify-between">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        isBookInCart(book.id) ? removeFromCart(book) : addToCart(book);
                      }}
                      className={`w-[90%] text-md rounded-md mt-4 p-2 ${
                        isBookInCart(book.id) ? 'bg-red-500 text-white' : 'bg-green-500 text-black'
                      }`}
                    >
                      {isBookInCart(book.id) ? "O'chirish" : "Savatga qo'shish"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavoriteClick(book.id);
                      }}
                      className="mt-4 ml-2 text-2xl border-none rounded-full p-2 transition-all duration-300"
                    >
                      <FavoriteIcon
                        className={`transition-all duration-300 ${
                          favoriteBooks.some(favBook => favBook.id === book.id) ? "text-rose-500" : "text-slate-300"
                        }`}
                      />
                    </button>
                  </div>
                </div>
            </Link>
              ))
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Sevimlilar;
