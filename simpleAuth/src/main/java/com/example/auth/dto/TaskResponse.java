package com.example.auth.dto;

import com.example.auth.model.Status;
import com.example.auth.model.Task;

public class TaskResponse {

    private Long id;
    private Status status;
    private String content;

    public static TaskResponse fromEntity(Task task) {
        TaskResponse response = new TaskResponse();
        response.setId(task.getId());
        response.setStatus(task.getStatus());
        response.setContent(task.getContent());
        return response;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
