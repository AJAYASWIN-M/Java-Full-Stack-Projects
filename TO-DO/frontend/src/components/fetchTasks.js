import axios from "axios";

export const fetchTasks = async (setTasks) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}tasks/get`);

        setTasks(response.data);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};
