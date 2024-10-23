package com.app.nomina.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ctg_lstctabanperService {

    private final ctg_lstctabanperRepository lstctabanperRepository;

    @Autowired
    public ctg_lstctabanperService(ctg_lstctabanperRepository lstctabanperRepository){
        this.lstctabanperRepository = lstctabanperRepository;
    }

    //Clase 1 Select Tipo
    public List<Object[]> queryUnoCtgLstCtaBanPer() {
        return lstctabanperRepository.queryUnoCtgLstCtaBanPer();
    }

    //Clase 2 Modo Pago
    public List<Object[]> queryDosCtgLstCtaBanPer() {
        return lstctabanperRepository.queryDosCtgLstCtaBanPer();
    }

    //Clase 3 Moneda
    public List<Object[]> queryTresCtgLstCtaBanPer() {
        return lstctabanperRepository.queryTresCtgLstCtaBanPer();
    }
    
}
