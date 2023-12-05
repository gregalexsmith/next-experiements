const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const getKey = async () => {
  const response = await fetch('/push-notifications/api/public-key');
  const { key } = await response.json();
  return key;
};

const saveSubscription = async (subscription) => {
  const body = JSON.stringify(subscription);
  const response = await fetch('/push-notifications/api/save-subscription', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body,
  });

  return response.json();
};

self.addEventListener('activate', async () => {
  const VAPID_PUBLIC_KEY = await getKey();
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  console.log('[worker] subscription', subscription);
  const response = await saveSubscription(subscription);
  console.log('[worker] subscription saved', response);
});

self.addEventListener('push', (e) => {
  self.registration.showNotification('Next Experiments', {
    body: e.data.text(),
  });
});
