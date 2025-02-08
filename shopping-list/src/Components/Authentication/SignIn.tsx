import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle SignIn logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div>
      <h2>{t("signIn")}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">{t("username")}</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">{t("password")}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">{t("signIn")}</Button>
      </form>
    </div>
  );
};

export default SignIn;
