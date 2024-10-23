package com.app.nomina.services;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.nomina.controllers.FuncionesGeneralesController;
import com.app.nomina.dao.FuncionesGeneralesDaoImp;
import com.app.nomina.models.*;
@Repository
public interface consultaGenericaRepository extends JpaRepository<sn_conceptosxpuesto, Integer> {



// Query par obtener las percepciones fijas de una persona en el tabulador de puestos 

    @Query(value = "select conxpuesto.cxpto_concepto, conxpuesto.cxpto_tipocpto, listas_desc.lcdm_descripcion as tipocpto_desc, "
            +
            "cptos_nomina.con_descripcion as cpto_desc, " +
            "conxpuesto.cxpto_importe " +
            "from sn_conceptosxpuesto conxpuesto " +
            "join ctg_lstcptosdenomina as listas_desc on listas_desc.lcdm_clave = cxpto_tipocpto and listas_desc.lcdm_clase = 2 "
            +
            "join ctg_conceptosdenomina as cptos_nomina on cptos_nomina.con_concepto = conxpuesto.cxpto_concepto " +
            "and cptos_nomina.con_tipo = conxpuesto.cxpto_tipocpto " +
            "and cptos_nomina.con_ejercicio = conxpuesto.cxpto_ejercicio and cptos_nomina.con_tabla = conxpuesto.cxpto_tabla "
            +
            "where cxpto_ejercicio = (SELECT ejer_ejercicio FROM sn_ejercicio WHERE ejer_situacion = 1) and cxpto_tabla = :tabulador and cxpto_situacion = 1 " //por lo pronto se pone directo la tabla = 1 (select vigt_tabla FROM sn_vigtabulador WHERE vigt_situacion = 1 )
            +
            "and cxpto_tipocpto = 1 " +
            "and cxpto_idpuesto = :idPuesto", nativeQuery = true)
    List<Object[]> findByQueryListPercepcionFija(@Param("tabulador") Integer tabulador, @Param("idPuesto") Integer idPuesto);

    // Query par obtener las deducciones fijas de una persona en el tabulador de puestos 

    @Query(value = "select conxpuesto.cxpto_concepto, conxpuesto.cxpto_tipocpto, listas_desc.lcdm_descripcion as tipocpto_desc, \n" + //
                "cptos_nomina.con_descripcion as cpto_desc,\n" + //
                "conxpuesto.cxpto_importe\n" + //
                "from sn_conceptosxpuesto conxpuesto\n" + //
                "join ctg_lstcptosdenomina as listas_desc on listas_desc.lcdm_clave = cxpto_tipocpto and listas_desc.lcdm_clase = 2\n" + //
                "join ctg_conceptosdenomina as cptos_nomina on cptos_nomina.con_concepto = conxpuesto.cxpto_concepto\n" + //
                "and cptos_nomina.con_tipo = conxpuesto.cxpto_tipocpto\n" + //
                "and cptos_nomina.con_ejercicio = conxpuesto.cxpto_ejercicio and cptos_nomina.con_tabla = conxpuesto.cxpto_tabla\n" + //
                "where cxpto_ejercicio = (SELECT ejer_ejercicio FROM sn_ejercicio WHERE ejer_situacion = 1) and cxpto_tabla = :tabulador and cxpto_situacion = 1\n" + //
                "and cxpto_tipocpto = 2 \n" + //
                "and cxpto_idpuesto = :idPuesto", nativeQuery = true)
                 
    List<Object[]> findByQueryListDeduccionFija(@Param("tabulador") Integer tabulador, @Param("idPuesto") Integer idPuesto);

    // Query par obtener las percepciones variables de una persona en el tabulador de puestos 

