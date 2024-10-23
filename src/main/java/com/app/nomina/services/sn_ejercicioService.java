package com.app.nomina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

 @Service
 public class sn_ejercicioService {

    Logger logger = LoggerFactory.getLogger(sn_ejercicioService.class);

     private final sn_ejercicioRepository ejercicioRepository;

     @Autowired
     public sn_ejercicioService(sn_ejercicioRepository ejercicioRepository) {
         this.ejercicioRepository = ejercicioRepository;
     }

     public List<Object[]> getAllQueryUnoSnEjercicio() {
        try {
            logger.info("Se ejecuto el getAllQueryUnoSnEjercicio en com.app.nomina.dao > sn_ejercicioService");
            return ejercicioRepository.queryUnoSnEjercicio();
        } catch (Exception e) {
            logger.error("Error en: sn_ejercicioService.getAllQueryUnoSnEjercicio", e.getMessage());
            return new ArrayList<>();           
        }
     }

     public List<Object[]> getAllQueryDosSnEjercicio() {
        try {
            logger.info("Se ejecuto el getAllQueryDosSnEjercicio en com.app.nomina.dao > sn_ejercicioService");
            return ejercicioRepository.queryDosSnEjercicio();
        } catch (Exception e) {
            logger.error("Error en: sn_ejercicioService.getAllQueryUnoSnEjercicio", e.getMessage());
            return new ArrayList<>();           
        }
     }
 }

 