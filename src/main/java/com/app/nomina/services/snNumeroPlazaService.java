package com.app.nomina.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.app.nomina.models.sn_plaza;

@Service
public class snNumeroPlazaService {

    Logger logger = LoggerFactory.getLogger(snNumeroPlazaService.class);

    private final snNumeroPlazaRpository SnNumeroPlazaRpository;


    public snNumeroPlazaService(snNumeroPlazaRpository SnNumeroPlazaRpository) {
        this.SnNumeroPlazaRpository = SnNumeroPlazaRpository;
    }

     public List<Integer> getAllNumeroPlazaData() {
        try {
            List<sn_plaza> allNumeroPlazaData = SnNumeroPlazaRpository.findAll();
            logger.info("Se obtivieron los datos corectos");
            return allNumeroPlazaData.stream()
                    .map(sn_plaza::getPlz_numero)                    
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Algo salio mal: " +e);
            return Collections.emptyList();
        }
    } 

    public List<Object[]> getNumeroIdPlaza() {
        try {
            logger.info("Se obtivieron los datos corectos");
            return SnNumeroPlazaRpository.numeroIdPlaza();
        } catch (Exception e) {
            logger.error("Error en: snNumeroPlazaService.getNumeroIdPlaza", e.getMessage());
            return new ArrayList<>();           
        }
     }

}
