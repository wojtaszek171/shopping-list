import { cloneElement, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GoBackIcon from "../../assets/icons/goback.svg";
import ProfileIcon from "../../assets/icons/profile.svg";
import NotificationsIcon from "../../assets/icons/notifications.svg";
import NotificationsIconActive from "../../assets/icons/notifications-active.svg";
import Dropdown from "../Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import {
  useCheckSessionQuery,
  useSignOutMutation,
} from "../../services/api/user.api";
import { HeaderContext } from "./HeaderProvider";
import { useGetNotificationsQuery } from "../../services/api/notifications.api";
import NotificationsPanel from "../NotificationsPanel/NotificationsPanel";
import "./AppHeader.scss";

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, buttons } = useContext(HeaderContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { t } = useTranslation();
  const [signOut] = useSignOutMutation();
  const {
    data: sessionData,
    isSuccess,
    refetch: checkSession,
  } = useCheckSessionQuery();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isSuccess: didNotificationsLoad, data: notifications } =
    useGetNotificationsQuery();

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

  const isActive = (active: boolean | (() => boolean) | undefined) => {
    return typeof active === "function" ? active() : active;
  };

  const allRead = notifications?.every((notification) => notification.read);

  return (
    <header className="app-header">
      {location.pathname !== "/lists" && (
        <button className="go-back-button" onClick={handleGoBack}>
          <GoBackIcon />
        </button>
      )}
      <span className="center-content">{title}</span>
      {buttons
        .filter((b) => !b.hidden)
        .map((button, index) => (
          <button
            key={index}
            className={`header-button ${isActive(button.active) ? "active" : ""}`}
            onClick={button.action}
            style={{ fill: button?.color }}
          >
            {button.icon &&
              cloneElement(button.icon, {
                style: { fill: button?.color },
              })}
            {button.title}
          </button>
        ))}
      {isSuccess && (
        <>
          <button
            className={`header-button ${!allRead ? "notifications-active" : ""}`}
            disabled={!didNotificationsLoad}
            onClick={() => setNotificationsOpen((prev) => !prev)}
          >
            {allRead ? <NotificationsIcon /> : <NotificationsIconActive />}
          </button>
          {notificationsOpen && (
            <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
          )}
          <div className="profile-button" ref={dropdownRef}>
            <button onClick={handleProfileClick} disabled={!isSuccess}>
              <ProfileIcon />
            </button>
            {showDropdown && (
              <Dropdown
                title={sessionData?.fullname}
                options={[{ label: t("logout"), onClick: handleLogout }]}
              />
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default AppHeader;
