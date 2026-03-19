package com.example.auth.service;

import com.example.auth.dto.TaskRequest;
import com.example.auth.dto.TaskResponse;
import com.example.auth.model.Task;
import com.example.auth.model.User;
import com.example.auth.repository.TaskRepository;
import com.example.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<TaskResponse> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId)
                .stream()
                .map(TaskResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse createTask(Long userId, TaskRequest request) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return null;
        }
        
        Task task = new Task();
        task.setUser(user.get());
        task.setStatus(request.getStatus());
        task.setContent(request.getContent());
        
        Task saved = taskRepository.save(task);
        return TaskResponse.fromEntity(saved);
    }

    @Override
    public TaskResponse updateTask(Long userId, Long taskId, TaskRequest request) {
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        if (taskOpt.isEmpty()) {
            return null;
        }
        
        Task task = taskOpt.get();
        if (!task.getUser().getId().equals(userId)) {
            return null;
        }
        
        task.setStatus(request.getStatus());
        task.setContent(request.getContent());
        
        Task updated = taskRepository.save(task);
        return TaskResponse.fromEntity(updated);
    }

    @Override
    public void deleteTask(Long userId, Long taskId) {
        Optional<Task> taskOpt = taskRepository.findById(taskId);
        if (taskOpt.isPresent() && taskOpt.get().getUser().getId().equals(userId)) {
            taskRepository.deleteById(taskId);
        }
    }

    @Override
    public Optional<TaskResponse> getTaskById(Long userId, Long taskId) {
        return taskRepository.findById(taskId)
                .filter(task -> task.getUser().getId().equals(userId))
                .map(TaskResponse::fromEntity);
    }
}