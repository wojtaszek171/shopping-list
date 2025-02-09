import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useTranslation } from "react-i18next";
import "./Authentication.scss";

const Authentication = () => {
  const { t } = useTranslation();
  const [register, setRegister] = useState(false);

  return (
    <div className="authentication-component">
      <div className="authentication-container">
        {register ? <SignUp /> : <SignIn />}
      </div>
      <a
        className="authentication-switch"
        onClick={() => setRegister(!register)}
      >
        {register ? t("signInLink") : t("signUpLink")}
      </a>
    </div>
  );
};

export default Authentication;
