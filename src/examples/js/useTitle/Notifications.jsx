import { useEffect, useState } from 'react';
import { useTitle } from '../../../hooks/js/useTitle';

const appNotifications = [
  { id: 1, title: 'Notification 1' },
  { id: 2, title: 'Notification 2' },
  { id: 3, title: 'Notification 3' },
  { id: 4, title: 'Notification 4' },
  { id: 5, title: 'Notification 5' }
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState(appNotifications);
  const { title, changeTitle } = useTitle();

  useEffect(() => {
    changeTitle(`${title} (${notifications.length})`);
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
            {notification.title}
            <button onClick={() => deleteNotification(notification.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
