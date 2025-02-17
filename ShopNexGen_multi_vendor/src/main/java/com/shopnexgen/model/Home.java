package com.shopnexgen.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

//@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Home {
    private List<HomeCategory> grid;
    private List<HomeCategory> shopByCategories;
    private List<HomeCategory> electricCategories;
    private List<HomeCategory> dealCategories;
    private List<Deal> deals;
}
