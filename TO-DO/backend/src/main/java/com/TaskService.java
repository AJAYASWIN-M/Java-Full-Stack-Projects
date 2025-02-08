package com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }
    
    public Task updateTask(Long id, String newName) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTaskname(newName);
            return taskRepository.save(task);
        }
        throw new RuntimeException("Task not found");
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
