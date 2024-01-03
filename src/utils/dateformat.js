export default function getDate() {
  const date = new Date(new Date().toISOString());
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
