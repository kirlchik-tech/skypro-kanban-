const baseURL = "https://wedev-api.sky.pro/api";

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

    throw new Error(message);
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
    body: JSON.stringify(taskData),
  });

  const data = await parseResponse(response);

  return data.tasks;
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${baseURL}/kanban/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(taskData),
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
