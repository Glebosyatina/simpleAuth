package com.example.auth.repository;

import com.example.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//слой бд
//интерфейс репозитория через который взаимодействуем с persistent хранилищем
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
