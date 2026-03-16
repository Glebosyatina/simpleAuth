package com.example.auth.service;

import com.example.auth.model.User;

//слой бизнес логики
public interface UserService {
    User findByEmail(String email);
    User saveUser(User user);
}
