package com.shopnexgen.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopnexgen.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long>{

}
