import * as webPush from 'web-push';
import { FileDB } from '../../../helpers/file-db';

const db = new FileDB();

const apiKeys = {
  pubKey: process.env.VAPID_PUBLIC_KEY as string,
  privKey: process.env.VAPID_PRIVATE_KEY as string,
};
const mailTo = `mailto:YOUR_MAILTO_STRING`;

webPush.setVapidDetails(mailTo, apiKeys.pubKey, apiKeys.privKey);

const getSubscriptions = () => {
  const subscriptions = db.readByKey('subscriptions') || [];
  return subscriptions;
};

const getLastSubscription = () => {
  const subscriptions = getSubscriptions();
  return subscriptions[subscriptions.length - 1];
};

export const saveSubscription = (subscription: any) => {
  const subscriptions = getSubscriptions();
  subscriptions.push(subscription);
  db.writeByKey('subscriptions', subscriptions);
};

export const sendNotification = async (
  dataToSend: string,
  subscription = getLastSubscription(),
) => {
  try {
    await webPush.sendNotification(subscription, dataToSend);
  } catch (err) {
    console.log(err);
  }
};
