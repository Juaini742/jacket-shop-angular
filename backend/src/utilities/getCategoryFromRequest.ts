export const getCategoryFromRequest = (query: any): string => {
  if (typeof query === "string") {
    return query;
  } else if (Array.isArray(query)) {
    return query[0];
  }

  return "";
};
