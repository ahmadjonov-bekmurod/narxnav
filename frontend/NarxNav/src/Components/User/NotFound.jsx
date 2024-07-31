import React from "react";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../Footer";
import notFoundImage from "../../assets/404.png"; // Adjust the path as necessary
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
        {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-center text-center">
        <img src={notFoundImage} alt="404 Not fFound" className="w-[50%] h-[50%" />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
        >
         Bosh sahifaga qaytish
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
