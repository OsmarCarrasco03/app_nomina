package com.app.nomina.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.services.CtgRfiRiufService;

@RestController
@RequestMapping("/api/riuf")
public class CtgRfiRiufController {

   private final CtgRfiRiufService riufService;

    
    public CtgRfiRiufController(CtgRfiRiufService riufService) {
        this.riufService = riufService;
    }

    @GetMapping("/riuf_riuf")
    public List<String> getRiufRiufData() {
        return riufService.getAllRiufData();
    }
}