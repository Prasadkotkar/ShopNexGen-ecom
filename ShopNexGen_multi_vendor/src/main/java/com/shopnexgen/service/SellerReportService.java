package com.shopnexgen.service;

import com.shopnexgen.model.Seller;
import com.shopnexgen.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport( SellerReport sellerReport);

}
