export const getNameSubscription = (key: string): string => {
  switch (key) {
    case "weekly":
      return "1 week";

    case "month":
      return "1 month";

    case "3_month":
      return "3 months";

    case "year":
      return "1 year";

    default:
      return "";
  }
};
