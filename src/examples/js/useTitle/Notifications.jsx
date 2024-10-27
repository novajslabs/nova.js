import { useEffect, useState } from 'react';
import { useTitle } from '../../../hooks/js/useTitle.js';

// Simulate an API call that returns a list of notifications
const fetchNotifications = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Notification 1' },
        { id: 2, text: 'Notification 2' },
        { id: 3, text: 'Notification 3' },
        { id: 4, text: 'Notification 4' },
        { id: 5, text: 'Notification 5' }
      ]);
    }, 1000);
  });
};

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { title, changeTitle } = useTitle();

  useEffect(() => {
    fetchNotifications().then((notifications) => {
      setNotifications(notifications);
      changeTitle(`Notifications (${notifications.length})`);
    });
  }, []);

  // Delete notification
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);

    // Set the title depending on the number of notifications left
    const newTitle =
      updatedNotifications.length > 0
        ? `${title.split(' (')[0]} (${updatedNotifications.length})`
        : title.split(' (')[0];
    changeTitle(newTitle);
  };

  return (
    <>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.text}
            <button onClick={() => deleteNotification(notification.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
