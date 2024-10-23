package com.app.nomina.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

@Service
public class sn_periodosdepagoService {
    Logger logger = LoggerFactory.getLogger(sn_periodosdepagoService.class);

    private final sn_periodosdepagoRepository periodosdepagoRepository;

    @Autowired
    public sn_periodosdepagoService(sn_periodosdepagoRepository periodosdepagoRepository) {
        this.periodosdepagoRepository = periodosdepagoRepository;
    }

    public List<Object[]> getAllQueryUnoSnPeriodosP() {
       try {
           logger.info("*** *** SERVICE SN PERIODOS DE PAGO*** ***");
           return periodosdepagoRepository.queryUnoSnPeriodosP();
       } catch (Exception e) {
           logger.error("Error en: sn_periodosdepagoService.getAllQueryUnoSnPeriodosP", e.getMessage());
           return new ArrayList<>();           
       }
    }

    @Transactional
    public void cambiarDatosParaAño(BigDecimal pp_ejercicio, BigDecimal pp_quincena, LocalDate pp_fechacierre, Integer pp_usucerro, LocalDate pp_fechamod, Integer pp_usumodifico) {
        periodosdepagoRepository.cambiarDatosParaAño(pp_ejercicio,pp_quincena,pp_fechacierre,pp_usucerro,pp_fechamod,pp_usumodifico);
    }
}

