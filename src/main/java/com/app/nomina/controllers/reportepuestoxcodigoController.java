package com.app.nomina.controllers;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.app.nomina.dao.ReportepuestoxcodigoDao;
import com.app.nomina.models.ctg_lstpuesto;
import com.app.nomina.models.ctg_puesto;


@RestController
public class reportepuestoxcodigoController {

	@Autowired
	ReportepuestoxcodigoDao reportepuestoxcodigoDao;
	Logger logger = LoggerFactory.getLogger(reportepuestoxcodigoController.class);

	// // TRAER SELECT DEL TIPO DE PUESTO BASE/CONFIANZA
	@GetMapping("api/puesto/tipo/codigo")
	public List<ctg_lstpuesto> obtenerTipoPuestoreporte() {
		return reportepuestoxcodigoDao.obtenerTipoPuestoreporte();

	}

	@GetMapping("api/puesto/codigo/codigo")
	public List<ctg_puesto> obtenerCodigos() {
		return reportepuestoxcodigoDao.obtenerCodigos();

	}

	@GetMapping("api/puesto/situacion/codigo")
	public List<ctg_lstpuesto> obtenerSituPuestoReporte() {
		return reportepuestoxcodigoDao.obtenerSituPuestoReporte();

	}

	@PostMapping("api/puestos/consulta/puestoxcodigo")
	public List<ctg_puesto> obtenerDatosctgReporte(@RequestBody ctg_puesto eleccion) {
		return reportepuestoxcodigoDao.obtenerDatosctgReporte(eleccion);
	}

}