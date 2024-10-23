package com.app.nomina.services;


import org.springframework.stereotype.Service;

import com.app.nomina.models.ctg_grupfunyxresp;

@Service
public class groupsService {

   
    private final groupsRepository GroupRepository;


 
    public groupsService(groupsRepository GroupRepository) {
        this.GroupRepository = GroupRepository;
    }

    public String ObtenerDescripcion(Integer id){

        ctg_grupfunyxresp desc = GroupRepository.findById(id).orElse(null);

        if (desc != null) {
            return desc.getLgrup_descripcion();
        } else {
            return "Sin descripcion";
        }

    }

}
