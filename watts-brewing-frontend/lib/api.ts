import { loginCredential } from "./types";

export async function getDashboard() {
  const res = await fetch(`/api/dashboard`, {
    credentials: "include",
  });
  return res.json();
}

export async function getStationRanking() {
  const res = await fetch(`/api/stations`, {
    credentials: "include",
  });
  return res.json();
}

export async function getAIInsights() {
  const res = await fetch(`/api/ai`, {
    credentials: "include",
  });
  return res.json();
}

export async function login(form: loginCredential) {
  const res = await fetch(`/api/auth/login`, {
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
  const res = await fetch(`/api/user/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to logout user");
  }

  return res.json();
}
