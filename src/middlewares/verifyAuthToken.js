import * as admin from "firebase-admin";

export const verifyIdToken = async (req, res, next) => {
  const { authtoken } = req.headers;
  try {
    const authUser = await admin.auth().verifyIdToken(authtoken);
    req.user = authUser;
    next();
  } catch (e) {
    res.sendstatus(401);
  }
};
