package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.models.sn_plaza;
import com.app.nomina.services.SnPlazaDataRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class DataPlazaController {


Logger logger = LoggerFactory.getLogger(DataPlazaController.class);


     @Autowired
    private SnPlazaDataRepository snPlazaDataRepository;

    
    @PostMapping("api/guardarDatosPlaza")
    public String guardarDatos(@RequestBody sn_plaza newData) {
        try {
            // Verificar si ya existe un registro con los mismos datos

            int count = snPlazaDataRepository.countRegistros(newData.getPlz_numero());

            // Revisa que las combinaciones no sean iguales a las que se van a registrar
            /*int count = snPlazaDataRepository.countRegistros(newData.getPlz_numero(), newData.getPlz_numplzpadre(), newData.getPlz_codintrhnet(), newData.getPlz_estatusocup(), newData.getPlz_motoblidecpatri(), newData.getPlz_areas(), newData.getPlz_conpublicas(),
            newData.getPlz_traclap(), newData.getPlz_traebi(), newData.getPlz_traemdmajr(), newData.getPlz_nivelequiv(), newData.getPlz_unidad(), newData.getPlz_ptoautorizado(), newData.getPlz_ptopagado(), newData.getPlz_rfiriuf(), newData.getPlz_tiposervpublico());*/
           
           
            if (count >= 1) {
                logger.warn("Ya existe un registro con los mismos datos en la base de datos DataPlazaController");
                return "Advertencia: Ya existe un registro con los mismos datos en la base de datos";                
            }

            // Si no hay registros existentes, guardar los datos

            sn_plaza plazaToSave = new sn_plaza(); 
            
            plazaToSave.setPlz_numero(newData.getPlz_numero());
            plazaToSave.setPlz_numplzpadre(newData.getPlz_numplzpadre());
            plazaToSave.setPlz_codintrhnet(newData.getPlz_codintrhnet());
            plazaToSave.setPlz_estatusocup(newData.getPlz_estatusocup());
            plazaToSave.setPlz_motoblidecpatri(newData.getPlz_motoblidecpatri());
            plazaToSave.setPlz_areas(newData.getPlz_areas());
            plazaToSave.setPlz_conpublicas(newData.getPlz_conpublicas());
            plazaToSave.setPlz_traclap(newData.getPlz_traclap());
            plazaToSave.setPlz_traebi(newData.getPlz_traebi());
            plazaToSave.setPlz_traemdmajr(newData.getPlz_traemdmajr());
            plazaToSave.setPlz_nivelequiv(newData.getPlz_nivelequiv());
            plazaToSave.setPlz_rfiriuf(newData.getPlz_rfiriuf());
            plazaToSave.setPlz_tiposervpublico(newData.getPlz_tiposervpublico());            
            plazaToSave.setPlz_unidad(newData.getPlz_unidad());
            plazaToSave.setPlz_centrotrabajo(newData.getPlz_centrotrabajo());
            plazaToSave.setPlz_centrodist(newData.getPlz_centrodist());            
            plazaToSave.setPlz_ptoautorizado(newData.getPlz_ptoautorizado());
            plazaToSave.setPlz_ptopagado(newData.getPlz_ptopagado());            
            plazaToSave.setPlz_fechainicio(newData.getPlz_fechainicio());
            plazaToSave.setPlz_usucapturo(newData.getPlz_usucapturo());
            plazaToSave.setPlz_fechamod(newData.getPlz_fechamod());
            plazaToSave.setPlz_usumodifico(newData.getPlz_usumodifico());
            plazaToSave.setPlz_situacion(newData.getPlz_situacion());            

            snPlazaDataRepository.save(plazaToSave);
            
            logger.info("Los datos se guardaron exitosamente");
            return "Datos guardados correctamente";
        } catch (Exception e) {
            logger.error("Ocurrio un error al guardar los datos " + e.getMessage());
            return "Error al guardar los datos: " + e.getMessage();
        }
    }

}