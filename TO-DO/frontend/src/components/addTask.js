import axios from "axios";

export const addTask = async (taskName, setTaskName, fetchTasks, setTasks) => {
    if (!taskName.trim()) return;

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}tasks/add`, null, {
            params: { taskname: taskName },
        });
        setTaskName(""); // Clear input field
        fetchTasks(setTasks); // Refresh task list
    } catch (error) {
        console.error("Error adding task:", error);
    }
};
