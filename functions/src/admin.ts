import * as firebaseAdmin from "firebase-admin";

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});
export default admin;
