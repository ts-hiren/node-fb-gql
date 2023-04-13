import { ApolloError } from "apollo-server-errors";
import * as admin from "firebase-admin";
import { Collections } from "../../database/Collections";
import { paginatedQuery } from "../../database/paginatedResolver";
import { PageQueryOptions } from "../../gql/scalars/pagination";

interface UserInput {
  email: string;
  firstName: string;
  lastName?: string;
  position: string;
  joiningDate: string;
  birthDate: string;
  totalExp: string;
  skills: [string];
  address: string;
  phone: string;
  status: string;
  gender: string;
  id: string;
  password: string;
}
export const userResolver = {
  /**
   * ---------------------Query----------------------------
   */
  Query: {
    async user(
      _: null,
      { id }: { id: string },
      { admin }: { admin: admin.app.App }
    ) {
      try {
        const doc = await admin
          .firestore()
          .collection(Collections.USER)
          .doc(id)
          .get();
        return {
          id: doc.id,
          ...doc.data(),
        };
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    users: (
      _: null,
      { options: pageOptions }: { options: PageQueryOptions },
      context
    ) => paginatedQuery("users", pageOptions, context),
  },
  /**
   * ------------------MUTATIONS---------------------------
   */
  Mutation: {
    /**
     * ------------------CREATE MUTATIONS---------------------------
     */
    async createUser(_, { input }: { input: UserInput }) {
      const usr = await admin.auth().createUser({
        email: input.email,
        password: input.password,
      });
      const { password, ...UserData } = input;
      const userData = { id: usr.uid, ...UserData };
      const dbUser = await admin
        .firestore()
        .collection(Collections.USER)
        .doc(usr.uid)
        .set(userData, { merge: true });
      return dbUser;
    },
    /**
     * ------------------UPDATE MUTATIONS---------------------------
     */
    async updateUser(_, { id, input }: { id: string; input: UserInput }) {
      const { password, ...userData } = input;
      await admin
        .firestore()
        .collection(Collections.USER)
        .doc(id)
        .set({ ...userData });
      return {
        id,
        ...userData,
      };
    },
  },
};
