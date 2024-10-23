package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.services.groupsService;

@RestController
@RequestMapping("/Groups")
public class groupController {

    private final groupsService GroupsService;

    @Autowired

public groupController (groupsService GroupsService){

    this.GroupsService = GroupsService;
}

@GetMapping("/{id}/descripcion")
public String obtenerDescripciondelGrupo(@PathVariable Integer id){

    return GroupsService.ObtenerDescripcion(id);

}

}
