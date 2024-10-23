package com.app.nomina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CtglstconvarService {

    private final CtglstconvarRepository repository;

    @Autowired
    public CtglstconvarService( CtglstconvarRepository repository){
        this.repository = repository;

    }

    public List<Object[]> findByQueryLstConvar(){
        return repository.findByQueryLstConVar();

    }

}
