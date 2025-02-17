package com.shopnexgen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopnexgen.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	public User findByEmail(String username);
}
