package com.example.auth.service;

import com.example.auth.dto.TaskRequest;
import com.example.auth.dto.TaskResponse;
import com.example.auth.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<TaskResponse> getTasksByUserId(Long userId);
    TaskResponse createTask(Long userId, TaskRequest request);
    TaskResponse updateTask(Long userId, Long taskId, TaskRequest request);
    void deleteTask(Long userId, Long taskId);
    Optional<TaskResponse> getTaskById(Long userId, Long taskId);
}