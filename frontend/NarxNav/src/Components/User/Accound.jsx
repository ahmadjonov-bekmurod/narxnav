import React, { useContext, useState, useEffect } from "react";
import { Container } from "@mui/system";
import Navbar from "./Navbar";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";
import photo from "../../assets/muallif.png";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import UserContext from "../User/UserContext";
import Cookies from "js-cookie";
import ip from "../Config"

function Account() {
  const { t, i18n } = useTranslation();
  const { user, updateUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(true);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [profile, setProfile] = useState(user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://${ip}/api/orders/`)
      .then((response) => response.json())
      .then((data) => {
        const lang = localStorage.getItem("i18nextLng");
        console.log(data);
        const getLangField = (item, field) => {
          switch (lang) {
            case "uz":
              return item[field];
            case "ru":
              return item[field + "_ru"];
            case "en":
              return item[field + "_en"];
            default:
              return item[field];
          }
        };

        const formattedOrders = data.map((order) => ({
          ...order,
          items: order.items.map((item) => ({
            ...item,
            product: {
              ...item.product,
              book_name: getLangField(item.product, "product_name"),
              book_author: {
                ...item.product.product_company,
                name: getLangField(item.product.product_company, "name"),
              },
            },
          })),
        }));

        setOrders(formattedOrders);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [i18n.language]);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      navigate("/404");
    } else {
      setUser(JSON.parse(userCookie));
    }
  }, [navigate, setUser]);

  const handleLogout = () => {
    setUser({ name: "", surname: "", phoneNumber: "" });
    Cookies.remove("user");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    updateUser(profile);
    Cookies.set("user", JSON.stringify(profile), { expires: 7 });
    setIsModalOpen(true);
  };

  return (
    <div>
      <Container className="min-h-[55vh] pb-24 flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col md:flex-row">
          <div className="p-4 w-auto">
            <div className="accound-box w-[300px] bg-gray-200 p-4 rounded-lg">
              <div className="flex items-center">
                <img className="w-24 h-24 ml-4 mt-4" src={photo} alt="logo" />
                <div className="ml-4">
                  <h2 className="text-lg font-bold">{user.name}</h2>
                  <h2 className="text-sm font-bold">{user.surname}</h2>
                </div>
              </div>
              <ul className="mt-4">
  <li
    className="py-2 cursor-pointer"
    onClick={() => {
      setShowProfileSettings(false);  // Close profile settings if open
      setShowOrders(!showOrders);     // Toggle orders section
    }}
  >
    <ShoppingCartIcon />
    {t("buyurtmalarim")}
  </li>
  <li
    className="py-2 cursor-pointer"
    onClick={() => {
      setShowOrders(false);           // Close orders if open
      setShowProfileSettings(!showProfileSettings); // Toggle profile settings section
    }}
  >
    <SettingsIcon /> {t("sozlamalar")}
  </li>
  <li
    className="py-2 cursor-pointer text-red-600"
    onClick={handleLogout}
  >
    <LogoutIcon /> {t("logout")}
  </li>
</ul>

            </div>
          </div>
          <div className="p-4 w-full md:w-3/4">
            {showOrders && (
              <div>
                <h2 className="text-xl font-bold mb-4">{t("buyurtmalarim")}</h2>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="accound-box bg-gray-200 p-4 mb-4 border rounded-lg"
                    >
                      <div className="flex justify-between">
                        <p>
                          {t("buyurtma")} № {order.id}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-green-600">{order.status}</p>
                      </div>
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex border rounded-xl items-center text-center font-bold p-4 bg-slate-300 justify-between mt-2"
                        >
                          <img
                            src={item.product.product_cover}
                            alt={item.product.book_name}
                            className="w-12 h-16 mr-2"
                          />
                          <div className="flex ">
                            <p>{item.product.book_name}</p>
                          </div>

                          <div className="flex ">
                            <p>{item.product.book_author.name}</p>
                          </div>

                          <div className="flex ">
                            <p>
                              {item.quantity} x {item.total_price} UZS
                            </p>
                          </div>
                        </div>
                      ))}
                     
                      <h2 className="flex justify-end mt-4 p-4  font-bold text-xl ">
                        {t("umumiy_summa")}: {order.total_price} UZS
                      </h2>
                    </div>
                  ))
                ) : (
                  <p>{t("buyurtmalar_yoq")}</p>
                )}
              </div>
            )}
            {showProfileSettings && (
              <div>
                <h2 className="text-xl font-bold mb-4">{t("sozlamalar")}</h2>
                <div className="accound-box mb-4">
                  <TextField
                    fullWidth
                    label={t("ism")}
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </div>
                <div className="accound-box mb-4">
                  <TextField
                    fullWidth
                    label={t("familya")}
                    name="surname"
                    value={profile.surname}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </div>
                <div className="accound-box mb-4">
                  <TextField
                    fullWidth
                    label={t("traqam")}
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleProfileChange}
                    variant="outlined"
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveProfile}
                >
                  {t("saqlash")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Account;
