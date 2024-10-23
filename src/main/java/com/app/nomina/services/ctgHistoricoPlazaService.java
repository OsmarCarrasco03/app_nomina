package com.app.nomina.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.app.nomina.models.*;

import java.util.ArrayList;
import java.util.List;

@Service
public class ctgHistoricoPlazaService {
    Logger logger = LoggerFactory.getLogger(ctgHistoricoPlazaService.class);

    private final ctgHistoricoPlazaRepository HistoricoPlazaRepository;

    //Inicio Constructor
    //@Autowired 
    public ctgHistoricoPlazaService(ctgHistoricoPlazaRepository HistoricoPlazaRepository){
        this.HistoricoPlazaRepository =HistoricoPlazaRepository;
    }
    //Fin Constructor

    //Inicio metodo para obtener datos importantes de plaza
    public List<Object[]> getallfindbydatosplaza(Integer input){
        try{
            logger.info("Se ejecuto el findbydatosplaza en com.app.nomina.dao > ctgHistoricoPlazaService");
			return HistoricoPlazaRepository.findbydatosplaza(input);
        }catch (Exception e) {
			logger.error("Error en: ctgHistoricoPlazaService.getallfindbydatosplaza", e.getMessage());
			return new ArrayList<>();
		}
    }
    //Fin metodo para obtener datos importantes de plaza

    //Inicio metodo Obtener datos de puesto recibiendo como parametro un id del puesto
    public List<Object[]> getallfindbydatospuesto(Integer input){
        try{
            logger.info("Se ejecuto el findbydatospuesto en com.app.nomina.dao > ctgHistoricoPlazaService");
			return HistoricoPlazaRepository.findbydatospuesto(input);
        }catch (Exception e) {
			logger.error("Error en: ctgHistoricoPlazaService.getallfindbydatospuesto", e.getMessage());
			return new ArrayList<>();
		}
    }
    //Fin metodo Obtener datos de puesto recibiendo como parametro un id del puesto


    //HISTORICA
    //Inicio metodo Obtener las personas que han tenido esa plaza
    public List<Object[]> getallfindbydatospersonasporplazaha(Integer input){
        try{
            logger.info("Se ejecuto el findbydatospersonasporplazaha en com.app.nomina.dao > ctgHistoricoPlazaService");
			return HistoricoPlazaRepository.findbydatospersonasporplazaha(input);
        }catch (Exception e) {
			logger.error("Error en: ctgHistoricoPlazaService.getallfindbydatospersonasporplazaha", e.getMessage());
			return new ArrayList<>();
		}
    }
    //Fin metodo Obtener las personas que han tenido esa plaza

    //ACTUAL
    //Inicio metodo Obtener la persona que tiene esta plaza actualmente
    public List<Object[]> getallfindbydatospersonasporplaza(Integer input){
        try{
            logger.info("Se ejecuto el findbydatospersonasporplaza en com.app.nomina.dao > ctgHistoricoPlazaService");
			return HistoricoPlazaRepository.findbydatospersonasporplaza(input);
        }catch (Exception e) {
			logger.error("Error en: ctgHistoricoPlazaService.getallfindbydatospersonasporplaza", e.getMessage());
			return new ArrayList<>();
		}
    }
    //Fin metodo Obtener la persona que tiene esta plaza actualmente



    //HISTORICA
    //Inicio metodo para buscar las plazas que ha tenido una persona
    public List<Object[]> getallfindbydatosplazasporpersonaha(Integer input){
        try{
            logger.info("Se ejecuto el findbydatosplazasporpersonaha en com.app.nomina.dao > ctgHistoricoPlazaService");
			return HistoricoPlazaRepository.findbydatosplazasporpersonaha(input);
        }catch (Exception e) {
			logger.error("Error en: ctgHistoricoPlazaService.getallfindbydatosplazasporpersonaha", e.getMessage());
			return new ArrayList<>();
		}
    }
    //Fin metodo para buscar las plazas que ha tenido una persona


    //ACTUAL
    //Inicio metodo para buscar la plaza actual de una persona
    public List<Object[]> getallfindbydatosplazasporpersona(Integer input){
        try{
            logger.info("Se ejecuto el findbydatosplazasporpersona en com.app.nomina.dao > ctgHistoricoPlazaService");
			return HistoricoPlazaRepository.findbydatosplazasporpersona(input);
        }catch (Exception e) {
			logger.error("Error en: ctgHistoricoPlazaService.getallfindbydatosplazasporpersona", e.getMessage());
			return new ArrayList<>();
		}
    }
    //Fin metodo para buscar la plaza actual de una persona







    //Inicio metodo para obtener todos los datos del empleado
    public List<Object[]> getdatosempleados(Integer input){
        try{
            logger.info("Se ejecuto el datosempleados en com.app.nomina.dao > ctgHistoricoPlazaService");
			return HistoricoPlazaRepository.datosempleados(input);
        }catch (Exception e) {
			logger.error("Error en: ctgHistoricoPlazaService.datosempleados", e.getMessage());
			return new ArrayList<>();
		}
    }
    //Fin metodo para obtener todos los datos del empleado

}
