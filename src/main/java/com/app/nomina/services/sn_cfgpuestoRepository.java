package com.app.nomina.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.nomina.models.sn_cfgpuesto;

public interface sn_cfgpuestoRepository extends JpaRepository<sn_cfgpuesto, Integer> {
    @Query("SELECT COUNT(p) FROM sn_cfgpuesto p WHERE p.pto_tipo = :ptotipo " +
    "AND p.pto_zona = :ptozona " +
    "AND p.pto_nivel = :ptonivel " +
    "AND p.pto_contratacion = :ptocontratacion")
 int countCuentasRegistros(@Param("ptotipo") int ptotipo,
                           @Param("ptozona") int ptozona,
                           @Param("ptonivel") int ptonivel,
                           @Param("ptocontratacion") int ptocontratacion);
}

