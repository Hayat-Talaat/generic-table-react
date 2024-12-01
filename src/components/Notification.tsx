import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeNotification } from "../features/notifications/notificationsSlice";

const Notifications: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notifications[0].id));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  const latestNotification = notifications[notifications.length - 1];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-white bg-green-500">
      <div className="flex items-center">
        <span>✔️</span>
        <span>{latestNotification.message}</span>
      </div>
    </div>
  );
};

export default Notifications;
