// import React, { useState, useContext, useEffect } from "react";
// import { Box, Button, Typography, Modal, TextField } from "@mui/material";
// import logoImg from "../assets/logo2.png";
// import PersonIcon from "@mui/icons-material/Person";
// import CloseIcon from "@mui/icons-material/Close";
// import "tailwindcss/tailwind.css";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../Components/User/UserContext";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%",
//   maxWidth: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   borderRadius: "10px",
//   boxShadow: 24,
//   p: 4,
// };

// const phoneNumberFormatter = (input) => {
//   let cleaned = input.replace(/\D/g, "");

//   if (cleaned.startsWith("998")) {
//     cleaned = cleaned.slice(3);
//   }

//   let formatted = "+998";

//   if (cleaned.length > 0) {
//     formatted += ` (${cleaned.substring(0, 2)}`;
//   }
//   if (cleaned.length >= 2) {
//     formatted += `) ${cleaned.substring(2, 5)}`;
//   }
//   if (cleaned.length >= 5) {
//     formatted += ` ${cleaned.substring(5, 7)}`;
//   }
//   if (cleaned.length >= 7) {
//     formatted += ` ${cleaned.substring(7, 9)}`;
//   }

//   return formatted;
// };

// function Profil() {
//   const { user, updateUser, logoutUser } = useContext(UserContext);
//   const [openKirish, setOpenKirish] = useState(false);
//   const [openParol, setOpenParol] = useState(false);
//   const [openRegister, setOpenRegister] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("+998");
//   const [parol, setParol] = useState(["", "", "", ""]);
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [open, setOpen] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user && user.phoneNumber) {
//       setOpenKirish(false);
//       setOpenRegister(false);
//       setOpenParol(false);
//     }
//   }, [user]);

//   const handlePhoneNumberChange = (event) => {
//     const input = event.target.value;
//     const formattedInput = phoneNumberFormatter(input);
//     setPhoneNumber(formattedInput);
//   };

//   const handleOpen = () => setOpenKirish(true);
//   const handleClose = () => {
//     setOpenKirish(false);
//     setOpenRegister(false);
//     setOpenParol(false);
//     setPhoneNumber("+998");
//     setName("");
//     setSurname("");
//     setParol(["", "", "", ""]);
//     setError("");
//   };

//   const handleKirishOpen = () => {
//     setOpenRegister(false);
//     setOpenKirish(true);
//     setOpenParol(false);
//   };

//   const handleRegisterOpen = () => {
//     setOpenKirish(false);
//     setOpenRegister(true);
//     setOpenParol(false);
//   };

//   const handleParolOpen = () => {
//     setOpenKirish(false);
//     setOpenRegister(false);
//     setOpenParol(true);
//   };

//   const handleKirish = async () => {
//     try {
//       const phoneNumberCleaned = cleanPhoneNumber(phoneNumber);
//       const formData = new URLSearchParams();
//       formData.append("user_phone_number", phoneNumberCleaned);

//       const response = await fetch("http://193.168.227.244/api/otp/create/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: formData.toString(),
//       });
//       if (response.ok) {
//         setOpenParol(true); // Open the parol modal on successful response
//       } else {
//         const data = await response.json();
//         setError("OTP creation failed: " + (data.message || "Unknown error"));
//       }
//     } catch (error) {
//       setError("Error during OTP creation: " + error.message);
//     }
//   };

//   const handleParol = async () => {
//     try {
//       const formData = new URLSearchParams();
//       formData.append("otp", parol.join(""));
//       formData.append("phone_number", cleanPhoneNumber(phoneNumber));

//       const response = await fetch("http://193.168.227.244/api/otp/verify/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: formData.toString(),
//       });

//       if (response.ok) {
//         updateUser({ phoneNumber: cleanPhoneNumber(phoneNumber) });
//         navigate("/accound"); // Redirect to "/" if OTP verification is successful
//       } else {
//         const data = await response.json();
//         setError("Siz xato kod kiritdingiz");
//       }
//     } catch (error) {
//       setError("Error during OTP verification: " + error.message);
//     }
//   };

//   function generatePassword() {
//     var length = 8,
//       charset =
//         "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//       retVal = "";
//     for (var i = 0, n = charset.length; i < length; ++i) {
//       retVal += charset.charAt(Math.floor(Math.random() * n));
//     }
//     return retVal;
//   }

//   function cleanPhoneNumber(phoneNumber) {
//     let cleaned = phoneNumber.replace(/[^\d]/g, "");
//     return cleaned;
//   }

//   const handleRegister = async () => {
//     try {
//       const phoneNumberCleaned = cleanPhoneNumber(phoneNumber);
//       const response = await fetch("http://193.168.227.244/api/signup/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           first_name: name,
//           last_name: surname,
//           phone_number: phoneNumberCleaned,
//           password: generatePassword(),
//         }),
//       });
//       if (response.ok) {
//         setOpenParol(true);
//       } else {
//         const data = await response.json();
//         console.log("Ro'yxatdan o'tish response:", data);
//         setError("OTP creation failed: " + (data.message || "Unknown error"));
//       }
//     } catch (error) {
//       setError("Error during OTP creation: " + error.message);
//     }
//   };

//   const handleLogout = () => {
//     navigate("/accound");
//   };

//   const { t, i18n } = useTranslation();

//   const changeLanguage = (event) => {
//     i18n.changeLanguage(event.target.value);
//   };

//   const handleChange = (element, index) => {
//     if (/^\d*$/.test(element.value)) {
//       let newParol = [...parol];
//       newParol[index] = element.value;
//       setParol(newParol);

//       // Move to the next input field if current one is filled
//       if (element.value !== "" && index < 3) {
//         document.getElementById(`otp-input-${index + 1}`).focus();
//       }
//     }
//   };

//   return (
//     <div>
//       {user.phoneNumber ? (
//         <Button onClick={handleLogout}>
//           <PersonIcon className="text-black" />
//         </Button>
//       ) : (
//         <Button onClick={handleOpen}>
//           <PersonIcon className="text-black" />
//         </Button>
//       )}
//       <Modal
//         open={openKirish}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <div className="flex justify-between items-center">
//             <img className="mr-4 w-10 h-10" src={logoImg} alt="logo" />
//             <CloseIcon className="cursor-pointer" onClick={handleClose} />
//           </div>

//           <div className="text-black text-2xl mt-4">{t("telefon")}</div>
//           <div className="text-black text-sm mt-2">{t("sms")}</div>
//           <div className="name font-bold pt-4 capitalize">{t("traqam")}</div>
//           <TextField
//             id="phone-number"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={phoneNumber}
//             onChange={handlePhoneNumberChange}
//             inputProps={{ maxLength: 19, autoComplete: "off" }}
//             required
//           />
//           <Button
//             className="w-full mt-2 mb-2"
//             variant="contained"
//             color="success"
//             onClick={handleKirish}
//             disabled={phoneNumber.length < 19} // Disable if phone number is not fully entered
//           >
//             {t("kirish")}
//           </Button>
//           <div className="text-black text-sm">
//             {t("royxat?")}
//             <span
//               className="text-blue-500 cursor-pointer"
//               onClick={handleRegisterOpen}
//             >
//               {" "}
//               {t("royxat")}
//             </span>
//           </div>
//         </Box>
//       </Modal>

//       <Modal
//         open={openRegister}
//         aria-labelledby="register-modal-title"
//         aria-describedby="register-modal-description"
//       >
//         <Box sx={style}>
//           <div className="flex justify-between items-center">
//             <img className="mr-4 w-10 h-10" src={logoImg} alt="logo" />
//             <CloseIcon className="cursor-pointer" onClick={handleClose} />
//           </div>
//           <div className="text-black text-3xl">{t("royxat")}</div>
//           <div className="name font-bold pt-4 capitalize">{t("ism")}</div>
//           <TextField
//             id="name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             inputProps={{ autoComplete: "off" }}
//             required
//           />
//           <div className="name font-bold pt-4 capitalize">{t("familya")}</div>
//           <TextField
//             id="surname"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={surname}
//             onChange={(e) => setSurname(e.target.value)}
//             inputProps={{ autoComplete: "off" }}
//             required
//           />
//           <div className="name font-bold pt-4 capitalize">{t("traqam")}</div>
//           <TextField
//             id="phone-number"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={phoneNumber}
//             onChange={handlePhoneNumberChange}
//             inputProps={{ maxLength: 19, autoComplete: "off" }}
//             required
//           />
//           <Button
//             className="w-full"
//             variant="contained"
//             color="success"
//             onClick={handleRegister}
//             disabled={
//               name.length === 0 ||
//               surname.length === 0 ||
//               phoneNumber.length < 19
//             } // Disable if any field is not filled
//           >
//             {t("royxat")}
//           </Button>
//           <div className="text-black text-sm">
//             {t("royxat+")}
//             <span
//               className="text-blue-500 cursor-pointer"
//               onClick={handleKirishOpen}
//             >
//               {" "}
//               {t("kirish")}
//             </span>
//           </div>
//         </Box>
//       </Modal>

//       <Modal
//         open={openParol}
//         aria-labelledby="parol-modal-title"
//         aria-describedby="parol-modal-description"
//       >
//         <Box sx={style}>
//           <div className="flex justify-between items-center">
//             <img className="mr-4 w-18 h-16" src={logoImg} alt="logo" />
//             <CloseIcon className="cursor-pointer" onClick={handleClose} />
//           </div>
//           <div className="text-black font-bold text-2xl">{t("tasdiqlash")}</div>
//           <div className="text-black my-2 text-xl">{t("sms_parol")}</div>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             {parol.map((digit, index) => (
//               <TextField
//                 key={index}
//                 className="w-[15%]  mb-4 "
//                 id={`otp-input-${index}`}
//                 variant="outlined"
//                 margin="normal"
//                 type="text"
//                 value={digit}
//                 onChange={(e) => handleChange(e.target, index)}
//                 inputProps={{
//                   maxLength: 1,
//                   autoComplete: "off",
//                   style: { textAlign: "center" },
//                 }}
//                 required
//               />
//             ))}
//           </div>
//           {error && (
//             <Typography color="error" className="mt-4">
//               {error}
//             </Typography>
//           )}
//           <Button
//             className="w-full mt-4 mb-2"
//             variant="contained"
//             color="success"
//             onClick={handleParol}
//           >
//             {t("kirish")}
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// export default Profil;






import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import logoImg from "../../src/assets/narxnav-logo.png";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import "tailwindcss/tailwind.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserContext from "../Components/User/UserContext";
import ip from "../Components/Config"

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

const phoneNumberFormatter = (input) => {
  let cleaned = input.replace(/\D/g, "");

  if (cleaned.startsWith("998")) {
    cleaned = cleaned.slice(3);
  }

  let formatted = "+998";

  if (cleaned.length > 0) {
    formatted += ` (${cleaned.substring(0, 2)}`;
  }
  if (cleaned.length >= 2) {
    formatted += `) ${cleaned.substring(2, 5)}`;
  }
  if (cleaned.length >= 5) {
    formatted += ` ${cleaned.substring(5, 7)}`;
  }
  if (cleaned.length >= 7) {
    formatted += ` ${cleaned.substring(7, 9)}`;
  }

  return formatted;
};

function Profil() {
  const { user, updateUser, logoutUser } = useContext(UserContext);
  const [openKirish, setOpenKirish] = useState(false);
  const [openParol, setOpenParol] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+998");
  const [parol, setParol] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.phoneNumber) {
      setOpenKirish(false);
      setOpenRegister(false);
      setOpenParol(false);
    }
  }, [user]);

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    const formattedInput = phoneNumberFormatter(input);
    setPhoneNumber(formattedInput);
  };

  const handleOpen = () => setOpenKirish(true);
  const handleClose = () => {
    setOpenKirish(false);
    setOpenRegister(false);
    setOpenParol(false);
    setPhoneNumber("+998");
    setName("");
    setSurname("");
    setParol(["", "", "", ""]);
    setError("");
  };

  const handleKirishOpen = () => {
    setOpenRegister(false);
    setOpenKirish(true);
    setOpenParol(false);
  };

  const handleRegisterOpen = () => {
    setOpenKirish(false);
    setOpenRegister(true);
    setOpenParol(false);
  };

  const handleParolOpen = () => {
    setOpenKirish(false);
    setOpenRegister(false);
    setOpenParol(true);
  };

  const handleKirish = async () => {
    try {
      const phoneNumberCleaned = cleanPhoneNumber(phoneNumber);
      const formData = new URLSearchParams();
      formData.append("user_phone_number", phoneNumberCleaned);

      const response = await fetch(
        `http://${ip}/api/otp/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );
      if (response.ok) {
        setOpenParol(true); // Open the parol modal on successful response
      } else {
        const data = await response.json();
        setError("OTP creation failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      setError("Error during OTP creation: " + error.message);
    }
  };

  const handleParol = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("otp", parol.join(""));
      formData.append("phone_number", cleanPhoneNumber(phoneNumber));

      const response = await fetch(
        `http://${ip}/api/otp/verify/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      if (response.ok) {
        updateUser({ phoneNumber: cleanPhoneNumber(phoneNumber) });
        navigate("/accound"); // Redirect to "/" if OTP verification is successful
      } else {
        const data = await response.json();
        setError("Siz xato kod kiritdingiz");
      }
    } catch (error) {
      setError("Error during OTP verification: " + error.message);
    }
  };

  function generatePassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  function cleanPhoneNumber(phoneNumber) {
    let cleaned = phoneNumber.replace(/[^\d]/g, "");
    return cleaned;
  }

  const handleRegister = async () => {
    console.log(`http://${ip}/api/signup/`);

    try {
      const phoneNumberCleaned = cleanPhoneNumber(phoneNumber);
      const response = await fetch(
        `http://${ip}/api/signup/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: name,
            last_name: surname,
            phone_number: phoneNumberCleaned,
            password: generatePassword(),
          }),
        }
      );

      if (response.ok) {
        setOpenParol(true);
      } else {
        const data = await response.json();
        console.log("Ro'yxatdan o'tish response:", data);
        setError("OTP creation failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      setError("Error during OTP creation: " + error.message);
    }
  };

  const handleLogout = () => {
    navigate("/accound");
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleChange = (element, index) => {
    if (/^\d*$/.test(element.value)) {
      let newParol = [...parol];
      newParol[index] = element.value;
      setParol(newParol);

      // Move to the next input field if current one is filled
      if (element.value !== "" && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div>
      {user.phoneNumber ? (
        <Button
          onClick={handleLogout}
          variant="contained"
          className="flex items-center md:space-x-2 space-x-0"
        >
          <PersonIcon className="md:mr-2" />
          <span className="hidden md:block">{t("profil")}</span>
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          variant="contained"
          className="flex items-center md:space-x-2 space-x-0"
        >
          <PersonIcon className="md:mr-2" />
          <span className="hidden md:block">{t("kirish")}</span>
        </Button>
      )}
      <Modal
        open={openKirish}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center">
            <img className="mr-4 w-14 h-14" src={logoImg} alt="logo" />
            {/* <p className="name font-bold text-2xl  pt-4 capitalize">{t("NarxNav")}</p> */}
            <CloseIcon className="cursor-pointer" onClick={handleClose} />
          </div>

          <div className="text-black text-2xl mt-4">{t("telefon")}</div>
          <div className="text-black text-sm mt-2">{t("sms")}</div>
          <div className="name font-bold pt-4 capitalize">{t("traqam")}</div>
          <TextField
            id="phone-number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            inputProps={{ maxLength: 19, autoComplete: "off" }}
            required
          />
          <Button
            className="w-full mt-2 mb-2"
            variant="contained"
            color="success"
            onClick={handleKirish}
            disabled={phoneNumber.length < 19} // Disable if phone number is not fully entered
          >
            {t("kirish")}
          </Button>
          <div className="text-black text-sm">
            {t("royxat?")}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleRegisterOpen}
            >
              {" "}
              {t("royxat")}
            </span>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openRegister}
        aria-labelledby="register-modal-title"
        aria-describedby="register-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center">
            <img className="mr-4 w-10 h-10" src={logoImg} alt="logo" />
            <CloseIcon className="cursor-pointer" onClick={handleClose} />
          </div>
          <div className="text-black text-3xl">{t("royxat")}</div>
          <div className="name font-bold pt-4 capitalize">{t("ism")}</div>
          <TextField
            id="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            inputProps={{ autoComplete: "off" }}
            required
          />
          <div className="name font-bold pt-4 capitalize">{t("familya")}</div>
          <TextField
            id="surname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            inputProps={{ autoComplete: "off" }}
            required
          />
          <div className="name font-bold pt-4 capitalize">{t("traqam")}</div>
          <TextField
            id="phone-number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            inputProps={{ maxLength: 19, autoComplete: "off" }}
            required
          />
          <Button
            className="w-full"
            variant="contained"
            color="success"
            onClick={handleRegister}
            disabled={
              name.length === 0 ||
              surname.length === 0 ||
              phoneNumber.length < 19
            } // Disable if any field is not filled
          >
            {t("royxat")}
          </Button>
          <div className="text-black text-sm">
            {t("royxat+")}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleKirishOpen}
            >
              {" "}
              {t("kirish")}
            </span>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openParol}
        aria-labelledby="parol-modal-title"
        aria-describedby="parol-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center">
            <img className="mr-4 w-18 h-16" src={logoImg} alt="logo" />
            <CloseIcon className="cursor-pointer" onClick={handleClose} />
          </div>
          <div className="text-black font-bold text-2xl">{t("tasdiqlash")}</div>
          <div className="text-black my-2 text-xl">{t("sms_parol")}</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {parol.map((digit, index) => (
              <TextField
                key={index}
                className="w-[15%]  mb-4 "
                id={`otp-input-${index}`}
                variant="outlined"
                margin="normal"
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                inputProps={{ maxLength: 1, autoComplete: "off", style: { textAlign: "center" } }}
                required
              />
            ))}
          </div>
          {error && (
            <Typography color="error" className="mt-4">
              {error}
            </Typography>
          )}
          <Button
            className="w-full mt-4 mb-2"
            variant="contained"
            color="success"
            onClick={handleParol}
          >
            {t("kirish")}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Profil;
