package com.app.nomina.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class sn_ctabancperService {
    Logger logger = LoggerFactory.getLogger(sn_ctabancperService.class);

     private final sn_ctabancperRepository ctabancperRepository;

     @Autowired
     public sn_ctabancperService(sn_ctabancperRepository ctabancperRepository) {
         this.ctabancperRepository = ctabancperRepository;
     }

     public List<Object[]> getAllQueryUnoCtaBancPersona() {
        try {
            logger.info("*** *** SERVICE CTA BANC PERSONA *** ***");
            return ctabancperRepository.queryUnoCtaBancPersona();
        } catch (Exception e) {
            logger.error("Error en: sn_ctabancperService.getAllQueryUnoCtaBancPersona", e.getMessage());
            return new ArrayList<>();           
        }
     }
}
