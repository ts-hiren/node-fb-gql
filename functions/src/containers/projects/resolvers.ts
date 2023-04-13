import { ApolloError } from "apollo-server-errors";
import * as admin from "firebase-admin";
import { Collections } from "../../database/Collections";
import { paginatedQuery } from "../../database/paginatedResolver";
import { PageQueryOptions } from "../../gql/scalars/pagination";

interface ProjectInput {
  id: string;
  createAt: string;
  description: string;
  title: string;
}
export const projectResolver = {
  /**
   * ---------------------Query----------------------------
   */
  Query: {
    async project(
      _: null,
      { id }: { id: string },
      { admin }: { admin: admin.app.App }
    ) {
      try {
        const doc = await admin
          .firestore()
          .collection(Collections.PROJECT)
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

    projects: (
      _: null,
      { options: pageOptions }: { options: PageQueryOptions },
      context
    ) => paginatedQuery("projects", pageOptions, context),
  },
  /**
   * ------------------MUTATIONS---------------------------
   */
  Mutation: {
    async createProject(_, { input }: { input: ProjectInput }) {
      console.log("INPUTDATA ", input);
      const project = await admin
        .firestore()
        .collection(Collections.PROJECT)
        .doc();
      input.id = project.id;
      project.set(input, { merge: true });
      return project;
    },
  },
};
