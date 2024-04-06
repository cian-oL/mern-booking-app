import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// ===== PROFILE REGISTRATION & SIGN-IN AUTH =====

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    method: "POST",
    headers: {
      "Content-Type": "json/application",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

// ===== HOTEL FORM =====

// formData Parameter means no json content-type!!!
export const addMyHotel = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};
