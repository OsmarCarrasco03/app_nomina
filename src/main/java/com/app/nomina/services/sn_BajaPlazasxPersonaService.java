package com.app.nomina.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;

//import com.app.nomina.models.*;

import java.util.ArrayList;
import java.util.List;

@Service
public class sn_BajaPlazasxPersonaService {
    Logger logger = LoggerFactory.getLogger(sn_BajaPlazasxPersonaService.class);

    private final sn_BajaPlazasxPersonaRepository BajaPlazasxPersonaRepository;

    //Inicio Constructor
    //@Autowired 
    public sn_BajaPlazasxPersonaService(sn_BajaPlazasxPersonaRepository BajaPlazasxPersonaRepository){
        this.BajaPlazasxPersonaRepository = BajaPlazasxPersonaRepository;
    }
    //Fin Constructor

    //Inicio metodo para insertar los datos de la tabla sn_plazapersona a sn_plazapersonaha

    public List<Object[]> getallinsertdatasnplazapersonaha(Integer input1, Integer input2){
        try{
            logger.info("Se ejecuto el insertdatasnplazapersonaha en com.app.nomina.services > sn_BajaPlazasxPersonaService");
			return BajaPlazasxPersonaRepository.insertdatasnplazapersonaha(input1, input2);
        }catch (Exception e) {
			logger.error("Error en: sn_BajaPlazasxPersonaService.getallinsertdatasnplazapersonaha", e.getMessage());
			return new ArrayList<>();
		}
    }

    //Fin metodo para insertar los datos de la tabla sn_plazapersona a sn_plazapersonaha

    //Inicio metodo para insertar fechatermino a sn_plazapersonaha

    public List<Object[]> getallfechaterminosnplazapersonaha(Integer input1, Integer input2,Date fecha){
        try{
            logger.info("Se ejecuto el fechaterminosnplazapersonaha en com.app.nomina.services > sn_BajaPlazasxPersonaService");
			return BajaPlazasxPersonaRepository.fechaterminosnplazapersonaha(input1, input2, fecha);
        }catch (Exception e) {
			logger.error("Error en: sn_BajaPlazasxPersonaService.getallfechaterminosnplazapersonaha", e.getMessage());
			return new ArrayList<>();
		}
    }

    //Fin metodo para insertar fechatermino a sn_plazapersonaha

    //Inicio metodo para actualizar el plz_estatusocup a 2 en sn_plaza

    public List<Object[]> getallactualizarestatusocupado(Integer input1){
        try{
            logger.info("Se ejecuto el actualizarestatusocupado en com.app.nomina.services > sn_BajaPlazasxPersonaService");
			return BajaPlazasxPersonaRepository.actualizarestatusocupado(input1);
        }catch (Exception e) {
			logger.error("Error en: sn_BajaPlazasxPersonaService.getallactualizarestatusocupado", e.getMessage());
			return new ArrayList<>();
		}
    }

    //Fin metodo para para actualizar el plz_estatusocup a 2 en sn_plaza

    //Inicio metodo para borrar las plazas de sn_plazapersona que ya fueron pasadas a sn_plazapersonaha

    public List<Object[]> getalldeletedatasnplazapersona(Integer input1, Integer input2){
        try{
            logger.info("Se ejecuto el deletedatasnplazapersona en com.app.nomina.services > sn_BajaPlazasxPersonaService");
			return BajaPlazasxPersonaRepository.deletedatasnplazapersona(input1, input2);
        }catch (Exception e) {
			logger.error("Error en: sn_BajaPlazasxPersonaService.getalldeletedatasnplazapersona", e.getMessage());
			return new ArrayList<>();
		}
    }

    //Fin metodo para borrar las plazas de sn_plazapersona que ya fueron pasadas a sn_plazapersonaha

}
