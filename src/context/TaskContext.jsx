import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/tasks";

const TaskContext = createContext(null);

const getTaskErrorMessage = (err) => {
  if (typeof err?.response?.data === "string") {
    return err.response.data;
  }

  if (err?.response?.data?.error) {
    return err.response.data.error;
  }

  if (err?.response?.data?.message) {
    return err.response.data.message;
  }

  if (err?.message) {
    return err.message;
  }

  return "Не удалось выполнить действие с задачами. Попробуйте позже.";
};

export const TaskProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const tasks = await getTasks();

      setCards(Array.isArray(tasks) ? tasks : []);

      return tasks;
    } catch (err) {
      setError(getTaskErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    const tasks = await addTask(taskData);

    setCards(Array.isArray(tasks) ? tasks : []);

    return tasks;
  }, []);

  const editTask = useCallback(async (id, taskData) => {
    const tasks = await updateTask(id, taskData);

    if (Array.isArray(tasks)) {
      setCards(tasks);
    } else {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card._id === id ? { ...card, ...taskData } : card,
        ),
      );
    }

    return tasks;
  }, []);

  const removeTask = useCallback(async (id) => {
    const tasks = await deleteTask(id);

    if (Array.isArray(tasks)) {
      setCards(tasks);
    } else {
      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    }

    return tasks;
  }, []);

  const clearTasks = useCallback(() => {
    setCards([]);
    setError("");
  }, []);

  const value = useMemo(
    () => ({
      cards,
      setCards,
      isLoading,
      error,
      loadTasks,
      createTask,
      editTask,
      removeTask,
      clearTasks,
    }),
    [
      cards,
      isLoading,
      error,
      loadTasks,
      createTask,
      editTask,
      removeTask,
      clearTasks,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks должен использоваться внутри TaskProvider");
  }

  return context;
};
