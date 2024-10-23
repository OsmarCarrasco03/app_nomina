package com.app.nomina.services;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.nomina.models.sn_plazapersona;

public interface sn_plazapersonaRepository extends JpaRepository<sn_plazapersona, Integer>{
	// INICIO query para validar si ya tenemos un registro en sn_dompersona
	@Query("SELECT COUNT(p) FROM sn_plazapersona p WHERE p.pxp_idpersona = :idpersona")
	int countPlazaPersona(@Param("idpersona")int idpersona);
	// FIN query para validar si ya tenemos un registro en sn_dompersona
}
