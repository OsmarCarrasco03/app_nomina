package com.app.nomina.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.app.nomina.dao.PersonaDao;
import com.app.nomina.models.ctg_escolaridad;
import com.app.nomina.models.ctg_estado;
import com.app.nomina.models.ctg_idioma;
import com.app.nomina.models.ctg_lstpersona;
import com.app.nomina.models.ctg_municipio;
import com.app.nomina.models.sn_persona;

@RestController
public class PersonaController {

	@Autowired
	private PersonaDao personaDao;

	@PostMapping("api/personas/registrar")
	public ResponseEntity<String> registrarPersona(@RequestBody sn_persona persona) {
		try {
			boolean curpExistente = personaDao.curpExiste(persona.getPer_curp());
			boolean rfcHomoclaveExistente = personaDao
					.rfcHomoclaveExiste(persona.getPer_rfc() + persona.getPer_homoclave());
			boolean EmpleadoExistente = personaDao.EmpleadoExiste(persona.getPer_numempleado());
			if (curpExistente) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CURPExistente");
			}

			if (rfcHomoclaveExistente) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("RFCExistente");
			}

			if (EmpleadoExistente) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("EmpleadoExistente");
			}

			if (personaDao.registrarPersona(persona)) {
				return ResponseEntity.ok("OK");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar la persona.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Ocurrió un error al obtener un registro de persona.");
		}
	}

	@PostMapping("api/persona/consulta/datosXGerencia")
	public ResponseEntity<?> consultaDatosXGerencia(@RequestBody sn_persona curp) {
		try {
			List<sn_persona> datos = personaDao.obtenerDatosXGerencia(curp);

			return ResponseEntity.ok(datos);
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Ocurrió un error al obtener los datos por gerencia.");
		}
	}

	@GetMapping("api/snpersona/consulta/personaXTabla")
	public ResponseEntity<?> obtenerDatosXTabla() {
		try {
			List<Object[]> datos = personaDao.obtenerDatosXTabla();

			return ResponseEntity.ok(datos);
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Ocurrió un error al obtener persona por tabla.");
		}
	}

	@PostMapping("api/personsaXcurp")
	public ResponseEntity<Boolean> curpExiste(@RequestBody String curp) {
		try {
			boolean existe = personaDao.curpExiste(curp);
			return ResponseEntity.ok(existe);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}

	@PostMapping("api/personsaXRfcHomoclave")
	public ResponseEntity<Boolean> rfcHomoclaveExiste(@RequestBody String rfcHomoclave) {
		try {
			boolean existe = personaDao.rfcHomoclaveExiste(rfcHomoclave);
			return ResponseEntity.ok(existe);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}

	@GetMapping("api/persona/Obtenergenero/")
	public ResponseEntity<List<ctg_lstpersona>> obtenerDatosXgenero() {
		try {
			List<ctg_lstpersona> datos = personaDao.obtenerDatosXgenero();
			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("api/persona/Obteneredocivil/")
	public ResponseEntity<List<ctg_lstpersona>> obtenerDatosXedocivil() {
		try {
			List<ctg_lstpersona> datos = personaDao.obtenerDatosXedocivil();
			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("api/persona/Obtenerdiscapacidad/")
	public ResponseEntity<List<ctg_lstpersona>> obtenerDatosXdiscapacidad() {
		try {
			List<ctg_lstpersona> datos = personaDao.obtenerDatosXdiscapacidad();

			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}


	@GetMapping("api/persona/Obteneridioma/")
	public ResponseEntity<List<ctg_idioma>> obtenerDatosXidioma() {
		try {
			List<ctg_idioma> datos = personaDao.obtenerDatosXidioma();
			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}


	@GetMapping("api/persona/Obtenerescolaridad/")
	public ResponseEntity<List<ctg_escolaridad>> obtenerDatosXescolaridad() {
		try {
			List<ctg_escolaridad> datos = personaDao.obtenerDatosXescolaridad();
			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("api/persona/Obtenerestado/")
	public ResponseEntity<List<ctg_estado>> obtenerDatosXestado() {
		try {
			List<ctg_estado> datos = personaDao.obtenerDatosXestado();
			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("api/persona/Obtenermunicipio/")
	public ResponseEntity<List<ctg_municipio>> obtenerDatosXmunicipio() {
		try {
			List<ctg_municipio> datos = personaDao.obtenerDatosXmunicipio();
			return ResponseEntity.ok(datos);
		} catch (Exception e) { 
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}



	@GetMapping("api/persona/Obtenernacionalidad/")
	public ResponseEntity<List<ctg_lstpersona>> obtenerDatosXnacionalidad() {
		try {
			List<ctg_lstpersona> datos = personaDao.obtenerDatosXnacionalidad();
			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("api/persona/Obtenersituacion/")
	public ResponseEntity<List<ctg_lstpersona>> obtenerDatosXsituacion() {
		try {
			List<ctg_lstpersona> datos = personaDao.obtenerDatosXsituacion();
			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("api/persona/Obtenerisste/")
	public ResponseEntity<List<ctg_lstpersona>> obtenerDatosXissste() {
		try {
			List<ctg_lstpersona> datos = personaDao.obtenerDatosXissste();
			return ResponseEntity.ok(datos);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("api/personas/actualizar")
	public ResponseEntity<String> actualizarDatos(@RequestBody sn_persona persona) {
		if (personaDao.actualizarDatos(persona)) {
			return ResponseEntity.ok("OK");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la persona.");
		}
	}

	@PostMapping("api/puestos/consulta/datosXeleccion")
	public ResponseEntity<List<sn_persona>> obtenerDatosXeleccion(@RequestBody sn_persona eleccion) {
		try {
			List<sn_persona> datos = personaDao.obtenerDatosXeleccion(eleccion);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON_UTF8); // Establecer la codificación UTF-8
			return new ResponseEntity<>(datos, headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	

}
