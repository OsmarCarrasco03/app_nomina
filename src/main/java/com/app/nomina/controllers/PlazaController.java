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
import com.app.nomina.models.ctg_lstpuesto;
import com.app.nomina.models.sn_plaza;
import com.app.nomina.services.SnPlazaDataRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("api/plaza") // api/plaza/{num_plaza}
public class PlazaController {

	Logger logger = LoggerFactory.getLogger(PlazaController.class);

	private final datosGralPlazaDAO datosGralPlazaDAO;
	@Autowired
	private SnPlazaDataRepository PlazaDataRepository;

	public PlazaController(datosGralPlazaDAO datosGralPlazaDAO) {
		this.datosGralPlazaDAO = datosGralPlazaDAO;
	}

	@PostMapping("/{num_plaza}")
	// public ResponseEntity<List<sn_plaza>>
	// getPlazaDetails(@PathVariable("num_plaza") int num_plaza) {
	public ResponseEntity<Object> getPlazaDetails(@PathVariable("num_plaza") int num_plaza) {
		try {
			List<sn_plaza> plazaDetails = datosGralPlazaDAO.consultaDatos(num_plaza);
			if (plazaDetails.isEmpty()) {
				logger.info("No existen datos");
				// return ResponseEntity.notFound().build();
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
						Collections.singletonMap("message", "No existen datos para la plaza con número: " + num_plaza));
			}
			logger.info("Los datos de la plaza se obtuvieron satisfatoriamente");
			// return ResponseEntity.ok(plazaDetails);
			return ResponseEntity.ok().body(Collections.singletonMap("data", plazaDetails));
		} catch (Exception e) {

			logger.error("Algo salio mal en la comunicación con el servidor" + e);
			// return
			// ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", "Algo salió mal en la comunicación con el servidor"));
		}
	}

	@GetMapping("/puestoAutorizado/{x}")
	public ResponseEntity<Object> getPuestoAutorizado(@PathVariable("x") int x) {
		try {
			List<ctg_lstpuesto> puestoDetails = datosGralPlazaDAO.consultaPtoAutoriz(x);

			if (puestoDetails.isEmpty()) {
				logger.info("No existen datos");
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(Collections.singletonMap("message", "No existen datos para la plaza con número: " + x));
			}
			logger.info("Los datos del puesto autorizado se obtuvieron satisfatoriamente");
			return ResponseEntity.ok().body(Collections.singletonMap("data", puestoDetails));
		} catch (Exception e) {
			logger.error("Algo salio mal en la comunicación con el servidor" + e);
			// return
			// ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", "Algo salió mal en la comunicación con el servidor"));

		}

	}

	@GetMapping("/puestoPagado/{y}")
	public ResponseEntity<Object> getPuestopagado(@PathVariable("y") int y) {
		try {
			List<ctg_lstpuesto> puestoDetails = datosGralPlazaDAO.consultaPtopagado(y);

			if (puestoDetails.isEmpty()) {
				logger.info("No existen datos");
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(Collections.singletonMap("message", "No existen datos para la plaza con número: " + y));
			}
			logger.info("Los datos del puesto pagado se obtuvieron satisfatoriamente");
			return ResponseEntity.ok().body(Collections.singletonMap("data", puestoDetails));
		} catch (Exception e) {
			logger.error("Algo salio mal en la comunicación con el servidor" + e);
			// return
			// ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Collections.singletonMap("error", "Algo salió mal en la comunicación con el servidor"));

		}

	}

	// INICIO API para modificar los datos en modificar plaza

	@PostMapping("modificar/subir/datos") // api/plaza/modificar/subir/datos
	public String subirPlazaASD(@RequestBody sn_plaza datosPlazaModificarJson) {
		try {

			sn_plaza datosToSave = PlazaDataRepository.findByIdPlaza(datosPlazaModificarJson.getPlz_numero());

			if (datosToSave != null) {

				datosToSave.setPlz_numero(datosPlazaModificarJson.getPlz_numero());
				datosToSave.setPlz_numplzpadre(datosPlazaModificarJson.getPlz_numplzpadre());
				datosToSave.setPlz_codintrhnet(datosPlazaModificarJson.getPlz_codintrhnet());
				datosToSave.setPlz_estatusocup(datosPlazaModificarJson.getPlz_estatusocup());
				datosToSave.setPlz_motoblidecpatri(datosPlazaModificarJson.getPlz_motoblidecpatri());
				datosToSave.setPlz_areas(datosPlazaModificarJson.getPlz_areas());
				datosToSave.setPlz_conpublicas(datosPlazaModificarJson.getPlz_conpublicas());
				datosToSave.setPlz_traclap(datosPlazaModificarJson.getPlz_traclap());
				datosToSave.setPlz_traebi(datosPlazaModificarJson.getPlz_traebi());
				datosToSave.setPlz_traemdmajr(datosPlazaModificarJson.getPlz_traemdmajr());
				datosToSave.setPlz_nivelequiv(datosPlazaModificarJson.getPlz_nivelequiv());
				datosToSave.setPlz_rfiriuf(datosPlazaModificarJson.getPlz_rfiriuf());
				datosToSave.setPlz_tiposervpublico(datosPlazaModificarJson.getPlz_tiposervpublico());
				datosToSave.setPlz_unidad(datosPlazaModificarJson.getPlz_unidad());
				datosToSave.setPlz_centrodist(datosPlazaModificarJson.getPlz_centrodist());
				datosToSave.setPlz_centrotrabajo(datosPlazaModificarJson.getPlz_centrotrabajo());
				datosToSave.setPlz_ptoautorizado(datosPlazaModificarJson.getPlz_ptoautorizado());
				datosToSave.setPlz_ptopagado(datosPlazaModificarJson.getPlz_ptopagado());
				
				datosToSave.setPlz_fechatermino(datosPlazaModificarJson.getPlz_fechatermino());
				datosToSave.setPlz_fechamod(datosPlazaModificarJson.getPlz_fechamod());
				datosToSave.setPlz_usumodifico(datosPlazaModificarJson.getPlz_usumodifico());
				datosToSave.setPlz_situacion(datosPlazaModificarJson.getPlz_situacion());
				
				PlazaDataRepository.save(datosToSave);
			}

			logger.info("Datos nuevos guardados correctamente");
			return "Datos nuevos guardados correctamente";
		} catch (Exception e) {
			logger.error("Error al guardar o actualizar datos: " + e.getMessage());
			return "Error al guardar o actualizar datos: " + e.getMessage();
		}
	}

	// FIN API para modificar los datos en modificar plaza

}
