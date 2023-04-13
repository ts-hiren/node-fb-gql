import { userResolver } from "./users/resolvers";
import { projectResolver } from "./projects/resolvers";
import { merge } from "lodash";

export default merge(userResolver, projectResolver);
