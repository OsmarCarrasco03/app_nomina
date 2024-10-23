package com.app.nomina.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.nomina.models.ctg_unidad;
import com.app.nomina.models.sn_persona;

@Service
public class ProcesarNominaService {

    private final ProcesarNominaRepository repository;

    public ProcesarNominaService(ProcesarNominaRepository repository) {
        this.repository = repository;
    }

    public List<Object[]> TraerTodasLasUnidades(ctg_unidad unidad) {

        return repository.TraerTodasLasUnidades(unidad.getUni_situacion());
    }
    
    public List<Object[]> TraerUnidadesCentrales(ctg_unidad unidad) {

        return repository.TraerUnidadesCentrales(unidad.getUni_tipo(), unidad.getUni_situacion());
    }
    
    public List<Object[]> TraerUnidadesForaneas(ctg_unidad unidad) {

        return repository.TraerUnidadesForaneas(unidad.getUni_tipo(), unidad.getUni_situacion());
    }
    
    public List<Object[]> TraerListaPersonas() {

        return repository.TraerListaPersonas();
    }
    
    public List<Object[]> BuscarEmpleadoPorCurp(sn_persona curp) {

        return repository.BuscarEmpleadoPorCurp(curp.getPer_curp());
    }
}
