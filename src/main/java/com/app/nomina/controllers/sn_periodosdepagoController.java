package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.math.BigDecimal;

import com.app.nomina.services.sn_periodosdepagoRepository;
import com.app.nomina.services.sn_periodosdepagoService;
import com.app.nomina.models.sn_periodosdepago; 

import com.app.nomina.models.sn_ejercicio;
import com.app.nomina.services.sn_ejercicioRepository;

import com.app.nomina.dao.AuditoriaDao;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RestController
public class sn_periodosdepagoController {
    Logger logger = LoggerFactory.getLogger(sn_periodosdepagoController.class);

    @Autowired
    private  sn_periodosdepagoRepository periodosdepagoRepository;

    @Autowired
 	private sn_periodosdepagoService periodosdepagoService;

    @Autowired
    private sn_ejercicioRepository ejercicioRepository ;

    private sn_periodosdepago primerRegistro;

     //Inicio variables de auditoria
     @PersistenceContext
     EntityManager entityManager;
 
     @Autowired
     private AuditoriaDao auditoria;
 
     @Autowired
     private SessionController sesion;
     //Fin variables de auditoria 


    public sn_periodosdepagoController(sn_periodosdepagoRepository periodosdepagoRepository) {
        this.periodosdepagoRepository = periodosdepagoRepository;
    }

