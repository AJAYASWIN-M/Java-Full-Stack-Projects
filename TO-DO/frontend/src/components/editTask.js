import axios from "axios";

export const editTask = async (taskId, newName, setEditId, setEditName, fetchTasks, setTasks) => {
    if (!newName.trim()) return;

    try {
        await axios.put(`${process.env.REACT_APP_API_URL}tasks/edit`, null, {
            params: { id: taskId, newName: newName },
        });
        setEditId(null);
        setEditName("");
        fetchTasks(setTasks);
    } catch (error) {
        console.error("Error updating task:", error);
    }
};
