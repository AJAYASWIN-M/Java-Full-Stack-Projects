import axios from "axios";

export const deleteTask = async (taskId, fetchTasks, setTasks) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}tasks/delete`, {
            params: { id: taskId },
        });
        fetchTasks(setTasks);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
