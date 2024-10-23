package com.app.nomina.services;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.nomina.models.*;
import org.springframework.stereotype.Repository;

@Repository
public interface sn_conceptosvariablesRepository extends JpaRepository<sn_conceptosvariables, Integer> {

    @Query(value = "SELECT var_id, var_idpersona, var_temporalidad,  \n" +
    "(SELECT lcv_descripcion FROM ctg_lstconvar WHERE lcv_clase = 1 AND lcv_clave = var_temporalidad) AS temp_desc, \n" +
    "var_tipoconcepto, listas_cptosnomina.lcdm_descripcion, \n" +
    "var_concepto, cptosdenomina.con_descripcion, var_cptoanteced, var_pagoanteced, var_idfactor,  \n" +
    "(SELECT lcv_descripcion FROM ctg_lstconvar WHERE lcv_clase = 2 AND lcv_clave = var_idfactor) AS idfactor_desc, \n" +
    "var_factor, var_importe, \n" +
    "var_contador, var_numnomina, nominas.nom_nombre, \n" +
    "var_axoi, var_periodoi, var_axof, var_periodof, \n" +
    "var_fechaocui, var_fechaocuf, var_axoproceso, var_perproceso, var_fechainicio, \n" +
    "var_fechatermino, var_usucapturo, var_fechamod, var_usumodifico, var_situacion, \n" +
    "var_forzarimporte, \n" +
    "(SELECT lcv_descripcion FROM ctg_lstconvar WHERE lcv_clase = 3 AND lcv_clave = var_forzarimporte) AS forimp_desc, \n" +
    "var_importeforzado \n" +
    "FROM sn_conceptosvariables \n" +
    "JOIN ctg_nominas AS nominas ON nom_clave = var_numnomina AND nom_ejercicio = (SELECT ejer_ejercicio FROM sn_ejercicio WHERE ejer_situacion = 1) \n" +
    "JOIN ctg_lstcptosdenomina AS listas_cptosnomina ON lcdm_clave = var_tipoconcepto AND lcdm_clase = 2 \n" +
    "JOIN ctg_conceptosdenomina AS cptosdenomina ON con_concepto = var_concepto \n" +
    "AND con_tipo = var_tipoconcepto AND con_ejercicio = nom_ejercicio AND con_tabla = :tabulador \n" +
    "WHERE var_idpersona = :idPersona", nativeQuery = true)
    List<Object[]> findAllDate(@Param("tabulador") Integer tabulador, @Param("idPersona") Integer idPersona);
}

    


