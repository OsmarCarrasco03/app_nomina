package com.app.nomina.services;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.app.nomina.models.ctg_estado;

public interface ctg_estadoRepository extends JpaRepository<ctg_estado, Integer>{
	@Query("SELECT edo_id, edo_nombre FROM ctg_estado ORDER BY edo_id")
	List<Object[]> queryUnoCtgEstado();
}