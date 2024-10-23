package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.sn_plazapersona;

public interface sn_plazapersonaDAO {
    
    List<sn_plazapersona> queryUnoSnPlazaPersonaAllDatos(int pxp_idplaza);

    List<sn_plazapersona> queryDosSnPlazaPersonaAllDatos(int pxp_idpersona);

}


