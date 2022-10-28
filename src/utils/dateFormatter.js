export const dateFormatter = (reqTime) => {
  return new Date(reqTime).toLocaleString("en-EU", {
    dateStyle: "short",
    timeStyle: "short",
  })
}
