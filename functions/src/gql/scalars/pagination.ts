import { gql } from "apollo-server-core";

export interface PageQueryOptions {
  paginate: PaginateOptions;
  sort: SortOptions;
}

export interface PaginateOptions {
  page: number;
  limit: number;
}

export interface SortOptions {
  field: string;
  order: SortOrderEnum;
}

export enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

const typeDefs = gql`
  input PageQueryOptions {
    paginate: PaginateOptions
    sort: SortOptions
    search: SearchOptions
  }
  type PaginationLinks {
    prev: PageLimitPair
    next: PageLimitPair
  }
  type PageLimitPair {
    page: Int
    limit: Int
  }
  type PageMetadata {
    totalCount: Int
  }
  input SearchOptions {
    query: String
  }
  input PaginateOptions {
    page: Int
    limit: Int
  }
  input SortOptions {
    field: String
    order: SortOrderEnum
  }
  enum SortOrderEnum {
    ASC
    DESC
  }
`;

export default typeDefs;
