export const getDateTime = (dateString: string) => {
  const date = new Date(dateString);
  if (date.toString() === "Invalid Date") {
    return "Never";
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
  });
};
