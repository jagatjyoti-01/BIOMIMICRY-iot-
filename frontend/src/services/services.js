import { client } from "./axiosClient";

// ================= AUTH =================

// register
export function register(payload) {
  return client.post("/auth/register", payload);
}

// login
export function signIn(payload) {
  return client.post("/auth/login", payload);
}

// get profile
export function getProfile() {
  return client.get("/auth/profile");
}

// update profile
export function updateProfile(payload) {
  return client.patch("/auth/profile", payload);
}

// ================= USERS =================

// create user
export function createUser(payload) {
  return client.post("/users/create-user", payload);
}

// get all users
export function getUsers(params) {
  return client.get("/users", {
    params,
  });
}

// ================= PERMISSIONS =================

// get all permissions
export function getPermissions() {
  return client.get("/permissions");
}

// ================= DEVICES =================

// create device
export function createDevice(payload) {
  return client.post("/devices", payload);
}

// get all devices
export function getDevices(params) {
  return client.get("/devices", {
    params,
  });
}


export function updateDevice(id, payload) {
  return client.patch(
    `/devices/${id}`,
    payload
  );
}


export function updateUser(id, payload) {
  return client.patch(
    `/users/${id}`,
    payload
  );
}


export function createPermission(payload) {
  return client.post(
    "/permissions",
    payload
  );
}


export function getDashboardStats() {
  return client.get("/dashboard/stats");
}

export function getSensorAnalytics() {
  return client.get(
    "/data/analytics"
  );
}