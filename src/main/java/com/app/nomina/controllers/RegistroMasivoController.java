
package com.app.nomina.controllers;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.parser.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.RegistroMasivoVariablesDao;
import com.app.nomina.dao.RegistroMasivoVariablesImp;
import com.app.nomina.models.ctg_lstcptosdenomina;
import com.app.nomina.models.ctg_lstpersona;
import com.app.nomina.models.sn_convar_paso_2;
import com.app.nomina.models.sn_convar_paso_3;

import org.springframework.web.multipart.MultipartFile;


@RestController
public class RegistroMasivoController {
   EntityManager entityManager;

      Logger logger = LoggerFactory.getLogger(RegistroMasivoVariablesImp.class);
	@Autowired
	private RegistroMasivoVariablesDao registroMasivoVariablesDao;
	@PostMapping("uploadCSV/concepto")
	public ResponseEntity<String> uploadCSV(@RequestParam("file") MultipartFile file, 
											@RequestParam("axoproceso") String axoproceso,
											@RequestParam("perproceso") String perproceso,
											@RequestParam("Fechainicio") Date Fechainicio,
											@RequestParam("UsuCapturo") int UsuCapturo,
											@RequestParam("Fechamod") Date Fechamod,
											@RequestParam("UsuModifico") int UsuModifico,
											@RequestParam("Situacion") int Situacion,
											@RequestParam("Estatus") int Estatus){   
		if (file.isEmpty()) {
			return new ResponseEntity<>("Por favor, seleccione un archivo CSV.", HttpStatus.BAD_REQUEST);
		}
	
		try {
			// Llama al método en tu implementación para registrar personas con el CSV
			boolean result = registroMasivoVariablesDao.registrarPersonaconCSVmasivo(file, axoproceso, perproceso, Fechainicio, UsuCapturo, Fechamod, UsuModifico, Situacion, Estatus );
			
			// Verifica si el resultado es exitoso
			if (result) {
				return new ResponseEntity<>("Archivo CSV procesado con éxito.", HttpStatus.OK);
			} else {
				// Si no es exitoso, devuelve un mensaje indicando que uno o más CURPs no existen en la tabla sn_persona
				return new ResponseEntity<>("Error: Uno o más CURPs no existen en la tabla sn_persona. Se omitirá la inserción.", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			// Manejo de otras excepciones
			return new ResponseEntity<>("Error al procesar el archivo CSV: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

    @SuppressWarnings("null")
    @GetMapping("api/persona/Obtener/")
    public ResponseEntity<List<Object[]>> obtenerDatosXdatosmasivos() {
        try {
            List<Object[]> datos = registroMasivoVariablesDao.obtenerDatosXdatosmasivos();
            List<Object[]> datosConValidacion = new ArrayList<>();
    
            for (Object[] dato : datos) {
                String errorConcatenado = "";
    
                // Validar el CURP
                String curp = (String) dato[0];
                ResponseEntity<Boolean> curpValidaResponse = curpExistecargaMasiva(curp);
                boolean curpExiste;
    
                if (curpValidaResponse.getStatusCode() == HttpStatus.OK) {
                    curpExiste = curpValidaResponse.getBody();
                    if (!curpExiste) {
                        errorConcatenado += "El CURP " + curp + " no existe en la base de datos del sistema | ";
                    }
                } else {
                    curpExiste = false; // Manejar el error si la validación de CURP no puede realizarse
                    errorConcatenado += "El CURP " + curp + " no existe en la base de datos del sistema | ";
                }
    
                // Validar la temporalidad
                BigDecimal temporalidad = (BigDecimal) dato[1];
                ResponseEntity<Boolean> temporalidadValidaResponse = temporalidadExistecargaMasiva(temporalidad);
                boolean temporalidadValida;
    
                if (temporalidadValidaResponse.getStatusCode() == HttpStatus.OK) {
                    temporalidadValida = temporalidadValidaResponse.getBody();
                    if (!temporalidadValida) {
                        errorConcatenado += "La temporalidad debe de ser 1 o 2 | ";
                    }
                } else {
                    temporalidadValida = false; // Manejar el error si la validación de temporalidad no puede realizarse
                    errorConcatenado += "La temporalidad debe de ser 1 o 2 | ";
                }
    
                // Validar el concepto y el tipo
                String concepto = (String) dato[3];
                BigDecimal tipo = (BigDecimal) dato[2];
                ResponseEntity<Boolean> conceptoExistenteResponseEntity = conceptoExistecargaMasiva(concepto, tipo);
                boolean conceptoExistente;
    
                if (conceptoExistenteResponseEntity.getStatusCode() == HttpStatus.OK) {
                    conceptoExistente = conceptoExistenteResponseEntity.getBody();
                    if (!conceptoExistente) {
                        errorConcatenado += "El concepto y el tipo de concepto no coinciden | ";
                    }
                } else {
                    conceptoExistente = false; // Manejar el error si la validación de concepto no puede realizarse
                    errorConcatenado += "El concepto y el tipo de concepto no coinciden | ";
                }
    
                // Validar la existencia del factor
                BigDecimal factor = (BigDecimal) dato[6];
                ResponseEntity<Boolean> factorExisteResponse = factorExistecargaMasiva(factor);
                boolean factorExiste;
    
                if (factorExisteResponse.getStatusCode() == HttpStatus.OK) {
                    factorExiste = factorExisteResponse.getBody();
                    if (!factorExiste) {
                        errorConcatenado += "El factor debe de ser 1, 2 o 3 | ";
                    }
                } else {
                    factorExiste = false; // Manejar el error si la validación del factor no puede realizarse
                    errorConcatenado += "El factor debe de ser 1, 2 o 3 | ";
                }
    
                // Validar la existencia de la nómina
                BigDecimal nomina = (BigDecimal) dato[10];
                ResponseEntity<Boolean> nominaValidaResponse = nominaExistecargaMasiva(nomina);
                boolean nominaExiste;
    
                if (nominaValidaResponse.getStatusCode() == HttpStatus.OK) {
                    nominaExiste = nominaValidaResponse.getBody();
                    if (!nominaExiste) {
                        errorConcatenado += "La nómina no está activa en este periodo | ";
                    }
                } else {
                    nominaExiste = false; // Manejar el error si la validación de la nómina no puede realizarse
                    errorConcatenado += "La nómina no está activa en este periodo | ";
                }
    
                // Variable para representar el estatus
                int estatus = (curpExiste && temporalidadValida && conceptoExistente && factorExiste && nominaExiste) ? 3 : 2;
    
                // Crear un nuevo arreglo que contenga los datos masivos, el estatus y el mensaje de error concatenado
                Object[] datoConValidacion = new Object[dato.length + 2]; // Agregar 2 para las nuevas variables (mensaje de error y estatus)
                System.arraycopy(dato, 0, datoConValidacion, 0, dato.length); // Copiar los datos masivos
                datoConValidacion[dato.length] = errorConcatenado; // Agregar el mensaje de error concatenado
                datoConValidacion[dato.length + 1] = estatus; // Agregar el estatus
    
                datosConValidacion.add(datoConValidacion);
            }
    
            return ResponseEntity.ok(datosConValidacion);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
           
          


@PostMapping("api/cargaMasivacurp")
public ResponseEntity<Boolean> curpExistecargaMasiva(@RequestBody String curp) {
	try {
		boolean existe = registroMasivoVariablesDao.curpExistecargaMasiva(curp);
		return ResponseEntity.ok(existe);
	} catch (Exception e) {
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
	}
}


@PostMapping("api/cargaMasivatemporalidad")
public ResponseEntity<Boolean> temporalidadExistecargaMasiva(@RequestBody BigDecimal temporalidad) {
    try {
        boolean existe = registroMasivoVariablesDao.temporalidadExistecargaMasiva(temporalidad);
        return ResponseEntity.ok(existe);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    }
}


@PostMapping("api/cargaMasivafactor")
public ResponseEntity<Boolean> factorExistecargaMasiva(@RequestBody BigDecimal factor) {
    try {
        boolean existe = registroMasivoVariablesDao.temporalidadExistecargaMasiva(factor);
        return ResponseEntity.ok(existe);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    }
}

@PostMapping("api/cargaMasivaConceptotipo")
public ResponseEntity<Boolean> conceptoExistecargaMasiva(@RequestBody String concepto, BigDecimal tipo) {
    try {
        boolean existe = registroMasivoVariablesDao.conceptoExistecargaMasiva(concepto ,tipo);
        return ResponseEntity.ok(existe);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    }
}


@PostMapping("api/cargaMasivaNomina")
public ResponseEntity<Boolean> nominaExistecargaMasiva(@RequestBody BigDecimal nomina) {
    try {
        boolean existe = registroMasivoVariablesDao.nominaExistecargaMasiva(nomina);
        return ResponseEntity.ok(existe);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    }
}














	
	@PostMapping("eliminar/datos")
	public ResponseEntity<String> eliminarDatos(@RequestParam("usuario") String usuarioCapturo) {
		try {
			registroMasivoVariablesDao.eliminarDatos(usuarioCapturo);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al eliminar los datos para el usuario ");
		}
	}
	
	

		// @PostMapping("/actualizar")
		// public ResponseEntity<String> actualizarConcepto() {
		// 	try {
		// 		boolean actualizacionExitosa = registroMasivoVariablesDao.actualizarEstatus();
		// 		if (actualizacionExitosa) {
		// 			return ResponseEntity.ok("Datos actualizados correctamente");
		// 		} else {
		// 			return ResponseEntity.ok("No se encontraron datos para actualizar");
		// 		}
		// 	} catch (Exception e) {
		// 		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		// 				.body("Error al actualizar los datos: " + e.getMessage());
		// 	}
		// }


// @PostMapping("actualizar/Falla")
// public ResponseEntity<String> actualizarEstatusDos() {
//     try {
//         boolean actualizacionExitosa = registroMasivoVariablesDao.errorEnEstatus();
//         if (actualizacionExitosa) {
//             return ResponseEntity.ok("Datos actualizados correctamente");
//         } else {
//             return ResponseEntity.ok("No se encontraron datos para actualizar");
//         }
//     } catch (Exception e) {
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                 .body("Error al actualizar los datos: " + e.getMessage());
//     }
// }

@PostMapping("insertar/Datos")
public ResponseEntity<String> insertarDatos() {
    try {
        List<sn_convar_paso_3> datosInsertados = registroMasivoVariablesDao.insertData();
        if (datosInsertados != null && !datosInsertados.isEmpty()) {
            return ResponseEntity.ok("Datos insertados correctamente");
        } else {
            return ResponseEntity.ok("No se encontraron datos para insertar");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al insertar los datos: " + e.getMessage());
    }
}




// @GetMapping("/api/personsaXcurpConcepto")
// public ResponseEntity<Boolean> curpExisteenBase() {
//     try {
//         boolean existe = registroMasivoVariablesDao.curpExisteenBase();
//         return ResponseEntity.ok(existe);
//     } catch (Exception e) {
//         logger.error("Error al verificar si el CURP existe en la base de datos: " + e.getMessage(), e);
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
//     }
// }


@PostMapping("api/validarEntradaSoloNumeros")
public ResponseEntity<Boolean> validarEntradaSoloNumeros() {
    try {
		boolean resultado = registroMasivoVariablesDao.validarEntradaSoloNumeros();
		return ResponseEntity.ok(resultado);
	} catch (Exception e) {
	   e.printStackTrace();
	   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
	}
}

	@PostMapping("api/validarEntradaSoloNumerospago")
public ResponseEntity<Boolean> validarEntradaSoloNumerospagoanteced() {
    try {
		boolean resultado = registroMasivoVariablesDao.validarEntradaSoloNumerospagoanteced();
		return ResponseEntity.ok(resultado);
	} catch (Exception e) {
	   e.printStackTrace();
	   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
	}


    
   
}





}















	















