package com.shopnexgen.service.impl;

import com.shopnexgen.model.Seller;
import com.shopnexgen.model.SellerReport;
import com.shopnexgen.repository.SellerReportRepository;
import com.shopnexgen.service.SellerReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerReportServiceImpl implements SellerReportService {

    private final SellerReportRepository sellerReportRepository;


    @Override
    public SellerReport getSellerReport(Seller seller) {
        SellerReport report = sellerReportRepository.findBySellerId(seller.getId());
        if(report == null){
            SellerReport newReport = new SellerReport();
            newReport.setSeller(seller);

            return  sellerReportRepository.save(newReport);
        }
        return report;
    }
    @Override
    public SellerReport updateSellerReport(SellerReport sellerReport) {

        return sellerReportRepository.save(sellerReport);
    }

}
