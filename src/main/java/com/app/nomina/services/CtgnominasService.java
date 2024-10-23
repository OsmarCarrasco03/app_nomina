package com.app.nomina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CtgnominasService {

    private final CtgnominasRepository repository;

    @Autowired
    public CtgnominasService(CtgnominasRepository repository){

        this.repository = repository;

    }

    public List<Object[]> findByQueryListNom(){
        return repository.findByQueryListNom();
    }

}