    @GetMapping("api/sn_periodospago/datos/anio") 
    public List<Object[]> ApiSnPeriodos() {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();
 
        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
         try {
            logger.info("Se ejecuto el ApiSnPeriodos en com.app.nomina.controllers > sn_periodosdepagoController");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 76, 2,
            "Se consulto la informacion de los Periodos de Pago",
            ipUsuario, macUsuario); 
            return periodosdepagoService.getAllQueryUnoSnPeriodosP();
         } catch (Exception e) {
             logger.error("Algo salio mal en com.app.nomina.controllers > sn_periodosdepagoController: " + e);
             return new ArrayList<>();
         } 
    }

    @PostMapping("api/subir/datos/bajaDePeriodo")
    public String bajaDePeriodo(@RequestBody sn_periodosdepago periodoPasadoJson) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {
            int count = periodosdepagoRepository.countNominasCerradas(periodoPasadoJson.getPp_ejercicio(), periodoPasadoJson.getPp_quincena());
            //El segundo if es para asegurarnos que todas las nominas ya estan en estatus 2 de ese periodo que se dara de baja
            //Si es mayor a 0 quiere decir que aun hay nominas abiertas 
            if (count >= 1) {
                logger.info("Se ejecuto el count com.app.nomina.controllers > sn_periodosdepagoController");
                return "Advertencia: Aun hay nominas abiertas";
            }

            periodosdepagoService.cambiarDatosParaAño(periodoPasadoJson.getPp_ejercicio(), periodoPasadoJson.getPp_quincena(),periodoPasadoJson.getPp_fechacierre(),periodoPasadoJson.getPp_usucerro(),periodoPasadoJson.getPp_fechamod(),periodoPasadoJson.getPp_usumodifico());
            
            logger.info("Se ejecuto el count com.app.nomina.controllers > sn_periodosdepagoController");
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 76, 3,
            "Se dio de baja un periodo quincenal de la tabla sn_periodosdepago",
            ipUsuario, macUsuario); 
            return "El periodo se cerro correctamente.";
        } catch (Exception e) {
        	logger.error("Algo salio mal en com.app.nomina.controllers  bajaDePeriodo > sn_periodosdepagoController: " + e.getMessage());
            return "Error al guardar los datos: " + e.getMessage();
        }
    }

    @PostMapping("api/subir/datos/altaDePeriodo")
    public String altaDePeriodo(@RequestBody sn_periodosdepago periodoNuevoJson) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {

            sn_periodosdepago datosPeriodoAlta  = periodosdepagoRepository.findByIdPeriodo(periodoNuevoJson.getPp_id());

            if (datosPeriodoAlta != null) {
                datosPeriodoAlta.setPp_operando(periodoNuevoJson.getPp_operando());
                datosPeriodoAlta.setPp_fechaapertura(periodoNuevoJson.getPp_fechaapertura());
                datosPeriodoAlta.setPp_usuaperturo(periodoNuevoJson.getPp_usuaperturo());
				periodosdepagoRepository.save(datosPeriodoAlta);
				logger.info("Se ejecuto el if altaDePeriodo com.app.nomina.controllers > sn_periodosdepagoController");	
			}

            logger.info("Se ejecuto el if altaDePeriodo com.app.nomina.controllers > sn_periodosdepagoController");	

            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 76, 3,
            "Se dio de alta un periodo quincenal de la tabla sn_periodosdepago",
            ipUsuario, macUsuario); 

            return "El periodo se aperturo correctamente.";
        } catch (Exception e) {
        	logger.error("Algo salio mal en com.app.nomina.controllers altaDePeriodo > sn_periodosdepagoController: " + e.getMessage());
            return "Error al guardar los datos: " + e.getMessage();
        }
    } 
    
    // INICIO funcion para hacer 24 inserts en sn_periodosdepago e insertar en sn_ejercicio 
    @PostMapping("api/sn_periodosdepago/subir/datos/guardarDatoSnPeriodoPago") // api/sn_periodosdepago/subir/datos/guardarDatoSnPeriodoPago
    public String guardarDatoSnPeriodoPago(@RequestBody DataWrapper datosRecibidos) {
        HashMap<String, String> sesionUsuario = new HashMap<String, String>();

        sesionUsuario = sesion.sesionUsuario();

        String idUsuario = sesionUsuario.get("idUsuario");
        String ipUsuario = sesionUsuario.get("ipUsuario");
        String macUsuario = sesionUsuario.get("macUsuario");
        try {

            List<sn_periodosdepago> registros = datosRecibidos.getRegistrosParaInsertar();

            // Comprobar si hay datos en el arreglo
            if (registros.isEmpty()) {
                return "No se recibieron datos para procesar";
            }

            // Logger apra informar cuantos datos llegaron
            logger.info("Número de registros recibidos: " + registros.size());
    

            //  Guardar el primer objeto
            primerRegistro = registros.get(0);

            //Se ele resta 1 porque recibes el anio que se va adar de alta , no el actual 
            //con este count , checas cuantos periodos estan de baja 
            int periodosEnBaja = periodosdepagoRepository.countPeriodosBaja(primerRegistro.getPp_ejercicio().subtract(BigDecimal.ONE));

            // if para validar si hay algun pp_operando en situacion 1 de la tabla sn_periodosdepago
            if(periodosEnBaja == 0){

            // Mandar al repository para hacer un count y saber si ya hay un año existente
			int buscarAnio = ejercicioRepository.countSnEjercicio(primerRegistro.getPp_ejercicio());
            sn_ejercicio datosToSave = new sn_ejercicio();
			
            // if para validar
			if (buscarAnio >= 1) {
				logger.info("Se ejecuto el if en com.app.nomina.controllers > sn_periodosdepagoController");
				return "Advertencia: Ya existe un periodo de pago con ese año";
			}else{

                // Empezar a acomodar los registros que se quiere mandar a sn_ejercicio
				datosToSave.setEjer_ejercicio(primerRegistro.getPp_ejercicio());
                datosToSave.setEjer_fechainicio(primerRegistro.getPp_fechaapertura());
                datosToSave.setEjer_usucapturo(primerRegistro.getPp_usuaperturo());
                datosToSave.setEjer_fechamod(primerRegistro.getPp_fechaapertura());
                datosToSave.setEjer_usumodifico(primerRegistro.getPp_usuaperturo());
                datosToSave.setEjer_situacion(BigDecimal.valueOf(1));

                // Guardar los datos antes acomodados
				ejercicioRepository.save(datosToSave);
				logger.info("Se ejecuto el if = !null com.app.nomina.controllers > sn_periodosdepagoController");

                // Tomar el año del primer registro y restarle -1 para hacer update a esa fila
                BigDecimal anio = primerRegistro.getPp_ejercicio();
                BigDecimal decremento = new BigDecimal(1);
                BigDecimal anioPasado = anio.subtract(decremento); 

                sn_ejercicio anioPasadoSnEjercicio = ejercicioRepository.findBySnEjercicio(anioPasado);

                // Inicio para el update del año anterior agregandole fecha termino, fecha modificacion, usuario modifico y situacion
                if(anioPasadoSnEjercicio != null){

                    anioPasadoSnEjercicio.setEjer_fechatermino(primerRegistro.getPp_fechaapertura());
                    anioPasadoSnEjercicio.setEjer_fechamod(primerRegistro.getPp_fechaapertura());
                    anioPasadoSnEjercicio.setEjer_usumodifico(primerRegistro.getPp_usuaperturo());
                    anioPasadoSnEjercicio.setEjer_situacion(BigDecimal.valueOf(2));

                    ejercicioRepository.save(anioPasadoSnEjercicio);
                    logger.info("Se ejecuto el if = !null com.app.nomina.controllers > sn_periodosdepagoController");	
                }
			}

            // logger para saber que datos fueron mandados a los 24 inserts en sn_periodosdepago
            registros.forEach(registro -> {
                logger.info("Recibido: ejercicio={}, quincena={}, desde={}, hasta={}, operando={}, fechaInicio={}, usuCapturo={}", 
                    registro.getPp_ejercicio(), 
                    registro.getPp_quincena(),
                    registro.getPp_fechadesde(),
                    registro.getPp_fechahasta(),
                    registro.getPp_operando(),
                    registro.getPp_fechaapertura(),
                    registro.getPp_usuaperturo()
                );
            });

            // Guardar todos los registros
            periodosdepagoRepository.saveAll(registros);

            }else{

                logger.info("Se ejecuto el if para comprobar si todos los pp_operando estan en 2 com.app.nomina.controllers > sn_periodosdepagoController");
				return "Advertencia: Aun hay periodos activos";

            }
 
            auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 75, 1,
            "Se hace 24 inserts en sn_periodosdepago e insertar en sn_ejercicio ",
            ipUsuario, macUsuario); 

            return "Datos nuevos guardados correctamente";
        } catch (Exception e) {
            logger.error("Error al guardar datos: ", e);
            return "Error al guardar datos: " + e.getMessage();
        }
    }

    // Clase envoltura para recibir el JSON
    public static class DataWrapper {
        private List<sn_periodosdepago> registrosParaInsertar;

        public List<sn_periodosdepago> getRegistrosParaInsertar() {
            return registrosParaInsertar;
        }

        public void setRegistrosParaInsertar(List<sn_periodosdepago> registrosParaInsertar) {
            this.registrosParaInsertar = registrosParaInsertar;
        }
    }
    // FIN funcion para hacer 24 inserts en sn_periodosdepago e insertar en sn_ejercicio 
}