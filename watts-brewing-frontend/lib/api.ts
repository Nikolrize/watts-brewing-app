export async function getDashboard() {
  const res = await fetch("http://localhost:5000/api/dashboard");
  return res.json();
}
