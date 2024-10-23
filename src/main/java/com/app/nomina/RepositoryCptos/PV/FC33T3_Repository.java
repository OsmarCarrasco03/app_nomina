package com.app.nomina.RepositoryCptos.PV;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.nomina.models.sn_conceptosxpuesto;

public interface FC33T3_Repository extends JpaRepository<sn_conceptosxpuesto, Integer>{
	
	@Query(value = "SELECT fc33t3(:ejercicio, :zona)", nativeQuery = true)
	BigDecimal getFC33T3(@Param("ejercicio") Integer ejercicio, 
			@Param("zona") Integer zona);
	
}
