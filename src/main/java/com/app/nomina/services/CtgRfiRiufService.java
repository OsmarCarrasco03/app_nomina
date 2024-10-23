package com.app.nomina.services;

import com.app.nomina.models.ctg_rfi_riuf;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CtgRfiRiufService {

    Logger logger = LoggerFactory.getLogger(CtgRfiRiufService.class);

    private final CtgRfiRiufRepository riufRepository;

   
    public CtgRfiRiufService(CtgRfiRiufRepository riufRepository) {
        this.riufRepository = riufRepository;
    }

   /* public List<String> getAllRiufData() {
        List<ctg_rfi_riuf> allRiufData = riufRepository.findAll();
        return allRiufData.stream()
                .map(ctg_rfi_riuf::getRiuf_riuf)
                .collect(Collectors.toList());
    }*/

    public List<String> getAllRiufData() {
        try {
            List<ctg_rfi_riuf> allRiufData = riufRepository.findAll();
            logger.info("Se obtivieron los datos corectos");
            return allRiufData.stream()
                    .map(ctg_rfi_riuf::getRiuf_riuf)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Algo salio mal" +e);
            return Collections.emptyList();
        }
    }
    
}
