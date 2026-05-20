const baseURL = "https://wedev-api.sky.pro/api";

const createJsonBody = (data) => {
  return new Blob([JSON.stringify(data)]);
};

const parseAuthResponse = async (response) => {
  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const message =
      data?.error || data?.message || `Ошибка запроса: ${response.status}`;

    const error = new Error(message);

    error.response = {
      data,
      status: response.status,
    };

    throw error;
  }

  return data;
};

const saveAuthData = (user) => {
  if (!user?.token) return;

  localStorage.setItem("token", user.token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const signUp = async (login, name, password) => {
  const response = await fetch(`${baseURL}/user`, {
    method: "POST",
    body: createJsonBody({
      login: login.trim(),
      name: name.trim(),
      password,
    }),
  });

  const data = await parseAuthResponse(response);

  saveAuthData(data.user);

  return data;
};

export const signIn = async (login, password) => {
  const response = await fetch(`${baseURL}/user/login`, {
    method: "POST",
    body: createJsonBody({
      login: login.trim(),
      password,
    }),
  });

  const data = await parseAuthResponse(response);

  saveAuthData(data.user);

  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => {
  const token = getToken();

  return Boolean(token && token !== "undefined" && token !== "null");
};
