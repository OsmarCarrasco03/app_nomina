package com.app.nomina.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class sn_dompersonaService {
	Logger logger = LoggerFactory.getLogger(sn_dompersonaService.class);

	private final sn_dompersonaRepository dompersonaRepository;

	@Autowired
	public sn_dompersonaService(sn_dompersonaRepository dompersonaRepository) {
		this.dompersonaRepository = dompersonaRepository;
	}

	public List<Object[]> getAllQueryUnoSnDompersona() {
		try {
			logger.info("Se ejecuto el getAllQueryUnoSnDompersona en com.app.nomina.dao > sn_dompersonaService");
			return dompersonaRepository.queryUnoSnDompersona();
		} catch (Exception e) {
			logger.error("Error en: sn_dompersonaService.getAllQueryUnoSnDompersona", e.getMessage());
			return new ArrayList<>();
		}
	}

}