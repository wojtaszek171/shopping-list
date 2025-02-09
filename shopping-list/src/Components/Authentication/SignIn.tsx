import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import Input from "../Input";
import { signIn } from "../../services/api";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSignIn = () => {
    signIn({ username, password }).catch((error) => {
      setError(error.response.data.message);
    });
  };

  return (
    <div className="sign-in-component">
      <h2>{t("signIn")}</h2>
      <Input
        label={t("username")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label={t("password")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <span className="error-message">{error}</span>}
      <Button className="submit-button" onClick={handleSignIn}>
        {t("signIn")}
      </Button>
    </div>
  );
};

export default SignIn;
