import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { addTask, deleteTask, getTasks, updateTask } from "../services/tasks";

const TaskContext = createContext(null);

const getErrorMessage = (err, defaultMessage) => {
  if (typeof err?.response?.data === "string") {
    return err.response.data;
  }

  if (err?.response?.data?.message) {
    return err.response.data.message;
  }

  if (err?.response?.data?.error) {
    return err.response.data.error;
  }

  if (err?.message) {
    return err.message;
  }

  return defaultMessage;
};

export const TaskProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const hasLoadedRef = useRef(false);

  const setTasksLoaded = (value) => {
    hasLoadedRef.current = value;
    setHasLoaded(value);
  };

  const loadTasks = useCallback(async ({ force = false } = {}) => {
    if (hasLoadedRef.current && !force) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const tasks = await getTasks();

      setCards(tasks);
      setTasksLoaded(true);
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Не удалось загрузить задачи. Попробуйте снова.",
      );

      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    setError("");

    try {
      const tasks = await addTask(taskData);

      setCards(tasks);
      setTasksLoaded(true);

      return tasks;
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Не удалось создать задачу. Попробуйте снова.",
      );

      setError(message);
      throw err;
    }
  }, []);

  const editTask = useCallback(async (id, taskData) => {
    setError("");

    try {
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

      setTasksLoaded(true);

      return tasks;
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Не удалось сохранить задачу. Попробуйте снова.",
      );

      setError(message);
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id) => {
    setError("");

    try {
      const tasks = await deleteTask(id);

      setCards(tasks);
      setTasksLoaded(true);

      return tasks;
    } catch (err) {
      const message = getErrorMessage(
        err,
        "Не удалось удалить задачу. Попробуйте снова.",
      );

      setError(message);
      throw err;
    }
  }, []);

  const resetTasks = useCallback(() => {
    setCards([]);
    setError("");
    setIsLoading(false);
    setTasksLoaded(false);
  }, []);

  const value = useMemo(
    () => ({
      cards,
      isLoading,
      error,
      hasLoaded,
      loadTasks,
      createTask,
      editTask,
      removeTask,
      resetTasks,
    }),
    [
      cards,
      isLoading,
      error,
      hasLoaded,
      loadTasks,
      createTask,
      editTask,
      removeTask,
      resetTasks,
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
