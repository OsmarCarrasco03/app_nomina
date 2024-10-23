package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.services.ctg_lstctabanperService;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/ctg_lstctab")
public class ctg_lstctabanperDisable {
    private final ctg_lstctabanperService lstctabanperService;

    @Autowired
    public ctg_lstctabanperDisable(ctg_lstctabanperService lstctabanperService){
        this.lstctabanperService = lstctabanperService;
    }

    @GetMapping("/tipo")
    public List<Object[]> queryUnoCtgLstCtaBanPer(){
        return lstctabanperService.queryUnoCtgLstCtaBanPer();
    }

    @GetMapping("/modopago")
    public List<Object[]> queryDosCtgLstCtaBanPer(){
        return lstctabanperService.queryDosCtgLstCtaBanPer();
    }

    @GetMapping("/moneda")
    public List<Object[]> queryTresCtgLstCtaBanPer(){
        return lstctabanperService.queryTresCtgLstCtaBanPer();
    }
}
