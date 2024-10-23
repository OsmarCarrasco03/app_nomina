package com.app.nomina.services;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.nomina.models.*;

@Repository
public interface ProcesarNominaRepository extends JpaRepository<ctg_unidad, Integer> {

    @Query(value = "select uni_id, uni_idunidad, uni_desc from ctg_unidad \n"
    		+ "where uni_situacion = :uni_situacion  and uni_id != 37 \n"
    		+ "order by uni_idunidad", nativeQuery = true)
    
    List<Object[]> TraerTodasLasUnidades(
    							@Param("uni_situacion") Integer situacion);
    
    @Query(value = "select uni_id, uni_idunidad, uni_desc from ctg_unidad \n"
    		+ "where uni_tipo = :uni_tipo and uni_situacion = :uni_situacion and uni_id != 37 \n"
    		+ "order by uni_idunidad", nativeQuery = true)
                 
    List<Object[]> TraerUnidadesCentrales(@Param("uni_tipo") Integer tipo,
    							@Param("uni_situacion") Integer situacion);
    
    @Query(value = "select uni_id, uni_idunidad, uni_desc from ctg_unidad \n"
    		+ "where uni_tipo = :uni_tipo and uni_situacion = :uni_situacion and uni_id != 37 \n"
    		+ "order by uni_idunidad", nativeQuery = true)
                 
    List<Object[]> TraerUnidadesForaneas(@Param("uni_tipo") Integer tipo,
    							@Param("uni_situacion") Integer situacion);
    
    @Query(value = "SELECT per_id, per_curp, CONCAT(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) AS full_name, \n"
    		+ "per_situacion FROM sn_persona \n"
    		+ "WHERE CONCAT(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) LIKE '%' \n"
    		+ "OR per_apmaterno LIKE '%' OR CONCAT(per_appaterno, ' ', per_apmaterno) LIKE '%' \n"
    		+ "OR per_nombre LIKE '%' OR CONCAT(per_appaterno, ' ', per_apmaterno) LIKE '%' \n"
    		+ "OR per_curp LIKE '%' OR per_numempleado IS NOT NULL OR per_nombre LIKE '%' \n"
    		+ "OR per_appaterno LIKE '%' OR per_apmaterno LIKE '%' ", nativeQuery = true)
    
    List<Object[]> TraerListaPersonas();
    
    @Query(value = "SELECT per_id, per_curp, \n"
    		+ "CONCAT(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) AS nombre_completo, \n"
    		+ "per_situacion, \n"
    		+ "CASE \n"
    		+ "   WHEN per_situacion = 1 THEN 'Activo' \n"
    		+ "   WHEN per_situacion = 2 THEN 'Inactivo' \n"
    		+ "   ELSE 'Desconocido' \n"
    		+ "END AS situacion \n"
    		+ "FROM sn_persona WHERE per_curp LIKE CONCAT('%', :curp, '%')", nativeQuery = true)
    
    List<Object[]> BuscarEmpleadoPorCurp(@Param("curp") String curp);
}
