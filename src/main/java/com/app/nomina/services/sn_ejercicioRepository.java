package com.app.nomina.services;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.nomina.models.sn_ejercicio;

public interface sn_ejercicioRepository extends JpaRepository<sn_ejercicio, Integer>{

    @Query("SELECT ejer_ejercicio FROM sn_ejercicio WHERE ejer_situacion = 1")
    List<Object[]> queryUnoSnEjercicio(); 

    @Query("SELECT ejer_id, ejer_ejercicio, ejer_fechainicio, ejer_fechatermino, ejer_usucapturo, ejer_fechamod, ejer_usumodifico, ejer_situacion FROM sn_ejercicio")
    List<Object[]> queryDosSnEjercicio();

    // Query que se usa en sn_periodosdepagoController para validacion de si ya hay un año ya existente
	@Query("SELECT COUNT(p) FROM sn_ejercicio p WHERE p.ejer_ejercicio = :ejerejercicio")
	int countSnEjercicio(@Param("ejerejercicio")BigDecimal ejerejercicio);

    // Query para traerme el año pasado en sn_periodosdepagoController
	@Query("SELECT m FROM sn_ejercicio m WHERE m.ejer_ejercicio = :ejerejercicio")
	sn_ejercicio findBySnEjercicio(@Param("ejerejercicio")BigDecimal ejerejercicio);
	
}