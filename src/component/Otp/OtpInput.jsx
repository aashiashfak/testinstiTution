import * as React from "react";
import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";
import { Button, Typography } from "@mui/material";
import useToast from "../../hooks/useToast";
import { ResentText } from "../CustomeElements/RText";
import ResentOtp from "../../services/user/ResentOtp";
import { useState, useEffect } from "react";
import OTPSkeleton from "../Skeletons/OtpSkeleton";

export default function OTP({
  data,
  separator,
  length,
  value,
  onChange,
  onverify,
}) {
  console.log("datas  are sent to otp compoent :", data);
  console.log("values are :", onverify ? "und fn " : "fn illa");
  const { email } = data;
  const showToast = useToast();
  const inputRefs = React.useRef(new Array(length).fill(null));
  const [countdown, setCountdown] = useState(115); 
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setIsButtonVisible(true);
    }
    return () => clearTimeout(timer); 
  }, [countdown]);

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }

    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };
  const handleVerify = (e) => {
    if (value.length < 6) {
      showToast("Please Enter Valid Otp", "error");
    } else {
      onverify();
    }
  };

  const handleResentOtp = async () => {
    setIsLoading(true)
    try {
      const response = await ResentOtp(email);
      console.log("response from otp resent");

      
        showToast("OTP Sent Successfully", "success");
        setIsButtonVisible(false);
        setCountdown(115); 

      console.log("response si :", response);
    } catch (error) {
      console.log("error is (from resnent otp ):", error);
      showToast(
        error.response.data.message,
        "error"
       
      );
    }finally{
      setIsLoading(false)
    }
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
     {!isLoading  ? (
       <>
       
       <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
       {new Array(length).fill(null).map((_, index) => (
         <React.Fragment key={index}>
           <BaseInput
             slots={{
               input: InputElement,
             }}
             aria-label={`Digit ${index + 1} of OTP`}
             slotProps={{
               input: {
                 ref: (ele) => {
                   inputRefs.current[index] = ele;
                 },
                 onKeyDown: (event) => handleKeyDown(event, index),
                 onChange: (event) => handleChange(event, index),
                 onClick: (event) => handleClick(event, index),
                 onPaste: (event) => handlePaste(event, index),
                 value: value[index] ?? "",
               },
             }}
           />
           {index === length - 1 ? null : separator}
         </React.Fragment>
       ))}
     </Box>
     
     <Box sx={{ mt: 5, width: "100%" }}>
       <Button
         sx={{
           textAlign: "center",
           mb: 2,
           color: "white",
           paddingLeft: 2,
           paddingRight: 2,
           bgcolor: "#009688",
           width:'100%',
           ":hover": {
             bgcolor: "#00796b",
           },
         }}
         onClick={(e) => handleVerify()}
         className="bg"
       >
         Verify
       </Button>
     </Box>
     <Button  sx={{
       display:'flex',
       flex:'flex'
     }}>
       {!isButtonVisible && (
         <Typography fontSize={14} >Resend OTP in {countdown} second</Typography>
       )}

       {isButtonVisible && (
         <ResentText onClick={handleResentOtp}>Resend OTP?</ResentText>
       )}
     </Button>
       </>
     ):(
     <>
    <OTPSkeleton/>
     </>
     )}

    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};

const green = {
  100: "#C8E6C9",
  200: "#A5D6A7",
  400: "#81C784",
  500: "#66BB6A",
  600: "#43A047",
  700: "#388E3C",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  height: 50px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 8px 0;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${green[400]};
  }

  &:focus {
    border-color: ${green[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? green[600] : green[200]
    };
  }

  &:focus-visible {
    outline:0;
}
`
);