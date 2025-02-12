import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import Input from "../Input";
import {
  useLazyCheckSessionQuery,
  useSignInMutation,
} from "../../services/api/user.api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const [signIn, { error, isSuccess }] = useSignInMutation();
  const [checkSession] = useLazyCheckSessionQuery();

  const handleSignIn = () => {
    signIn({ email, password });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      checkSession();
    }
  }, [checkSession, isSuccess]);

  return (
    <div className="sign-in-component">
      <h2>{t("signIn")}</h2>
      <Input
        label={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label={t("password")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {error && <span className="error-message">{error?.data?.message}</span>}
      <Button className="submit-button" onClick={handleSignIn}>
        {t("signIn")}
      </Button>
    </div>
  );
};

export default SignIn;
