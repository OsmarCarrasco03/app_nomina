package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.app.nomina.dao.AuditoriaDao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.nomina.models.sn_dompersona;
import com.app.nomina.services.sn_dompersonaRepository;
import com.app.nomina.services.sn_dompersonaService;

@RestController
public class sn_dompersonaController {

	Logger logger = LoggerFactory.getLogger(sn_dompersonaController.class);

	@Autowired
	private sn_dompersonaRepository dompersonaRepository;
	@Autowired
	private sn_dompersonaService dompersonaService;

	// INICIO variables globales de auditoria
 	@PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
	// FIN variables globales de auditoria

	// INICIO API para subir los datos de registrar domicilio

	@PostMapping("api/subir/datos/domicilio") // api/subir/datos/domicilio
	public String guardarDatosDomicilio(@RequestBody sn_dompersona domicilioDatosJson) {

		HashMap<String, String> sesionUsuario = new HashMap<String, String>();

			sesionUsuario = sesion.sesionUsuario();

			String idUsuario = sesionUsuario.get("idUsuario");
			String ipUsuario = sesionUsuario.get("ipUsuario");
			String macUsuario = sesionUsuario.get("macUsuario");

		try {

			int count = dompersonaRepository.countDomicilioRegistros(domicilioDatosJson.getDomp_idpersona());
			if (count >= 1) {
				logger.info("Se ejecuto el count de guardarDatosDomicilio en com.app.nomina.controllers > sn_dompersonaController");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 45, 2,
                    "Se ejecuto el count de guardarDatosDomicilio en com.app.nomina.controllers > sn_dompersonaController",
                    ipUsuario, macUsuario); 
				
					return "Advertencia: Ya existe un registro con los mismos datos";
			}

			sn_dompersona domicilioToSave = new sn_dompersona();

			domicilioToSave.setDomp_idpersona(domicilioDatosJson.getDomp_idpersona());
			domicilioToSave.setDomp_estado(domicilioDatosJson.getDomp_estado());
			domicilioToSave.setDomp_municipio(domicilioDatosJson.getDomp_municipio());
			domicilioToSave.setDomp_colonia(domicilioDatosJson.getDomp_colonia());
			domicilioToSave.setDomp_codpostal(domicilioDatosJson.getDomp_codpostal());
			domicilioToSave.setDomp_calle(domicilioDatosJson.getDomp_calle());
			domicilioToSave.setDomp_numext(domicilioDatosJson.getDomp_numext());
			domicilioToSave.setDomp_numint(domicilioDatosJson.getDomp_numint());
			domicilioToSave.setDomp_telparticular(domicilioDatosJson.getDomp_telparticular());
			domicilioToSave.setDomp_fechainicio(domicilioDatosJson.getDomp_fechainicio());
//			domicilioToSave.setDomp_fechatermino(domicilioDatosJson.getDomp_fechatermino());
			domicilioToSave.setDomp_usucapturo(domicilioDatosJson.getDomp_usucapturo());
			domicilioToSave.setDomp_fechamod(domicilioDatosJson.getDomp_fechamod());
			domicilioToSave.setDomp_usumodifico(domicilioDatosJson.getDomp_usumodifico());
			domicilioToSave.setDomp_situacion(domicilioDatosJson.getDomp_situacion());

			dompersonaRepository.save(domicilioToSave);
			logger.info("Se subieron los datos correctamente de guardarDatosDomicilio en com.app.nomina.controllers > sn_dompersonaController");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 45, 1,
			"Se subieron los datos correctamente de guardarDatosDomicilio en com.app.nomina.controllers > sn_dompersonaController",
			ipUsuario, macUsuario); 
			
