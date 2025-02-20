import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GoBackIcon from "../../assets/icons/goback.svg";
import ProfileIcon from "../../assets/icons/profile.svg";
import Dropdown from "../Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import {
  useCheckSessionQuery,
  useSignOutMutation,
} from "../../services/api/user.api";
import "./AppHeader.scss";

interface AppHeaderProps {
  title?: string;
}

const AppHeader = ({ title }: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();
  const [signOut] = useSignOutMutation();
  const { isSuccess, refetch: checkSession } = useCheckSessionQuery();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    signOut().then(() => {
      navigate("/");
      checkSession();
    });
  };

  return (
    <header className="app-header">
      {location.pathname !== "/lists" && (
        <button className="go-back-button" onClick={handleGoBack}>
          <GoBackIcon />
        </button>
      )}
      <span className="center-content">{title}</span>
      {isSuccess && (
        <div className="profile-button" ref={dropdownRef}>
          <button onClick={handleProfileClick}>
            <ProfileIcon />
          </button>
          {showDropdown && (
            <Dropdown
              options={[{ label: t("logout"), onClick: handleLogout }]}
            />
          )}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
