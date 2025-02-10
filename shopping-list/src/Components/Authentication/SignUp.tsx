import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import Input from "../Input";
import {
  useLazyCheckSessionQuery,
  useSignUpMutation,
} from "../../services/api/user.api";

const SignUp = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [signUp, { isSuccess, error: signUpError }] = useSignUpMutation();
  const [checkSession] = useLazyCheckSessionQuery();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    signUp({
      email,
      fullname,
      username,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      checkSession();
    }
  }, [checkSession, isSuccess]);

  useEffect(() => {
    if (signUpError) {
      setError(signUpError?.data?.message);
    }
  }, [signUpError]);

  return (
    <div className="sign-up-component">
      <h2>{t("signUp")}</h2>
      <Input
        label={t("fullName")}
        value={fullname}
        onChange={(e) => setFullName(e.target.value)}
      />
      <Input
        label={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <Input
        label={t("confirmPassword")}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <span className="error-message">{error}</span>}
      <Button className="submit-button" onClick={handleSignUp}>
        {t("signUp")}
      </Button>
    </div>
  );
};

export default SignUp;
