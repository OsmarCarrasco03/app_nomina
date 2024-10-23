package com.app.nomina.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.app.nomina.models.*;

@Repository
public interface CtgnominasRepository extends JpaRepository<ctg_nominas, Integer>{

    @Query(value = "SELECT sn.nop_numnomina, cn.nom_nombre " +
                   "FROM sn_nominasoperando sn " +
                   "JOIN ctg_nominas cn ON cn.nom_clave = sn.nop_numnomina AND cn.nom_ejercicio = sn.nop_ejercicio " +
                   "WHERE sn.nop_ejercicio = (SELECT ejer_ejercicio FROM sn_ejercicio WHERE ejer_situacion = 1) " +
                   "AND sn.nop_periodo = (SELECT pp_quincena FROM sn_periodosdepago WHERE pp_operando = 1) " +
                   "AND sn.nop_situacion = 1", nativeQuery = true)
    

    /*@Query("select nop_numnomina, nom_nombre from sn_nominasoperando \n" + //
                "join ctg_nominas on nom_clave = nop_numnomina and nom_ejercicio = nop_ejercicio\n" + //
                "where nop_ejercicio = (select ejer_ejercicio from sn_ejercicio where ejer_situacion = 1) and nop_periodo = (select pp_quincena FROM sn_periodosdepago where pp_operando =1) and nop_situacion = 1\n" + //
                "")*/

    //@Query("SELECT nom_clave, nom_nombre, nom_id FROM ctg_nominas where nom_ejercicio = (select ejer_ejercicio from sn_ejercicio where ejer_situacion = 1) and nom_situacion = 1")
    List<Object[]> findByQueryListNom();
}

