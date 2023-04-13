import { AuthenticationError } from "apollo-server-errors";
import admin from "../admin";

const context: Function = async ({ req }: { req: any }) => {
  const token = req.headers.authorization || "";
  // try to retrieve a user with the token
  const user = await admin
    .auth()
    .verifyIdToken(token)
    .catch(() => null);

  // optionally block the user
  if (!user) throw new AuthenticationError("Unauthorized");
  // add the user to the context
  return { user, admin };
};

export default context;
