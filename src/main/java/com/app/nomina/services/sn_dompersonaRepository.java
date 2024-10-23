package com.app.nomina.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.nomina.models.sn_dompersona;

public interface sn_dompersonaRepository extends JpaRepository<sn_dompersona, Integer>{
	
	// INICIO query para validar si ya tenemos un registro en sn_dompersona
	
	@Query("SELECT COUNT(p) FROM sn_dompersona p WHERE p.domp_idpersona = :idpersona")
	int countDomicilioRegistros(@Param("idpersona")int idpersona);
	
	// FIN query para validar si ya tenemos un registro en sn_dompersona
	
	// INICIO query para traer los datos de sn_dompersona
	  
	@Query("SELECT e.domp_idpersona, e.domp_estado, e.domp_municipio, e.domp_colonia, e.domp_codpostal, e.domp_calle, e.domp_numext, e.domp_numint, e.domp_telparticular, e.domp_fechainicio, e.domp_fechatermino, e.domp_usucapturo, e.domp_fechamod, e.domp_usumodifico, e.domp_situacion, u1.usu_alias AS usuCap, u2.usu_alias AS usuMod\n"
			+ "FROM sn_dompersona e\n"
			+ "LEFT JOIN sg_usuario u1 ON e.domp_usucapturo = u1.usu_id\n"
			+ "LEFT JOIN sg_usuario u2 ON e.domp_usumodifico = u2.usu_id\n"
			+ "WHERE e.domp_situacion = 1")
			List<Object[]> queryUnoSnDompersona();
	
	// FIN query para traer los datos de sn_dompersona
	
	// INICIO query para solo traer los id y situacion que correspondan en modificar domicilio

	@Query("SELECT m FROM sn_dompersona m WHERE m.domp_idpersona = :persona AND m.domp_situacion = :situacion")
	sn_dompersona findByPersonaAndSituacion(@Param("persona") Integer persona, @Param("situacion") Integer situacion);
	
	// FIN query para solo traer los id y situacion que correspondan en modificar domicilio
}