			return "Datos guardados correctamente";
		} catch (Exception e) {
			logger.error("Algo salio mal en guardarDatosDomicilio de com.app.nomina.controllers > sn_dompersonaController: " + e.getMessage());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 45, 8,
			"Algo salio mal en guardarDatosDomicilio de com.app.nomina.controllers > sn_dompersonaController",
			ipUsuario, macUsuario); 
			
			return "Error al guardar los datos: " + e.getMessage();
		}
	}

	// FIN API para subir los datos de registrar domicilio

	// INICIO API para traerlos los datos de dompersona

	@GetMapping("api/dompersona/traer/all/datos") // api/dompersona/traer/all/datos
	public List<Object[]> ApiSnDompersona() {

		HashMap<String, String> sesionUsuario = new HashMap<String, String>();

			sesionUsuario = sesion.sesionUsuario();

			String idUsuario = sesionUsuario.get("idUsuario");
			String ipUsuario = sesionUsuario.get("ipUsuario");
			String macUsuario = sesionUsuario.get("macUsuario");

		try {
			logger.info("Se ejecuto el ApiSnDompersona en com.app.nomina.controllers > sn_dompersonaController");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 44, 2,
			"El idModulo es el mod_padre ya que se usa es mas de 1 modulo, en este caso los modulos hijos son 46 y 47. Se ejecuto el ApiSnDompersona en com.app.nomina.controllers > sn_dompersonaController",
			ipUsuario, macUsuario); 

			return dompersonaService.getAllQueryUnoSnDompersona();
		} catch (Exception e) {
			logger.error("Algo salio mal en ApiSnDompersona de com.app.nomina.controllers > sn_dompersonaController: " + e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 44, 8,
			"El idModulo es el mod_padre ya que se usa es mas de 1 modulo, en este caso los modulos hijos son 46 y 47. Algo salio mal en ApiSnDompersona de com.app.nomina.controllers > sn_dompersonaController",
			ipUsuario, macUsuario); 
			
			return new ArrayList<>();
		}
	}

	// FIN API para traerlos los datos de dompersona

	// INICIO API para modificar los datos en modificar domicilio

	@PostMapping("api/domicilio/subir/datos/modificar") // api/domicilio/subir/datos/modificar
	public String guardarDatoModificadoDomicilio(@RequestBody sn_dompersona datosJson) {

		HashMap<String, String> sesionUsuario = new HashMap<String, String>();

			sesionUsuario = sesion.sesionUsuario();

			String idUsuario = sesionUsuario.get("idUsuario");
			String ipUsuario = sesionUsuario.get("ipUsuario");
			String macUsuario = sesionUsuario.get("macUsuario");

		try {

			sn_dompersona datosExistente = dompersonaRepository.findByPersonaAndSituacion(datosJson.getDomp_idpersona(),
				
				datosJson.getDomp_situacion());

			if (datosExistente != null) {
				datosExistente.setDomp_situacion(2);
				datosExistente.setDomp_fechatermino(datosJson.getDomp_fechamod());
				dompersonaRepository.save(datosExistente);
				logger.info("Datos existentes actualizados correctamente en guardarDatoModificadoDomicilio de com.app.nomina.controllers > sn_dompersonaController");
			
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 47, 3,
				"Datos existentes actualizados correctamente en guardarDatoModificadoDomicilio de com.app.nomina.controllers > sn_dompersonaController",
				ipUsuario, macUsuario); 
			}

			sn_dompersona datosToSave = new sn_dompersona();

			datosToSave.setDomp_idpersona(datosJson.getDomp_idpersona());
			datosToSave.setDomp_estado(datosJson.getDomp_estado());
			datosToSave.setDomp_municipio(datosJson.getDomp_municipio());
			datosToSave.setDomp_colonia(datosJson.getDomp_colonia());
			datosToSave.setDomp_codpostal(datosJson.getDomp_codpostal());
			datosToSave.setDomp_calle(datosJson.getDomp_calle());
			datosToSave.setDomp_numext(datosJson.getDomp_numext());
			datosToSave.setDomp_numint(datosJson.getDomp_numint());
			datosToSave.setDomp_telparticular(datosJson.getDomp_telparticular());
			datosToSave.setDomp_fechainicio(datosJson.getDomp_fechainicio());
			datosToSave.setDomp_fechatermino(datosJson.getDomp_fechatermino());
			datosToSave.setDomp_usucapturo(datosJson.getDomp_usucapturo());
			datosToSave.setDomp_fechamod(datosJson.getDomp_fechamod());
			datosToSave.setDomp_usumodifico(datosJson.getDomp_usumodifico());
			datosToSave.setDomp_situacion(datosJson.getDomp_situacion());

			dompersonaRepository.save(datosToSave);

			logger.info("Datos nuevos guardados correctamente en guardarDatoModificadoDomicilio de com.app.nomina.controllers > sn_dompersonaController");

			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 47, 3,
			"Datos nuevos guardados correctamente en guardarDatoModificadoDomicilio de com.app.nomina.controllers > sn_dompersonaController",
			ipUsuario, macUsuario); 

			return "Datos nuevos guardados correctamente";
		} catch (Exception e) {
			logger.error("Error al guardar o actualizar datos en guardarDatoModificadoDomicilio de com.app.nomina.controllers > sn_dompersonaController: " + e.getMessage());

			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 47, 8,
			"Error al guardar o actualizar datos en guardarDatoModificadoDomicilio de com.app.nomina.controllers > sn_dompersonaController",
			ipUsuario, macUsuario); 

			return "Error al guardar o actualizar datos: " + e.getMessage();
		}
	}

	// 	FIN API para modificar los datos en modificar domicilio

}