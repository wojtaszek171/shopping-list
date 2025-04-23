import { Trans, useTranslation } from "react-i18next";
import {
  useGetNotificationsQuery,
  useSetAsReadNotificationMutation,
} from "../../services/api/notifications.api";
import Button from "../Button";
import CloseIcon from "../../assets/icons/close.svg";
import NotificationRead from "../../assets/icons/notification-read.svg";
import NotificationDelete from "../../assets/icons/notification-delete.svg";
import { Notification } from "../../services/types";
import {
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
} from "../../services/api/list.api";
import { useDeleteNotificationMutation } from "../../services/api/notifications.api";
import "./NotificationsPanel.scss";

interface NotificationsPanelProps {
  onClose: () => void;
}

const NotificationsPanel = ({ onClose }: NotificationsPanelProps) => {
  const { currentData: notifications, refetch } = useGetNotificationsQuery();
  const { t } = useTranslation();
  const [acceptInvitation] = useAcceptInvitationMutation();
  const [declineInvitation] = useDeclineInvitationMutation();

  const [deleteNotification] = useDeleteNotificationMutation();
  const [readNotification] = useSetAsReadNotificationMutation();

  const handleAcceptInvitation = (notification: Notification) => {
    acceptInvitation(notification?.refId._id).then(refetch);
  };

  const handleDeclineInvitation = (notification: Notification) => {
    declineInvitation(notification?.refId._id).then(refetch);
  };

  const handleDeleteNotification = (notification: Notification) => {
    deleteNotification(notification?._id).then(refetch);
  };

  const getNotificationContent = (notification: Notification) => {
    switch (notification.type) {
      case "invitation":
        return (
          <>
            <span>
              <Trans
                i18nKey={"invitationNotificationMessage"}
                components={[<span className="notification-info-strong" />]}
                values={{
                  listName: notification?.refId?.name || "unknown",
                  inviterName: notification?.sender?.username,
                }}
              />
            </span>
            <div className="notification-buttons">
              {notification?.refId?._id && (
                <>
                  <Button
                    size="small"
                    onClick={() => handleAcceptInvitation(notification)}
                  >
                    {t("accept")}
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDeclineInvitation(notification)}
                  >
                    {t("decline")}
                  </Button>
                </>
              )}
            </div>
          </>
        );
      default:
        return;
    }
  };

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
              <div className="notification-item-content">
                <div className="notification-info">
                  {getNotificationContent(notification)}
                </div>
                <span className="notification-item-date">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="notification-item-actions">
                <Button
                  size="icon"
                  onClick={() => handleDeleteNotification(notification)}
                >
                  <NotificationDelete />
                </Button>
                {!notification.read && (
                  <Button
                    size="icon"
                    onClick={() => readNotification(notification._id)}
                  >
                    <NotificationRead />
                  </Button>
                )}
              </div>
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
