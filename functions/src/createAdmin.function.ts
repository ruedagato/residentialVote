import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createAdmin = functions.https.onRequest(async (req, resp) => {
  const { email, password } = req.body;
  const user = await admin.auth().createUser({
    email,
    password,
  });
  const userData = {
    role: 1,
    status: true,
    email
  };
  await Promise.all([
    admin.auth().setCustomUserClaims(user.uid, { role: 1 }),
    admin.firestore().collection('user').doc(user.uid).set(userData),
  ]);
  resp.send();
});
