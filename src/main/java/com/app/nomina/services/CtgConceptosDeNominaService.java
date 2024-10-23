package com.app.nomina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CtgConceptosDeNominaService {

    private final CtgConceptosDeNominaRepository repository;

    @Autowired
    public CtgConceptosDeNominaService(CtgConceptosDeNominaRepository repository){
        this.repository = repository;
    }

    public List<Object[]> findByQueryConcepto() {
        return repository.findByQueryConcepto();
    }

    public List<Object[]> findByQueryConceptoAnt() {
        return repository.findByQueryConceptoAnt();
    }
}
