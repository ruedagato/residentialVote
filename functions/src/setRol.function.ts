import { https } from 'firebase-functions';
import { initializeApp ,auth } from 'firebase-admin';

initializeApp()

export const setRol = https.onCall(async (data) => {
  const { uid, rol } = data;
  await auth().setCustomUserClaims(uid, { rol });
  return;
});
