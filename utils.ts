import moment from "moment";

export const formatDate = (str: Date) => {
  return moment(str).format("MMMM Do YYYY, h:mm:ss a");
};
