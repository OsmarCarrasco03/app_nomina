package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import com.app.nomina.dao.*;
import com.app.nomina.models.sn_plaza;
import com.app.nomina.models.sn_plazapersona;
import com.app.nomina.services.SnPlazaDataRepository;
import com.app.nomina.services.sn_plazapersonaRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("api/snplazapersona") // api/snplazapersona/idplaza/{pxp_idplaza}    api/snplazapersona/idpersona/{pxp_idplaza}
public class sn_plazapersonaController {

	Logger logger = LoggerFactory.getLogger(PlazaController.class);

	private final sn_plazapersonaDAO plazapersonaDAO;

	@Autowired
	private sn_plazapersonaRepository plazapersonaRepository;
	
	@Autowired
	private SnPlazaDataRepository PlazaDataRepository;

	public sn_plazapersonaController (sn_plazapersonaDAO plazapersonaDAO) {
		this.plazapersonaDAO = plazapersonaDAO;
	}

	@PostMapping("/idplaza/{pxp_idplaza}")
	public ResponseEntity<Object> getPlazaPersonaIdPlazaDetails(@PathVariable("pxp_idplaza") int pxp_idplaza) {
		try {
			List<sn_plazapersona> plazaPersonaDetails = plazapersonaDAO.queryUnoSnPlazaPersonaAllDatos(pxp_idplaza);
			if (plazaPersonaDetails.isEmpty()) {
				logger.info("No existen datos");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						Collections.singletonMap("message", "No existen datos para la plaza con número: " + pxp_idplaza));
			}
			logger.info("Los datos de la plaza se obtuvieron satisfatoriamente");
			return ResponseEntity.ok().body(Collections.singletonMap("data", plazaPersonaDetails));
		} catch (Exception e) {

			logger.error("Algo salio mal en la comunicación con el servidor" + e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", "Algo salió mal en la comunicación con el servidor"));
		}
	}

    @PostMapping("/idpersona/{pxp_idpersona}")
	public ResponseEntity<Object> getPlazaPersonaIdPersonaDetails(@PathVariable("pxp_idpersona") int pxp_idpersona) {
		try {
			List<sn_plazapersona> plazaPersonaDetails = plazapersonaDAO.queryDosSnPlazaPersonaAllDatos(pxp_idpersona);
			if (plazaPersonaDetails.isEmpty()) {
				logger.info("No existen datos");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						Collections.singletonMap("message", "No existen datos para la persona con número: " + pxp_idpersona));
			}
			logger.info("Los datos de la plaza se obtuvieron satisfatoriamente");
			return ResponseEntity.ok().body(Collections.singletonMap("data", plazaPersonaDetails));
		} catch (Exception e) {

			logger.error("Algo salio mal en la comunicación con el servidor" + e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", "Algo salió mal en la comunicación con el servidor"));
		}
	}

	@PostMapping("/subir/datos/modulo/asignarplazaporpersona") // api/snplazapersona/subir/datos/modulo/asignarplazaporpersona
	public String guardarDatosPlazaPersona(@RequestBody sn_plazapersona personaPlazaDatosJson) {

		try {

			int count = plazapersonaRepository.countPlazaPersona(personaPlazaDatosJson.getPxp_idpersona());
			sn_plaza datosToSave = PlazaDataRepository.findByIdPlaza(personaPlazaDatosJson.getPxp_idplaza());
			
			if (count >= 1) {
				logger.info("Se ejecuto el count com.app.nomina.controllers > sn_plazapersonaController");
				return "Advertencia: Ya existe un registro con dicha persona";
			}else if (datosToSave != null) {
				datosToSave.setPlz_estatusocup(1);
				PlazaDataRepository.save(datosToSave);
				logger.info("Se ejecuto el if = !null com.app.nomina.controllers > sn_plazapersonaController");	
			}



			sn_plazapersona personaPlazaToSave = new sn_plazapersona();

			personaPlazaToSave.setPxp_idplaza(personaPlazaDatosJson.getPxp_idplaza());
			personaPlazaToSave.setPxp_idpersona(personaPlazaDatosJson.getPxp_idpersona());
			personaPlazaToSave.setPxp_fechainicio(personaPlazaDatosJson.getPxp_fechainicio());
			personaPlazaToSave.setPxp_usucapturo(personaPlazaDatosJson.getPxp_usucapturo());
			personaPlazaToSave.setPxp_fechamod(personaPlazaDatosJson.getPxp_fechamod());
			personaPlazaToSave.setPxp_usumodifico(personaPlazaDatosJson.getPxp_usumodifico());
			personaPlazaToSave.setPxp_situacion(personaPlazaDatosJson.getPxp_situacion());
			personaPlazaToSave.setPxp_vigdesde(personaPlazaDatosJson.getPxp_vigdesde());
			personaPlazaToSave.setPxp_vighasta(personaPlazaDatosJson.getPxp_vighasta());

			plazapersonaRepository.save(personaPlazaToSave);

			logger.info("Se subieron los datos correctamente com.app.nomina.controllers > sn_plazapersonaController");
			return "Datos guardados correctamente";
		} catch (Exception e) {
			logger.error("Algo salio mal en com.app.nomina.controllers > sn_plazapersonaController: " + e.getMessage());
			return "Error al guardar los datos: " + e.getMessage();
		}
	}
	// FIN API para subir los datos de registrar domicilio
}