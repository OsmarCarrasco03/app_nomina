package com.app.nomina.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.services.CtgTipoServPublicoService;


@RestController
@RequestMapping("/api/ServPub") //  /api/ServPub/tspCodigo
public class CtgTipoServPublicoController {

    private final CtgTipoServPublicoService ctgTipoServPublicoService;

    public CtgTipoServPublicoController(CtgTipoServPublicoService ctgTipoServPublicoService) {
        this.ctgTipoServPublicoService = ctgTipoServPublicoService;
    }

    @GetMapping("/tspCodigo")
    public List<String> getTspCodigo() {
        return ctgTipoServPublicoService.getAllTspCodigoData();
    }

    
}
