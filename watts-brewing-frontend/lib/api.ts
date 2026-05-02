import { loginCredential } from "./types";

export async function getDashboard() {
  const res = await fetch("http://localhost:5000/api/dashboard");
  return res.json();
}

export async function getStationRanking() {
  const res = await fetch("http://localhost:5000/api/stations");
  return res.json();
}

export async function getAIInsights() {
  const res = await fetch("http://localhost:5000/api/ai");
  return res.json();
}

export async function login(form: loginCredential) {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(form),
  });

  return res.json();
}

export async function getUser() {
  const res = await fetch(`http://localhost:5000/api/user/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}