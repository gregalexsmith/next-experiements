import { sendNotification } from '../utils';

export async function POST() {
  sendNotification('Test push notification');
  return Response.json({
    status: 'Success',
    message: 'Message sent to push service',
  });
}
