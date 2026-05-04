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
        : data?.error || data?.message || `HTTP ${response.status}`;

    const error = new Error(message);

    error.response = {
      data,
      status: response.status,
    };

    throw error;
  }

  return data;
};

export const getTasks = async () => {
  const response = await fetch(`${baseURL}/kanban`, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await parseResponse(response);

  return data.tasks;
};

export const addTask = async (taskData) => {
  const response = await fetch(`${baseURL}/kanban`, {
    method: "POST",
    headers: getHeaders(),
    body: createJsonBody(taskData),
  });

  const data = await parseResponse(response);

  return data.tasks;
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${baseURL}/kanban/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: createJsonBody(taskData),
  });

  const data = await parseResponse(response);

  return data.tasks || data;
};

export const deleteTask = async (id) => {
  const response = await fetch(`${baseURL}/kanban/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  const data = await parseResponse(response);

  return data.tasks;
};
