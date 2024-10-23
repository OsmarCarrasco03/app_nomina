package com.app.nomina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SnPersonaSituacionService {

    private final SnPersonaSituacionRepository repository;

    @Autowired
    public SnPersonaSituacionService(SnPersonaSituacionRepository repository){

        this.repository = repository;

    }

    public List<Object[]> findByQueryPersona() {

        return repository.findByQueryPersona();
    }

}