    @Query(value = "select var_concepto, var_cptoanteced, var_tipoconcepto, \n" + //
                "listas_desc.lcdm_descripcion as tipocpto_desc,\n" + //
                "cptos_nomina.con_descripcion as cpto_desc,\n" + //
                "var_pagoanteced, var_fechaocui, var_fechaocuf, var_importe\n" + //
                "from sn_conceptosvariables convar\n" + //
                "join ctg_lstcptosdenomina as listas_desc on listas_desc.lcdm_clave = convar.var_tipoconcepto and listas_desc.lcdm_clase = 2\n" + //
                "join ctg_conceptosdenomina as cptos_nomina on cptos_nomina.con_concepto = convar.var_concepto\n" + //
                "and cptos_nomina.con_tipo = convar.var_tipoconcepto\n" + //
                "and cptos_nomina.con_ejercicio = (SELECT ejer_ejercicio FROM sn_ejercicio WHERE ejer_situacion = 1) and cptos_nomina.con_tabla = :tabulador\n" + //
                "where var_tipoconcepto in (1,6,9,3,10,13) and var_idpersona = :idPersona", nativeQuery = true)
                 
    List<Object[]> findByQueryListPercepcionesVariables(@Param("tabulador") Integer tabulador, @Param("idPersona") Integer idPersona);

// Query par obtener las deducciones  varibles de una persona en el tabulador de puestos 

    @Query(value = "select var_concepto, var_cptoanteced, var_tipoconcepto, \n" + //
                "listas_desc.lcdm_descripcion as tipocpto_desc,\n" + //
                "cptos_nomina.con_descripcion as cpto_desc,\n" + //
                "var_pagoanteced, var_fechaocui, var_fechaocuf, var_importe\n" + //
                "from sn_conceptosvariables convar\n" + //
                "join ctg_lstcptosdenomina as listas_desc on listas_desc.lcdm_clave = convar.var_tipoconcepto and listas_desc.lcdm_clase = 2\n" + //
                "join ctg_conceptosdenomina as cptos_nomina on cptos_nomina.con_concepto = convar.var_concepto\n" + //
                "and cptos_nomina.con_tipo = convar.var_tipoconcepto\n" + //
                "and cptos_nomina.con_ejercicio = 2024 and cptos_nomina.con_tabla = :tabulador\n" + //
                "where var_tipoconcepto in (7,2,8,11,4,12) and var_idpersona = :idPersona", nativeQuery = true)
     
List<Object[]> findByQueryListDeduccionesVariables(@Param("tabulador") Integer tabulador, @Param("idPersona") Integer idPersona);


@Query(value = "select per_id, per_nombre, per_appaterno, per_apmaterno, \n" + //
        "per_situacion,\n" + //
        "(select lst_descripcion from ctg_lstgeneral where lst_clase = 1 and lst_clave = per_situacion ) as situacion,\n" + //
        "per_contratacion, per_curp, per_rfc, per_homoclave, per_noseguridad,\n" + //
        "per_numempleado,\n" + //
        "per_genero,\n" + //
        "(select lper_descripcion from ctg_lstpersona where lper_clase = 1 and lper_clave = per_genero) as genero,\n" + //
        "per_nacionalidad, \n" + //
        "(select lper_descripcion from ctg_lstpersona where lper_clase = 3 and lper_clave = per_nacionalidad) as nacionalidad,\n" + //
        "per_edocivil,\n" + //
        "(select lper_descripcion from ctg_lstpersona where lper_clase = 2 and lper_clave = per_edocivil) as estado_civil,\n" + //
        "per_idrusp,\n" + //
        "per_origenedo,\n" + //
        "(select edo_nombre from ctg_estado where edo_id = per_origenedo ) as estado_de_origen,\n" + //
        "per_origenmun, \n" + //
        "(select mun_nombre from ctg_municipio where mun_edopadre = per_origenedo and mun_numero = per_origenmun) as municipio_de_origen,\n" + //
        "per_fechaingresosp, per_fechaingreso, per_fechabaja, per_cpfiscal from sn_persona where per_id = :idPersona", nativeQuery = true)
     
List<Object[]> findByQueryListDatosGral(@Param("idPersona") Integer idPersona);



}
