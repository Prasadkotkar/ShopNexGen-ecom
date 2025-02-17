package com.shopnexgen.service;

import com.shopnexgen.model.Home;
import com.shopnexgen.model.HomeCategory;
import java.util.List;

public interface HomeService {

    Home creatHomePageData(List<HomeCategory> categories);

}
