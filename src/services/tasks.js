const baseURL = "https://wedev-api.sky.pro/api";

const createJsonBody = (data) => {
  return new Blob([JSON.stringify(data)]);
};

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

const createNetworkError = () => {
  const error = new Error(
    "Сервер временно недоступен. Проверьте подключение к интернету или попробуйте позже.",
  );

  error.response = {
    data: {
      message:
        "Сервер временно недоступен. Проверьте подключение к интернету или попробуйте позже.",
    },
    status: 0,
  };

  return error;
};

const parseResponse = async (response) => {
  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.error || data?.message || `Ошибка запроса: ${response.status}`;

    const error = new Error(message);

    error.response = {
      data,
      status: response.status,
    };

    throw error;
  }

  return data;
};

const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    return await parseResponse(response);
  } catch (err) {
    if (err instanceof TypeError) {
      throw createNetworkError();
    }

    throw err;
  }
};

export const getTasks = async () => {
  const data = await request(`${baseURL}/kanban`, {
    method: "GET",
    headers: getHeaders(),
  });

  return Array.isArray(data.tasks) ? data.tasks : [];
};

export const addTask = async (taskData) => {
  const data = await request(`${baseURL}/kanban`, {
    method: "POST",
    headers: getHeaders(),
    body: createJsonBody(taskData),
  });

  return Array.isArray(data.tasks) ? data.tasks : [];
};

export const updateTask = async (id, taskData) => {
  const data = await request(`${baseURL}/kanban/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: createJsonBody(taskData),
  });

  return data.tasks || data;
};

export const deleteTask = async (id) => {
  const data = await request(`${baseURL}/kanban/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return Array.isArray(data.tasks) ? data.tasks : [];
};
