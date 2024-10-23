package com.app.nomina.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.app.nomina.dao.ConceptosNominaDao;
import com.app.nomina.dao.RegistroMasivoVariablesDao;
import com.app.nomina.models.ctg_conceptosdenomina;
import com.app.nomina.models.ctg_lstcptosdenomina;
import com.app.nomina.models.ctg_lsttimbrado;
import org.springframework.web.multipart.MultipartFile;
import com.app.nomina.models.sn_cptosperiodosaplic;
import com.app.nomina.models.sn_periodosdepago;
import com.app.nomina.models.sp_clasificadordegasto;

@RestController
public class ConceptosNominaController {

	@Autowired
	private ConceptosNominaDao conceptosNominaDao;

	@GetMapping("api/persona/ObtenerConcepto")
public ResponseEntity<List<ctg_conceptosdenomina>> obtenerDatosXconcepto() {
    try {
        List<ctg_conceptosdenomina> conceptos = conceptosNominaDao.obtenerDatosXconcepto();
        return ResponseEntity.ok(conceptos); 
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Devuelve HTTP 500 Internal Server Error
    }
}



	@PostMapping("api/puestos/conceptos/datosXdesicion")
	public List<ctg_conceptosdenomina> obtenerDatosXGerenciaDatosPorContraconcepto(
			@RequestBody ctg_conceptosdenomina eleccion) {
		return conceptosNominaDao.obtenerDatosXGerenciaDatosPorContraconcepto(eleccion);
	}

	@PostMapping("api/puestos/conceptos/datosXaplic")
	public List<sn_cptosperiodosaplic> realizarSegundaConsulta(@RequestBody ctg_conceptosdenomina eleccion) {
		return conceptosNominaDao.realizarSegundaConsulta(eleccion);
	}

	@GetMapping("api/persona/Obtenerporperiodo")
	public List<sn_periodosdepago> obtenerDatosXperiodo() {
		return conceptosNominaDao.obtenerDatosXperiodo();
	}

	@GetMapping("api/persona/Obtenerporfecha")
	public List<sn_cptosperiodosaplic> obtenerDatosXfecha() {
		return conceptosNominaDao.obtenerDatosXfecha();
	}

	// @PostMapping("api/puestos/conceptos/datosXfecha")
	// public List<sn_cptosperiodosaplic> obtenerDatosXelecciondenomina(@RequestBody
	// sn_cptosperiodosaplic eleccion) {
	// return conceptosNominaDao.obtenerDatosXelecciondenomina(eleccion);
	// }

	@GetMapping("api/persona/ObtenerClasificacion")
	public List<ctg_lstcptosdenomina> obtenerDatosXclasificacion() {
		return conceptosNominaDao.obtenerDatosXclasificacion();
	}

	@GetMapping("api/persona/Obtenertipo")
	public List<ctg_lstcptosdenomina> obtenerDatosXtipo() {
		return conceptosNominaDao.obtenerDatosXtipo();
	}

	@GetMapping("api/persona/Obtenergrupoacum")
	public List<ctg_lstcptosdenomina> obtenerDatosXgrupoacum() {
		return conceptosNominaDao.obtenerDatosXgrupoacum();
	}

	@GetMapping("api/persona/Obtenergruposecu")
	public List<ctg_lstcptosdenomina> obtenerDatosXgruposecu() {
		return conceptosNominaDao.obtenerDatosXgruposecu();
	}

	@GetMapping("api/persona/Obtenertimbrado")
	public List<ctg_lsttimbrado> obtenerDatosXtimbrado() {
		return conceptosNominaDao.obtenerDatosXtimbrado();
	}

	@GetMapping("api/persona/Obtenerpartida")
	public List<sp_clasificadordegasto> obtenerDatosXpartida() {
		return conceptosNominaDao.obtenerDatosXpartida();
	}

	@GetMapping("api/persona/Obtenertipoimporte")
	public List<ctg_lstcptosdenomina> obtenerDatosXtipoimporte() {
		return conceptosNominaDao.obtenerDatosXtipoimporte();
	}

	@GetMapping("api/persona/Obtenerfactororigen")
	public List<ctg_lstcptosdenomina> obtenerDatosXfactororigen() {
		return conceptosNominaDao.obtenerDatosXfactororigen();
	}

	@GetMapping("api/persona/Obtenerorigenimporte")
	public List<ctg_lstcptosdenomina> obtenerDatosXorigenimporte() {
		return conceptosNominaDao.obtenerDatosXorigenimporte();
	}

	@GetMapping("api/persona/Obtenermodalidaddedeterminaciondeimporte")
	public List<ctg_lstcptosdenomina> obtenerDatosXmodalidaddedeterminaciondeimporte() {
		return conceptosNominaDao.obtenerDatosXmodalidaddedeterminaciondeimporte();
	}

	@GetMapping("api/persona/Obtenermodalidaddedeintegracionbasegravable")
	public List<ctg_lstcptosdenomina> obtenerDatosXmodalidaddeintegracionabasegravable() {
		return conceptosNominaDao.obtenerDatosXmodalidaddeintegracionabasegravable();
	}

	@GetMapping("api/obetner/gastoasignado")
	public List<ctg_lstcptosdenomina> obtenerGatoAsignado() {
		return conceptosNominaDao.obtenerGatoAsignado();
	}

	@GetMapping("api/obetner/CalcularsobreBase")
	public List<ctg_lstcptosdenomina> CalcularsobreBase() {
		return conceptosNominaDao.CalcularsobreBase();
	}

	@GetMapping("api/obetner/GravarSubsidio")
	public List<ctg_lstcptosdenomina> GravarSubsidio() {
		return conceptosNominaDao.GravarSubsidio();
	}

	@GetMapping("api/obetner/CalcularsobrebaseDos")
	public List<ctg_lstcptosdenomina> CalcularsobrebaseDos() {
		return conceptosNominaDao.CalcularsobrebaseDos();
	}

	@GetMapping("api/obetner/importeexcento")
	public List<ctg_lstcptosdenomina> importeexcento() {
		return conceptosNominaDao.importeexcento();
	}

	@GetMapping("api/obetner/GravarSubsidioDos")
	public List<ctg_lstcptosdenomina> GravarSubsidioDos() {
		return conceptosNominaDao.GravarSubsidioDos();
	}

	@GetMapping("api/obetner/Modalidad")
	public List<ctg_lstcptosdenomina> ObtenerModalidad() {
		return conceptosNominaDao.ObtenerModalidad();
	}

	@PostMapping("api/concepto/registrar")
	public ResponseEntity<String> registrarConcepto(@RequestBody ctg_conceptosdenomina concepto) {
		try {
			if (conceptosNominaDao.registrarConcepto(concepto)) {
				return ResponseEntity.ok("Concepto registrado correctamente.");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el concepto.");
			}
		} catch (Exception e) {
			// Aquí podrías realizar un manejo específico del error, como loggearlo o lanzar
			// una excepción personalizada.
			e.printStackTrace();
			throw new RuntimeException("Ocurrió un error al registrar el concepto: " + e.getMessage());
		}
	}


}









