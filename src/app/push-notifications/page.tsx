'use client';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { checkSupport } from './client-helpers';

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register('sw.js');
  return registration;
};

const unregisterSW = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    registration.unregister();
  }
};

const sendNotification = async () => {
  const response = await fetch('/push-notifications/api/send-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const data = await response.json();
  console.log(data);
};

export default function PushNotifications() {
  const [permissionStatus, setPermissionStatus] = useState<
    NotificationPermission | undefined
  >();

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
  };

  useEffect(() => {
    const main = async () => {
      checkSupport();
      requestPermission();
      await registerSW();
    };
    main().catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <main className="px-8">
      <section className="flex flex-col gap-4 mb-4">
        <h1 className="text-lg">Push Notifications</h1>
        <p>Basic push notification implementation</p>
      </section>

      <div className="py-2">
        <span className="font-bold">Notification permission:</span>{' '}
        {permissionStatus}
      </div>
      <section className="py-2 flex gap-2">
        {permissionStatus && permissionStatus !== 'granted' && (
          <Button onClick={requestPermission}>Request permission</Button>
        )}
        <Button onClick={() => sendNotification()}>Send Notification</Button>
        <Button onClick={() => unregisterSW()}>Unregister SW</Button>
      </section>
    </main>
  );
}
