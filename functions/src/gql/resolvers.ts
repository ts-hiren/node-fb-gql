import dateScalar from "./scalars/date";
import containerResolvers from "../containers/resolvers";
import { merge } from "lodash";

const resolvers = {
  Date: dateScalar,
};

export default merge(resolvers, containerResolvers);
