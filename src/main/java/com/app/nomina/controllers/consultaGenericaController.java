package com.app.nomina.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.slf4j.*;
import org.springframework.web.bind.annotation.*;

import com.app.nomina.dao.FuncionesGeneralesDaoImp;
import com.app.nomina.services.consultaGenericaService;

@RestController
public class consultaGenericaController {
    Logger logger = LoggerFactory.getLogger(consultaGenericaController.class);
    @Autowired
    private consultaGenericaService service;
    
    FuncionesGeneralesDaoImp fungendaoimp;

    /*FuncionesGeneralesDaoImp fungendaoimp  = new FuncionesGeneralesDaoImp(); //Instanciar un 

    Integer tabulador_actual = fungendaoimp.TabuladorActualNUmero();*/

    public consultaGenericaController(FuncionesGeneralesDaoImp fungendaoimp) {
        this.fungendaoimp = fungendaoimp;
    }

    @GetMapping("api/percepcionesfijas/{idPuesto}")
     public ResponseEntity<List<Object[]>> getConsultaPercepcionesFijas(@PathVariable Integer idPuesto) {
         try {
            List<Object[]> consultaPerfija = service.getallfindbyPercepcionesFijas(fungendaoimp.TabuladorActualNUmero(), idPuesto);
            if (consultaPerfija.isEmpty()) {
                logger.info("No existen datos");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
            }
            logger.info("Los datos de la consulta de percepciones fijas se obtuvieron satisfactoriamente");
            return ResponseEntity.ok(consultaPerfija);
        } catch (Exception e) {
            logger.error("Algo salio mal en la comunicación con el servidor" + e);
          
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }

    }

    @GetMapping("api/deduccionesfijas/{idPuesto}")
    public ResponseEntity<List<Object[]>> getConsultaDeduccionesFijas(@PathVariable Integer idPuesto) {
        try {
           List<Object[]> consultaDeducfija = service.getallfindbyDeduccionesFijas(fungendaoimp.TabuladorActualNUmero(), idPuesto);
           if (consultaDeducfija.isEmpty()) {
               logger.info("No existen datos");
               return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
           }
           logger.info("Los datos de la consulta de deducciones fijas se obtuvieron satisfactoriamente");
           return ResponseEntity.ok(consultaDeducfija);
       } catch (Exception e) {
           logger.error("Algo salio mal en la comunicación con el servidor" + e);
         
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
       }

   }

   @GetMapping("api/percepcionesVariables/{idPersona}")
   public ResponseEntity<List<Object[]>> getConsultaPercepcionesVariables(@PathVariable Integer idPersona) {
       try {
          List<Object[]> consultaPerVar = service.getallfindbyPercepcionesVariables(fungendaoimp.TabuladorActualNUmero(), idPersona);
          if (consultaPerVar.isEmpty()) {
              logger.info("No existen datos");
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
          }
          logger.info("Los datos de la consulta de percepciones variables se obtuvieron satisfactoriamente");
          return ResponseEntity.ok(consultaPerVar);
      } catch (Exception e) {
          logger.error("Algo salio mal en la comunicación con el servidor" + e);
        
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
      }

  }

  @GetMapping("api/dedudcionesvariables/{idPersona}")
   public ResponseEntity<List<Object[]>> getConsultaDeduccionesVariables(@PathVariable Integer idPersona) {
       try {
          List<Object[]> consultaDeducVar = service.getallfindbyDeduccionesVariables(fungendaoimp.TabuladorActualNUmero(), idPersona);
          if (consultaDeducVar.isEmpty()) {
              logger.info("No existen datos");
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
          }
          logger.info("Los datos de la consulta de deducciones variables se obtuvieron satisfactoriamente");
          return ResponseEntity.ok(consultaDeducVar);
      } catch (Exception e) {
          logger.error("Algo salio mal en la comunicación con el servidor" + e);
        
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
      }

  }

  @GetMapping("api/datosgenerales/{idPersona}")
   public ResponseEntity<List<Object[]>> getConsultaDatosGral(@PathVariable Integer idPersona) {
       try {
          List<Object[]> consultaDatosGral = service.getallfindbyDatosgral(idPersona);
          if (consultaDatosGral.isEmpty()) {
              logger.info("No existen datos");
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
          }
          logger.info("Los datos de la consulta de datos generales se obtuvieron satisfactoriamente");
          return ResponseEntity.ok(consultaDatosGral);
      } catch (Exception e) {
          logger.error("Algo salio mal en la comunicación con el servidor" + e);
        
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
      }

  }
}
