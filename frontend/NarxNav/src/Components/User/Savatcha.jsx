import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { CartContext } from "../../CartContext";
import Navbar from "./Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";

function Savatcha() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteBooks");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const cartItemsCount = cart.length;

  const handleFavoriteClick = (book) => {
    setFavoriteBooks((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (favBook) => favBook.id === book.id
      );
      let updatedFavorites;

      if (isAlreadyFavorite) {
        updatedFavorites = prevFavorites.filter(
          (favBook) => favBook.id !== book.id
        );
      } else {
        updatedFavorites = [...prevFavorites, book];
      }

      localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isBookFavorite = (bookId) => {
    return favoriteBooks.some((book) => book.id === bookId);
  };

  const isBookInCart = (bookId) => {
    return cart.some((book) => book.id === bookId);
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const totalAmount = cart.reduce((sum, book) => sum + book.product_price, 0);

  const Counter = () => {
    const [count, setCount] = useState(1);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
      <div className="flex w-32 mt-4 items-center border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={decrement}
          className="w-8 h-8 flex justify-center items-center bg-white text-black text-md border-r border-gray-300"
        >
          -
        </button>
        <div className="w-12 h-8 flex justify-center items-center bg-white text-lg border-r border-gray-300">
          {count}
        </div>
        <button
          onClick={increment}
          className="w-8 h-8 flex justify-center items-center bg-white text-md text-black"
        >
          +
        </button>
      </div>
    );
  };

  return (
    <div>
      <Container className="min-h-[55vh] pb-24 flex flex-col justify-between">
        <Navbar cartItems={cartItemsCount} />
        <div className="mt-24 flex flex-col">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex-1 border-2 shadow-md rounded-md mb-4 p-4">
              {cart.length === 0 ? (
                <div className="text-center text-xl">{t("savat_bosh")} 😢</div>
              ) : (
                cart.map((book, index) => (
                  <div key={index} className="flex border-b-4 py-8">
                    <img
                      src={book.product_cover}
                      alt={`kitob-${index + 1}`}
                      className="w-1/4 h-auto object-cover rounded-md"
                    />
                    <div className="flex flex-col pl-4">
                      <div>
                        <div className="text-lg font-bold text-black">
                          {book.book_name}
                        </div>
                        <div className="text-slate-400">
                          {book.book_author.name}
                        </div>
                        <div className="text-slate-400 mt-4 uppercase">
                          Sotuvchi: {book.book_author}
                        </div>
                        <Counter />
                      </div>
                      <div className="flex justify-between mt-8 ">
                        <div className=" flex text-2xl mr-32 text-green-600">
                          {book.product_price} UZS
                        </div>
                        <div className="flex">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleFavoriteClick(book);
                            }}
                            className={`mr-4 text-2xl ${
                              isBookFavorite(book.id)
                                ? "text-rose-500"
                                : "text-slate-300"
                            }`}
                          >
                            <FavoriteIcon />
                          </button>

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              isBookInCart(book.id)
                                ? removeFromCart(book)
                                : addToCart(book);
                            }}
                            className={`w-full text-md item-center rounded-md p-2  ${
                              isBookInCart(book.id)
                                ? "bg-red-500 text-white"
                                : "bg-green-500 text-black"
                            }`}
                          >
                            {isBookInCart(book.id)
                              ? "O'chirish"
                              : "Savatga qo'shish"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="w-[40%]">
              <div className="border-2 rounded-md p-4 shadow-md">
                <h1 className="font-bold text-xl mb-2">{t("buyurtmalaringiz")}</h1>
                <div className="text-lg">
                  {cart.map((book, index) => (
                    <div key={index} className="flex justify-between mb-2">
                      <span>{book.book_name}</span>
                      <span>{book.product_price} UZS</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold mt-4">
                    <span>{t("jami")}</span>
                    <span>{totalAmount} UZS</span>
                  </div>
                </div>
                <Link to="/xarid" state={{ cart }}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full">
                    {t("Rasmiylashtirishga O'tish")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Savatcha;
