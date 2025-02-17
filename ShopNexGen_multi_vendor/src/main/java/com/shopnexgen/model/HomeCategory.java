package com.shopnexgen.model;

import com.shopnexgen.model.enums.HomeCategorySection;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HomeCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long  id;
    private String name;
    private String image;
    private String categoryId;
    private HomeCategorySection section;
}
