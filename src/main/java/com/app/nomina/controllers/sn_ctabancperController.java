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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.models.sn_ctabancpersona;

import com.app.nomina.services.sn_ctabancperRepository;
import com.app.nomina.services.sn_ctabancperService;
 
 
@RestController
public class sn_ctabancperController {

    Logger logger = LoggerFactory.getLogger(sn_ctabancperController.class);

    @Autowired
    private  sn_ctabancperRepository ctabancperiRepository;

    @Autowired
 	private sn_ctabancperService ctabancperService;

    //Inicio variables de auditoria
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private AuditoriaDao auditoria;

    @Autowired
    private SessionController sesion;
    //Fin variables de auditoria

    @PostMapping("api/subir/datos/ctabancpersona")
    public String guardarDatosCuenta(@RequestBody sn_ctabancpersona cuentasDatosJson) {
        
        try {
            HashMap<String, String> sesionUsuario = new HashMap<String, String>();

            sesionUsuario = sesion.sesionUsuario();

            String idUsuario = sesionUsuario.get("idUsuario");
            String ipUsuario = sesionUsuario.get("ipUsuario");
            String macUsuario = sesionUsuario.get("macUsuario");

            // Verificar si ya existe un registro con los mismos datos
            int count = ctabancperiRepository.countCuentasRegistros(cuentasDatosJson.getCtab_idpersona());
            if (count >= 1) {
                logger.info("Se ejecuto el count com.app.nomina.controllers > sn_ctabancperController");
                return "Advertencia: Ya existe un registro con los mismos datos en la base de datos";
            }

            // Si no hay registros existentes, guardar los datos

            sn_ctabancpersona cuentasToSave = new sn_ctabancpersona(); 

            cuentasToSave.setCtab_idpersona(cuentasDatosJson.getCtab_idpersona());
            cuentasToSave.setCtab_banco(cuentasDatosJson.getCtab_banco());
            cuentasToSave.setCtab_cuenta(cuentasDatosJson.getCtab_cuenta());
            cuentasToSave.setCtab_clabeinter(cuentasDatosJson.getCtab_clabeinter());
            cuentasToSave.setCtab_moneda(cuentasDatosJson.getCtab_moneda());
            cuentasToSave.setCtab_tipo(cuentasDatosJson.getCtab_tipo());
            cuentasToSave.setCtab_modpago(cuentasDatosJson.getCtab_modpago());
            cuentasToSave.setCtab_fechainicio(cuentasDatosJson.getCtab_fechainicio());
            // cuentasToSave.setCtab_fechatermino(cuentasDatosJson.getCtab_fechatermino());
            cuentasToSave.setCtab_usucapturo(cuentasDatosJson.getCtab_usucapturo());
            cuentasToSave.setCtab_fechamod(cuentasDatosJson.getCtab_fechamod());
            cuentasToSave.setCtab_usumodifico(cuentasDatosJson.getCtab_usumodifico());
            cuentasToSave.setCtab_situacion(cuentasDatosJson.getCtab_situacion());
            
            ctabancperiRepository.save(cuentasToSave);
            logger.info("Se subieron los datos correctamente com.app.nomina.controllers > sn_ctabancperController");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 49, 1,
            "Se subio datos a la tabla sn_ctabancpersona",
            ipUsuario, macUsuario); 
            return "Datos guardados correctamente";
        } catch (Exception e) {
            logger.error("Mensaje"+ e);
            return "Error al guardar los datos: " + e.getMessage();
        }
    }

    @GetMapping("api/ctabancper/datos") 
    public List<Object[]> ApiCtaBancpersona() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {
            logger.info("Se realizo una consulta en la tabla ctg_bancos"); 
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 48, 2,
            "El idModulo es el modulo_padre ya que se usa en mas de un modulo. Consulta en la tabla ctg_bancos",
            ipUsuario, macUsuario); 
            return ctabancperService.getAllQueryUnoCtaBancPersona();
        } catch (Exception e) {
            logger.error("Mensaje"+ e);            
            return new ArrayList<>();
        }
    }

    @PostMapping("api/ctabancper/modificar")
    public String modificarDatosCtaBanc (@RequestBody sn_ctabancpersona datosJson) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
        sesionUsuario = sesion.sesionUsuario();
        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {        	
        	sn_ctabancpersona datosExistente = ctabancperiRepository.findByPersonaAndSituacionCTABANCPERSONA(datosJson.getCtab_idpersona(), datosJson.getCtab_situacion());

        	if (datosExistente != null) {
        	    datosExistente.setCtab_situacion(2);
                datosExistente.setCtab_fechatermino(datosJson.getCtab_fechamod());
        	    ctabancperiRepository.save(datosExistente);
                auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 56, 3,
                "Se modifico la situacion y fecha termino de un dato en sn_ctabancpersona",
                ipUsuario, macUsuario); 
        	    logger.info("Se modifico la situacion y fecha termino de un dato en sn_ctabancpersona");
        	} else {}

            // Guardar los nuevos datos en la base de datos
            sn_ctabancpersona datosToSave = new sn_ctabancpersona(); 
            
            datosToSave.setCtab_idpersona(datosJson.getCtab_idpersona());
            datosToSave.setCtab_banco(datosJson.getCtab_banco());
            datosToSave.setCtab_cuenta(datosJson.getCtab_cuenta());
            datosToSave.setCtab_clabeinter(datosJson.getCtab_clabeinter());
            datosToSave.setCtab_moneda(datosJson.getCtab_moneda());
            datosToSave.setCtab_tipo(datosJson.getCtab_tipo());
            datosToSave.setCtab_modpago(datosJson.getCtab_modpago());
            datosToSave.setCtab_fechainicio(datosJson.getCtab_fechainicio());
            datosToSave.setCtab_usucapturo(datosJson.getCtab_usucapturo());
            datosToSave.setCtab_fechamod(datosJson.getCtab_fechamod());
            datosToSave.setCtab_usumodifico(datosJson.getCtab_usumodifico());
            datosToSave.setCtab_situacion(datosJson.getCtab_situacion());
            ctabancperiRepository.save(datosToSave);
            
            logger.info("Se dio de alta la nueva cuenta de banco del usuario ");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 56, 3,
            "Se actualizaron los datos de la cuenta de banco de un usuario en la tabla sn_ctabancpersona",
            ipUsuario, macUsuario); 
            return "Datos nuevos guardados correctamente";
        } catch (Exception e) {
            logger.error("Mensaje"+ e);
            return "Error al guardar o actualizar datos: " + e.getMessage();
        }
    }
}