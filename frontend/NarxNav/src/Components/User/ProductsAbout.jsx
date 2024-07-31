// ProductsAbout.js
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { CartContext } from "../../CartContext";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Footer from "../Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTranslation } from "react-i18next";
import PriceChangeGraph from "./PriceChangeGraph";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const labels = {
  0.5: "",
  1: "",
  1.5: "",
  2: "",
  2.5: "",
  3: "",
  3.5: "",
  4: "",
  4.5: "",
  5: "",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function HoverRating({ value }) {
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        readOnly
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
    </motion.div>
  );
};

function ProductsAbout() {
  const { t, i18n } = useTranslation();
  const [book, setBook] = useState(null);
  const [products, setProduct] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleCartClick = (book) => {
    isBookInCart(book.id) ? removeFromCart(book) : addToCart(book);
    setSnackMessage(
      isBookInCart(book.id)
        ? t("savatchadan_ochirildi")
        : t("savatchaga_qoshildi")
    );
    setOpenSnack(true);
  };

  const handleFavoriteClick = (book) => {
    isBookFavorite(book.id)
      ? removeFromFavorites(book.id)
      : addToFavorites(book);
    setSnackMessage(
      isBookFavorite(book.id)
        ? t("sevimlilardan_ochirildi")
        : t("sevimlilarga_qoshildi")
    );
    setOpenSnack(true);
  };

  useEffect(() => {
    fetch(`http://185.105.89.222:8080/api/products/${id}`) // Ensure you fetch by ID
      .then((response) => response.json())
      .then((data) => {
        const lang = localStorage.getItem("i18nextLng");
        if (data) {
          const bookData = {
            ...data,
            book_name:
              lang === "uz"
                ? data.product_name
                : lang === "ru"
                ? data.product_name_ru
                : data.product_name_en,
            book_author:
              lang === "uz"
                ? data.product_company?.name
                : lang === "ru"
                ? data.product_company?.name_ru
                : data.product_company?.name_en,
          };
          
          fetch(`http://185.105.89.222:8080/api/products/?product_category=${data.product_category.name}`)
          .then((response) => response.json())
          .then((product) => {
            console.log(123, product);
            setProduct(product);
          })

          setBook(bookData);
        }
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        setLoading(false); // Ensure loading is set to false in case of an error
      });
  }, [id]);



  if (loading) {
    return (
      <div className="grid place-content-center justify-center bg-violet-600 px-4 py-24">
        <BarLoader />
      </div>
    );
  }

  const isBookInCart = (bookId) => {
    return cart.some((book) => book.id === bookId);
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  if (!book) {
    return <div>{t("Mahsulot topilmadi")}</div>; // Return early if no book found
  }

  return (
    <div>
      <div className="mx-4 md:mx-12 lg:mx-32 mt-4">
        <Navbar />
        <div className="flex flex-col items-center w-full mt-12 gap-4">
          <div className="flex flex-col md:flex-row border-4 shadow-2xl rounded-md drop-shadow-2xl w-auto h-full  py-8 px-10 m-4 gap-6">
            <img
              src={book.product_cover}
              className="w-[150px] md:max-w-56 h-[100px] object-cover rounded-md mb-4 md:mb-0"
            />
            <img
              src={book.product_cover}
              className="w-full md:max-w-96 h-[400px] object-cover rounded-md mb-4 md:mb-0"
            />
            <div className="flex flex-col justify-between w-full">
              <div>
                <div className="book-name text-xl md:text-2xl mb-2 text-black">
                  {book.book_name}
                </div>
                <div className="text-sky-400 text-sm mb-2 md:text-base">
                  {book.book_author}
                </div>
                <HoverRating value={book.product_rating} />
                <div className="flex justify-between ">
                  <p className="text-2xl font-bold mb-4 mt-[10px] text-green-600">
                    {book.product_price}UZS
                  </p>
                </div>
                <div className="flex  items-end text-sm mb-2 md:text-base mt-4 text-zinc-500">
                  <p>{t("Sotuvda mavjud")}:</p> <div />{" "}
                  <p className="ml-2 font-black	">{book.product_count}</p>{" "}
                </div>
                <div className="flex items-end text-sm md:text-base my-4 text-zinc-500">
                  <p>{t("")}Sotuvchi:</p>
                  <div className="flex ml-2" />{" "}
                  <p className="font-black capitalize">
                    {book.product_company?.name}
                  </p>
                </div>
                <PriceChangeGraph />
              </div>
              <div className="flex justify-between">
                {/* <button
                  onClick={() => addToCart(book)}
                  className="bg-green-500 hover:bg-green-700 w-auto text-md text-black rounded-md mt-4 p-2"
                >
                  <ShoppingCartIcon className="md:mr-2" />{" "}
                  {t("savatga_qoshish")}
                </button> */}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCartClick(book);
                  }}
                  className={`text-md rounded-md mt-4 p-2 ${
                    isBookInCart(book.id)
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-black"
                  }`}
                >
                  <ShoppingCartIcon className="md:mr-2" />
                  {isBookInCart(book.id)
                    ? t("savatdan_ochirish")
                    : t("savatga_qoshish")}
                </button>

                <Link to="/xarid" state={{ cart }}>
                  <button
                    onClick={() => addToCart(book)}
                    className="w-auto text-md text-green-500 border-2 border-green-500 hover:text-black hover:bg-green-500 rounded-md mt-4 p-2"
                  >
                    {t("tezkor_olish")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] ml-[5%] h-auto">
          <div className="w-full mt-2"></div>
        </div>

        <div className="flex-col">
          <div className="flex justify-start">
            <button className="bg-blue-700 hover:bg-blue-800 w-auto text-md text-white rounded-md mt-4 mb-2 p-2">
              {t("malumotlar")}
            </button>
            <button className="text-md bg-blue-700 text-white border-none border-blue-500 hover:bg-blue-800 rounded-md mt-4 ml-4 mb-2 p-2">
              {t("izohlar")}
            </button>
          </div>
          <div className="book-desc border-none rounded-md w-[100%] h-auto mt-2 mb-16 p-4 bg-neutral-200">
            <p>{book.product_description}</p>
          </div>

          {/* Updated Section */}
          {products.map((product, index) => (
          <div className="flex border rounded-md w-full h-auto mt-2 mb-16 p-4 bg-white shadow-md">
          <div className="flex flex-col items-center justify-center w-1/5 text-center">
            <p className="font-bold">{t("Eng Arzoni")}</p>
            <h4 className="text-xl font-bold">{product.product_price} UZS</h4>
            <div className="flex">
            <p className="text-green-500 font-bold">{product.product_company?.name}</p>
            </div>
            
          </div>
          <div className="flex flex-col items-center justify-center w-1/5 text-center">
            <Link
              to={`/productsabout/${product.id}`}
              key={index}
              onClick={() => window.location.replace(`/productsabout/${product.id}`)}
              className="text-blue-600 hover:underline"
            >
              <h1 className="text-lg font-semibold">{product.product_name}</h1>
            </Link>
          </div>
          <div className="flex items-center justify-center w-1/5 text-center">
            <p className="mr-2">{t("Sotuvda mavjud")}:</p>
            <p>{product.product_count}</p>
          </div>
          <div className="flex  items-center justify-center w-1/5 text-center">
            
            <p>{t("Kargo bepul")}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-1/5 text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCartClick(product);
              }}
              className={`text-md w-[245px] rounded-md my-2 p-2 ${
                isBookInCart(product.id)
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-black"
              }`}
            >
              <ShoppingCartIcon className="md:mr-2" />
              {isBookInCart(product.id)
                ? t("savatdan_ochirish")
                : t("savatga_qoshish")}
            </button>
            <button className="bg-green-500 hover:bg-green-700 w-full text-md text-black rounded-md p-2">
              <NotificationsActiveIcon className="md:mr-2" />{" "}
              {t("Sotuvchini kuzatib borish")}
            </button>
          </div>
        </div>

          ))}

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductsAbout;
