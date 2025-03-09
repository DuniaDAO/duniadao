import React from 'react';
import { Bell } from 'lucide-react';
import { useNotificationStore } from '../store/notifications';
import { Toaster, toast } from 'sonner';

const NotificationCenter = () => {
  const { notifications, markAsRead } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="relative">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="h-6 w-6 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        
        {notifications.length > 0 && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationCenter;