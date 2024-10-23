package com.app.nomina.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.nomina.models.sn_periodosdepago;

public interface sn_periodosdepagoRepository extends JpaRepository<sn_periodosdepago, Integer>{
    @Query("SELECT pp_id, pp_ejercicio, pp_quincena, pp_fechadesde, pp_fechahasta, pp_operando, pp_fechaapertura, pp_usuaperturo, pp_fechacierre, pp_usucerro, pp_fechamod, pp_usumodifico FROM sn_periodosdepago")
    List<Object[]> queryUnoSnPeriodosP(); 

    // INICIO query para saber si ya existe el periodo X del año X
    @Query("SELECT p FROM sn_periodosdepago p WHERE p.pp_id = :pp_id")
    sn_periodosdepago findByIdPeriodo(@Param("pp_id")int pp_id);

    // INICIO query para validar que todas las nominas esten en estatus 2
	@Query("SELECT COUNT(*) FROM sn_nominasoperando WHERE nop_situacion = 1 AND nop_numnomina != 77 AND nop_ejercicio = :pp_ejercicio AND nop_periodo = :pp_quincena")
	int countNominasCerradas(@Param("pp_ejercicio")BigDecimal pp_ejercicio, @Param("pp_quincena")BigDecimal pp_quincena);
	// FIN query 

    // INICIO query para validar que todas los periodos esten en estatus 2
	@Query("SELECT COUNT(*) FROM sn_periodosdepago WHERE pp_ejercicio = :pp_ejercicio AND pp_operando = 1")
	int countPeriodosBaja(@Param("pp_ejercicio")BigDecimal pp_ejercicio);
	// FIN query 

    @Modifying
    @Query("UPDATE sn_periodosdepago SET pp_operando = 2, pp_fechacierre = :pp_fechacierre, pp_usucerro = :pp_usucerro, pp_fechamod = :pp_fechamod, pp_usumodifico = :pp_usumodifico WHERE pp_ejercicio = :pp_ejercicio AND pp_quincena = :pp_quincena")
    void cambiarDatosParaAño(@Param("pp_ejercicio") BigDecimal pp_ejercicio, @Param("pp_quincena") BigDecimal pp_quincena, @Param("pp_fechacierre") LocalDate pp_fechacierre, @Param("pp_usucerro") Integer pp_usucerro, @Param("pp_fechamod") LocalDate pp_fechamod, @Param("pp_usumodifico") Integer pp_usumodifico);
      
}