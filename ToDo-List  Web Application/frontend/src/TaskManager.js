import React, { useState, useEffect } from "react";
import { fetchTasks } from "./components/fetchTasks";
import { addTask } from "./components/addTask";
import { editTask } from "./components/editTask";
import { deleteTask } from "./components/deleteTask";

import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.02)',
                    },
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                },
            },
        },
    },
});

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [completedTasks, setCompletedTasks] = useState({});

    useEffect(() => {
        fetchTasks(setTasks);
    }, []);

    const toggleTaskCompletion = (taskId) => {
        setCompletedTasks((prev) => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId, fetchTasks, setTasks);
        if (editId === taskId) {
            setEditId(null);
            setEditName("");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ 
                minHeight: '100vh',
                bgcolor: 'background.default',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}>
                <AppBar position="static" sx={{ 
                    background: 'primary.main',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                }}>
                    <Toolbar sx={{ justifyContent: "center" }}>
                        <Typography variant="h4" sx={{ 
                            color: 'white',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px'
                        }}>
                            TO-DO TASK
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5, pb: 5 }}>
                    <Paper elevation={3} sx={{ 
                        p: 3, 
                        mb: 3,
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.9)',
                    }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Enter task name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    }
                                }}
                            />
                            <Button 
                                variant="contained" 
                                onClick={() => addTask(taskName, setTaskName, fetchTasks, setTasks)}
                                sx={{ px: 4 }}
                            >
                                Add
                            </Button>
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{ 
                        p: 3,
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.9)',
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Tasks
                        </Typography>
                        <Box component="ul" sx={{ 
    listStyle: "none", 
    p: 0,
    '& > li': {
        transition: 'all 0.3s ease',
        borderRadius: '8px', // Keep rounded corners for better UI
        padding: '8px', // Add spacing for better visibility
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Darker hover effect
            transform: 'translateX(4px)',
            transition: 'all 0.3s ease-in-out'
        }
    }
}}>

                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <Box
                                        component="li"
                                        key={task.id}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            p: 1,
                                             borderRadius: '8px',
                                            mb: 1
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                            <Checkbox
                                                checked={!!completedTasks[task.id]}
                                                onChange={() => toggleTaskCompletion(task.id)}
                                                sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                                            />
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    textDecoration: completedTasks[task.id] ? "line-through" : "none",
                                                    color: completedTasks[task.id] ? 'text.disabled' : 'text.primary',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {task.taskname}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton 
                                                onClick={() => handleDeleteTask(task.id)}
                                                sx={{ 
                                                    '&:hover': { 
                                                        color: 'error.main',
                                                        transform: 'scale(1.1)' 
                                                    } 
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <Fab 
                                                color="primary" 
                                                size="small" 
                                                onClick={() => { 
                                                    setEditId(task.id); 
                                                    setEditName(task.taskname); 
                                                }}
                                            >
                                                <EditIcon />
                                            </Fab>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary" sx={{ py: 3 }}>
                                    No tasks available
                                </Typography>
                            )}
                        </Box>
                    </Paper>

                    {editId && (
                        <Paper elevation={3} sx={{ 
                            p: 3, 
                            mt: 3,
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.9)',
                        }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Edit task name"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    size="small"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        }
                                    }}
                                />
                                <Button 
                                    variant="contained" 
                                    onClick={() => {
                                        editTask(editId, editName, setEditId, setEditName, fetchTasks, setTasks);
                                    }}
                                    sx={{ px: 4 }}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Paper>
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    );
};



export default TaskManager;