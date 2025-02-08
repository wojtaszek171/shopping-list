import { FormEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // Handle sign up logic here
  };

  return (
    <div className="sign-up-component">
      <h2>{t("signUp")}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("username")}</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t("password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t("confirmPassword")}</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">{t("signUp")}</Button>
      </form>
    </div>
  );
};

export default SignUp;
