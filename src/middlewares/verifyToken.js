import * as admin from "firebase-admin";

const verifyToken = async (req, res, next) => {
  try {
    const { authtoken } = req.headers;
    const authUser = await admin.auth().verifyIdToken(authtoken);
    req.user = authUser;
  } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
};

export { verifyToken };
