import { mockUsersData } from "../data/mockUsersData";

export const fetchUserTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUsersData), 1000);
  });
};