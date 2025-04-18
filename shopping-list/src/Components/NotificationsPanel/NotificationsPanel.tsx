import { useTranslation } from "react-i18next";
import { useGetNotificationsQuery } from "../../services/api/notifications.api";
import Button from "../Button";
import CloseIcon from "../../assets/icons/close.svg";
import "./NotificationsPanel.scss";

interface NotificationsPanelProps {
  onClose: () => void;
}

const NotificationsPanel = ({ onClose }: NotificationsPanelProps) => {
  const { currentData: notifications } = useGetNotificationsQuery();
  const { t } = useTranslation();

  return (
    <div className="notifications-panel-component">
      <div className="notifications-panel-header">
        <span className="notifications-panel-title">
          {t("notificationsPanelTitle")}
        </span>
        <Button size="icon" onClick={onClose}>
          <CloseIcon />
        </Button>
      </div>
      {notifications && notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <p>{notification.message}</p>
              <span>{new Date(notification.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="notification-message">
          {t("noNotificationsMessage")}
        </span>
      )}
    </div>
  );
};

export default NotificationsPanel;
