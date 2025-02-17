package com.shopnexgen.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String token;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    private User user;
    private Date expireDate;
    private boolean isExpired(){
        return expireDate.before(new Date());
    }
}
