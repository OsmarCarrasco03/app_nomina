package com.app.nomina.services;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class consultaGenericaService {

    private final consultaGenericaRepository repository;
    

    public consultaGenericaService(consultaGenericaRepository repository) {
        this.repository = repository;

    }

    public List<Object[]> getallfindbyPercepcionesFijas(Integer tabulador, Integer idPuesto) {

        return repository.findByQueryListPercepcionFija(tabulador, idPuesto);

    }

    public List<Object[]> getallfindbyDeduccionesFijas(Integer tabulador, Integer idPuesto) {

        return repository.findByQueryListDeduccionFija(tabulador, idPuesto);

    }

    public List<Object[]> getallfindbyPercepcionesVariables(Integer tabulador, Integer idPersona) {

        return repository.findByQueryListPercepcionesVariables(tabulador, idPersona);

    }

    public List<Object[]> getallfindbyDeduccionesVariables(Integer tabulador, Integer idPersona) {

        return repository.findByQueryListDeduccionesVariables(tabulador, idPersona);

    }

    public List<Object[]> getallfindbyDatosgral(Integer idPersona) {

        return repository.findByQueryListDatosGral(idPersona);

    }
}
