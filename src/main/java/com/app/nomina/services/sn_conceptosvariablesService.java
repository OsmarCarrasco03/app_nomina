package com.app.nomina.services;

import java.time.LocalDate;
import java.util.*;

import org.springframework.stereotype.Service;
import com.app.nomina.models.*;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class sn_conceptosvariablesService {

    private final sn_conceptosvariablesRepository repository;

    public sn_conceptosvariablesService(sn_conceptosvariablesRepository repository) {
        this.repository = repository;
    }

    public sn_conceptosvariables guardaInfo(sn_conceptosvariables info) {
        return repository.save(info);
    }

    public List<Object[]> findAllDate(Integer tabulador, Integer idPersona) {
        return repository.findAllDate(tabulador, idPersona);
    }

    public sn_conceptosvariables ActualizaInfo(JsonNode info, int id) {
        Optional<sn_conceptosvariables> optionalInfo = repository.findById(id);
        if (optionalInfo.isPresent()) {
            sn_conceptosvariables existingInfo = optionalInfo.get();
            
            if (info.has("var_cptoanteced")) {
                existingInfo.setVar_cptoanteced(info.get("var_cptoanteced").asText());
            }
            if (info.has("var_factor")) {
                existingInfo.setVar_factor(info.get("var_factor").asInt());
            }
            if (info.has("var_importe")) {
                existingInfo.setVar_importe(info.get("var_importe").asInt());
            }
            if (info.has("var_fechaocui")) {
                existingInfo.setVar_fechaocui(LocalDate.parse(info.get("var_fechaocui").asText()));
            }
            if (info.has("var_fechaocuf")) {
                existingInfo.setVar_fechaocuf(LocalDate.parse(info.get("var_fechaocuf").asText()));
            }
            if (info.has("var_forzarImporte")) {
                existingInfo.setVar_forzarimporte(info.get("var_forzarImporte").asInt());
            }
            if (info.has("var_importeforzado")) {
                existingInfo.setVar_importeforzado(info.get("var_importeforzado").asInt());
            }
            return repository.save(existingInfo);
        } else {
            
            return null;
        }
    }

}
