package com.app.nomina.controllers;

import com.app.nomina.models.ctg_centrodist;
import com.app.nomina.models.ctg_centrotrabajo;
import com.app.nomina.dao.ModalDao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController

public class modalController {

	@Autowired
	private ModalDao modalDao;

	Logger logger = LoggerFactory.getLogger(modalController.class);

	@GetMapping("api/persona/Obtenercentrotrabajo/")
	public List<ctg_centrotrabajo> obtenerDatosXcentrotrabajo() {
		return modalDao.obtenerDatosXcentrotrabajo();
	}

	@GetMapping("api/persona/Obtenerdistribucion/")
	public List<ctg_centrotrabajo> obtenerDatosXdistribucion() {
		return modalDao.obtenerDatosXdistribucion();
	}

	@PostMapping("api/personsaxctraTrabajo")
	public List<ctg_centrotrabajo> obtenerDatosXctratrabajo(@RequestBody ctg_centrotrabajo ctra_estado) {
		return modalDao.obtenerDatosXctratrabajo(ctra_estado);
	}

	@PostMapping("api/personsaxentrodistribucion")
	public List<ctg_centrodist> obtenerDatosXcentrodist(@RequestBody ctg_centrodist cdis_estado) {
		return modalDao.obtenerDatosXcentrodist(cdis_estado);
	}

}

