import { describe, it, expect } from "vitest";
import notificationsReducer, {
  addNotification,
  removeNotification,
} from "../features/notifications/notificationsSlice";
import { NotificationsState, Notification } from "../types/NotificationType";

describe("notificationsSlice", () => {
  it("should return the initial state", () => {
    const initialState = { notifications: [] };
    expect(notificationsReducer(undefined, { type: "@INIT" })).toEqual(
      initialState
    );
  });

  it("should handle addNotification", () => {
    const previousState = { notifications: [] };
    const message = "New notification message";

    const newState = notificationsReducer(
      previousState,
      addNotification(message)
    );

    expect(newState.notifications.length).toBe(1);
    expect(newState.notifications[0].message).toBe(message);
    expect(newState.notifications[0].type).toBe("info");
    expect(newState.notifications[0].id).toBeDefined();
  });

  it("should handle removeNotification", () => {
    const notification: Notification = {
      id: "1",
      message: "Notification to remove",
      type: "info",
    };
    const previousState: NotificationsState = { notifications: [notification] };

    const newState = notificationsReducer(
      previousState,
      removeNotification("1")
    );

    expect(newState.notifications.length).toBe(0);
  });

  it("should not remove a notification if the id does not match", () => {
    const notification: Notification = {
      id: "1",
      message: "Notification to keep",
      type: "info",
    };
    const previousState: NotificationsState = { notifications: [notification] };

    const newState = notificationsReducer(
      previousState,
      removeNotification("2")
    );

    expect(newState.notifications.length).toBe(1);
    expect(newState.notifications[0]).toEqual(notification);
  });
});
