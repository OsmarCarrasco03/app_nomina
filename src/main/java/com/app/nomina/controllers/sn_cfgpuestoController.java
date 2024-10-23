package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.nomina.models.sn_cfgpuesto;
import com.app.nomina.services.sn_cfgpuestoRepository;

@RestController
public class sn_cfgpuestoController {
    Logger logger = LoggerFactory.getLogger(sn_cfgpuestoController.class);

    @Autowired
    private sn_cfgpuestoRepository sn_cfgpuestoRepository;

    // INICIO API para subir los datos de registrar 
    

	@PostMapping("api/subir/datos/sn_cfgpuesto")
    public String guardarDatosPuesto(@RequestBody sn_cfgpuesto datosJson) {
        try {
            int count = sn_cfgpuestoRepository.countCuentasRegistros(datosJson.getPto_tipo(),datosJson.getPto_zona(),datosJson.getPto_nivel(),datosJson.getPto_contratacion());
			if (count >= 1) {
				logger.info("Se ejecuto el count com.app.nomina.controllers > sn_dompersonaController");
				return "Advertencia: Ya existe un registro con los mismos datos";
			}else{              

                sn_cfgpuesto puestoToSave = new sn_cfgpuesto();
            
                puestoToSave.setPto_idcodpuesto(datosJson.getPto_idcodpuesto());
                puestoToSave.setPto_tipo(datosJson.getPto_tipo());
                puestoToSave.setPto_zona(datosJson.getPto_zona());
                puestoToSave.setPto_nivel(datosJson.getPto_nivel());
                puestoToSave.setPto_categoria(datosJson.getPto_categoria());
                puestoToSave.setPto_subcategoria(datosJson.getPto_subcategoria());
                puestoToSave.setPto_clasfinterna(datosJson.getPto_clasfinterna());
                puestoToSave.setPto_contratacion(datosJson.getPto_contratacion());
                puestoToSave.setPto_declaracion(datosJson.getPto_declaracion());
                puestoToSave.setPto_fechainicio(datosJson.getPto_fechainicio());
                //puestoToSave.setPto_fechatermino(datosJson.getPto_fechatermino());
                puestoToSave.setPto_usucapturo(datosJson.getPto_usucapturo());
                puestoToSave.setPto_fechamod(datosJson.getPto_fechamod());
                puestoToSave.setPto_usumodifico(datosJson.getPto_usumodifico());
                puestoToSave.setPto_situacion(datosJson.getPto_situacion());

                sn_cfgpuestoRepository.save(puestoToSave);
                logger.info("Se subieron los datos correctamente com.app.nomina.controllers > sn_cfgpuestoController");
                return "Datos guardados correctamente";
            }
        } catch (Exception e) {
            logger.error("Algo salio mal en com.app.nomina.controllers > sn_cfgpuestoController: " + e.getMessage());
			return "Error al guardar los datos: " + e.getMessage();
        }
    }

}








































