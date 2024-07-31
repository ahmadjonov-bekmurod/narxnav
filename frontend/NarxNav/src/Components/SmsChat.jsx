import React, { useState, useRef } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SmsIcon from "@mui/icons-material/Sms";
import "./SmsChat.css";
import "tailwindcss/tailwind.css";
import { useTranslation } from 'react-i18next';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function SmsChat() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const form = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const chatId = "-1002099921217";
    const botToken = "7400119660:AAFtjN6p6n1tMh4xXyl23OuqreAB5FzRsPY";
    const text = message;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          console.log("SUCCESS!");
          // Reset the form fields
          form.current.reset();
          setMessage("");
        } else {
          console.log("FAILED...", data);
        }
      })
      .catch((error) => {
        console.log("FAILED...", error);
      });

    console.log("Message sent:", message);
  };

  const { t, i18n } = useTranslation();
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        variant="contained"
        className="sms-icon-container flex items-center md:space-x-2 space-x-0"
      >
        <SmsIcon className="sms-icon" />
      </div>
      <Modal
        className="close-mod"
        open={open}
        onClose={handleClose}
        aria-labelledby="sms-modal-title"
        aria-describedby="sms-modal-description"
      >
        <Box sx={style}>
          <div className="sms-in-card flex mb-4 justify-between items-center">
            <Typography variant="h6" component="h2">
            {t("sms_chat")}
            </Typography>
            <Button onClick={handleClose}>
              <CloseIcon className="close-icon cursor-pointer" />
            </Button>
          </div>
          <form  className="sms-in-card flex flex-col" onSubmit={handleSendMessage} ref={form}>
            <Typography variant="body1" gutterBottom>
              {t("xush_kelibsiz")}
               <br />
            </Typography>
            <TextField
              className="bg-slate-100"
              // label="Sizga qanday yordam bera olaman?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              fullWidth
              className="mt-4"
            >
              {t("yuborish_sms")}
              
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default SmsChat;
