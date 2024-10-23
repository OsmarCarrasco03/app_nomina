package com.app.nomina.services;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.app.nomina.models.*;

@Repository
public interface CtgConceptosDeNominaRepository extends JpaRepository<ctg_conceptosdenomina, Integer> {

    @Query("select con_concepto, con_descripcion, con_tipo, con_id from ctg_conceptosdenomina where con_ejercicio = (select ejer_ejercicio from sn_ejercicio where ejer_situacion = 1) and con_situacion = 1 \n" + //
                " and con_tabla = (select vigt_tabla from sn_vigtabulador where vigt_ejercicio =(select ejer_ejercicio from sn_ejercicio where ejer_situacion = 1) and vigt_situacion = 1)")
    List<Object[]> findByQueryConcepto();

    @Query("select con_concepto from ctg_conceptosdenomina\n" + //
                "where con_ejercicio = (select ejer_ejercicio from sn_ejercicio where ejer_situacion = 1) and con_situacion = 1\n" + //
                "and con_tipo in (1,2,3,4) and con_tabla = (select vigt_tabla from sn_vigtabulador where vigt_ejercicio =(select ejer_ejercicio from sn_ejercicio where ejer_situacion = 1) and vigt_situacion = 1)\n" + //
                "group by con_concepto\n" + //
                "order by con_concepto")
    List<Object[]> findByQueryConceptoAnt();
}
