import { gql } from "apollo-server-core";
import { userTypes, projectTypes } from "../containers/typeDefs";
import pagination from "./scalars/pagination";

const typeDefs = gql`
  scalar Date
  type Query {
    _empty: String
  }
`;

export default [typeDefs, pagination, userTypes, projectTypes];
