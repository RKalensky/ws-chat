import { useEffect, useState } from 'react';

export default () => {
  const [isOnline, setStatus] = useState(true);

  const offlineHandler = () => {
    setStatus(false);
  };

  const onlineHandler = () => {
    setStatus(true);
  };

  useEffect(() => {
    window.addEventListener('offline', offlineHandler);
    window.addEventListener('online', onlineHandler);

    return () => {
      window.removeEventListener('offline', offlineHandler);
      window.removeEventListener('online', onlineHandler);
    };
  }, []);

  return isOnline;
};
