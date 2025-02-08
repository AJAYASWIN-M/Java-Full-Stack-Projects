package com;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/tasks")
public class TaskController  {
	
	@Autowired
	private TaskService taskService;
	
	@GetMapping("/get")
	public List<Task> getTasks() {
		return taskService.getAllTasks();
	}
	
	@PostMapping("/add")
    public Task addTask(@RequestParam String taskname) {
        Task task = new Task();
        task.setTaskname(taskname);
        return taskService.saveTask(task);
    }
	@PutMapping("/edit")
    public Task editTask(@RequestParam Long id, @RequestParam String newName) {
        return taskService.updateTask(id, newName);
    }
    
    @DeleteMapping("/delete")
    public String deleteTask(@RequestParam Long id) {
        taskService.deleteTask(id);
        return "Task deleted successfully";
    }
}

