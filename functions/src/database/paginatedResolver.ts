import * as admin from "firebase-admin";
import { PageQueryOptions } from "../gql/scalars/pagination";

export const paginatedQuery = async (
  collection: string,
  pageOptions: PageQueryOptions,
  { admin }: { admin: admin.app.App }
) => {
    console.log("paginate query")
  const { paginate, sort } = pageOptions || { paginate: null, sort: null };
  let query = admin.firestore().collection(collection).offset(0);
  if (paginate) {
    query = query
      .limit(paginate.limit)
      .offset((paginate.page - 1) * paginate.limit);
  }
  if (sort) {
    query = query.orderBy(sort.field, sort.order);
  }
  const data = (await query.get()).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  let links;
  if (!paginate) {
    links = null;
  } else {
    links = {
      next:
        paginate.limit > data.length
          ? null
          : {
              limit: paginate.limit,
              page: paginate.page + 1,
            },
      prev:
        paginate.page === 1
          ? null
          : {
              limit: paginate.limit,
              page: paginate.page - 1,
            },
    };
  }
  if (paginate && data.length < paginate.limit) {
  }
  return {
    data,
    links,
  };
};
