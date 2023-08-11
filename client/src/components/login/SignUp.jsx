import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../utils/globalUtils";

export default function SignUp({ handleFormDataCb }) {
  const [formData, setFormData] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleFormData = (e, field) => {
    setFormData({ ...formData, [field]: e?.target.value });
  };

  useEffect(() => {
    if (formData.email) {
      setIsEmailValid(validateEmail(formData.email));
    }
    if (formData.password) {
      setIsPasswordValid(validatePassword(formData.password));
    }
  }, [formData]);

  useEffect(() => {
    handleFormDataCb(formData);
  }, [formData]);

  const handleEmailOnBlur = () => {
    isEmailValid
      ? setEmailHelperText("")
      : setEmailHelperText("You entered an invalid email");
  };

  const handlePasswordOnBlur = () => {
    isPasswordValid
      ? setPasswordHelperText("")
      : setPasswordHelperText("Your password should be atl east 6 characters");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%" }}
          label="User Name"
          placeholder="Enter user name"
          onChange={(e) => handleFormData(e, "userName")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%" }}
          label="Email"
          placeholder="Enter email"
          onChange={(e) => handleFormData(e, "email")}
          onBlur={handleEmailOnBlur}
          helperText={emailHelperText}
          error={emailHelperText}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%" }}
          label="Password"
          placeholder="Enter password"
          type="password"
          onChange={(e) => handleFormData(e, "password")}
          onBlur={handlePasswordOnBlur}
          helperText={passwordHelperText}
          error={passwordHelperText}
        />
      </Grid>
    </Grid>
  );
}
