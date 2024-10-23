package com.app.nomina.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.dao.RegistroPuestoDao;
import com.app.nomina.models.ctg_lstpuesto;
import com.app.nomina.models.ctg_puesto;

@RestController
public class registroPuestoController {

    @Autowired
    private RegistroPuestoDao registroPuestoDao;

    // TRAER SELECT DEL TIPO DE PUESTO BASE/CONFIANZA
    @GetMapping("api/puesto/tipo")
    public List<ctg_lstpuesto> obtenerTipoPuesto() {
        return registroPuestoDao.obtenerTipoPuesto();
    }

    // REGISTRO PARA LA TABLA CTG_PERSONA
    @PostMapping("api/persona/registroPuesto")
    public boolean registroPuesto(@RequestBody ctg_puesto puesto) {
        try {
            if (registroPuestoDao.codigoExiste(puesto.getCtgp_codigo())) {
                return false;
            }
            return registroPuestoDao.registroPuesto(puesto);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Ocurrió un error al registrar el puesto.");
        }
    }

    // OBTENER LOS DATOS SEGUN EL CÓDIGO INGRESADO
    @GetMapping("api/puesto/{codigo}")
    public ResponseEntity<?> obtenerPuestoPorCodigo(@PathVariable String codigo) {
        List<ctg_puesto> puestos = registroPuestoDao.obtenerDatosXcodigoPuesto(codigo);
        if (!puestos.isEmpty()) {
            return ResponseEntity.ok(puestos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("api/obetenrdatos")
    public List<ctg_puesto> obtenerDatosctg_lstpuesto() {
        return registroPuestoDao.obtenerDatosctg_lstpuesto();
    }

    // OBTENER LA SITUUACIÓN PUESTO ACTIVO/INAACTIVO
    @GetMapping("api/situ/tipo")
    public List<ctg_lstpuesto> obtenerSituPuesto() {
        return registroPuestoDao.obtenerSituPuesto();
    }

    // ACTUALIZACIÓN DE LA TABLA CTG_PUESTO
    @PostMapping("api/puesto/actualizar")
    public ResponseEntity<String> actualizarPuesto(@RequestBody ctg_puesto puesto) {
        if (registroPuestoDao.actualizarPuesto(puesto)) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar puestoa.");
        }
    }

}
