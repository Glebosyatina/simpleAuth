package com.example.auth.dto;

import com.example.auth.model.Status;

public class TaskRequest {

    private Status status;
    private String content;

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
