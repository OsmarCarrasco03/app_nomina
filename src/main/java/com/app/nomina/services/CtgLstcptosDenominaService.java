package com.app.nomina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CtgLstcptosDenominaService {

    private final CtgLstcptosDenominaRepository repository;

    @Autowired
    public CtgLstcptosDenominaService(CtgLstcptosDenominaRepository repository) {
        this.repository = repository;
    }

    public List<Object[]>findByQuery() {
        return repository.findByQuery();
    }
}

