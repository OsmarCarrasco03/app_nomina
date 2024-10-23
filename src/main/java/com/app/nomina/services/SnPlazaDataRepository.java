package com.app.nomina.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.nomina.models.*;

public interface SnPlazaDataRepository extends JpaRepository<sn_plaza, Integer>{

    @Query("SELECT COUNT(p) FROM sn_plaza p WHERE p.plz_numero = :plzNumero")
    
    int countRegistros(@Param("plzNumero")int plzNumero);

    // Revisa que las combinaciones que se van a registrar no sean iguales a una existente
   /* @Query("SELECT COUNT(p) FROM sn_plaza p WHERE p.plz_numero = :plzNumero AND " +
    "p.plz_numplzpadre = :plzNumplzpadre AND p.plz_codintrhnet = :plzcodintrhnet AND " +
    "p.plz_estatusocup = :plzestatusocup AND p.plz_motoblidecpatri = :plzmotoblidecpatri AND " +
    "p.plz_areas = :plzareas AND p.plz_conpublicas = :plzconpublicas AND " +
    "p.plz_traclap = :plztraclap AND p.plz_traebi = :plztraebi AND " +
    "p.plz_traemdmajr = :plztraemdmajr AND p.plz_nivelequiv = :plznivelequiv AND " +
    "p.plz_unidad = :plzunidad AND p.plz_ptoautorizado = :plzptoautorizado AND " +
    "p.plz_ptopagado = :plzptopagado AND p.plz_rfiriuf = :plzrfiriuf AND " +
    "p.plz_tiposervpublico = :plztiposervpublico")

    int countRegistros(@Param("plzNumero")int plzNumero, @Param("plzNumplzpadre")int plzNumplzpadre, @Param("plzcodintrhnet")String plzcodintrhnet, @Param("plzestatusocup")int plzestatusocup, @Param("plzmotoblidecpatri")int plzmotoblidecpatri, @Param("plzareas")int plzareas, @Param("plzconpublicas")int plzconpublicas, 
    
    @Param("plztraclap")int plztraclap, @Param("plztraebi")int plztraebi, @Param("plztraemdmajr")int plztraemdmajr, @Param("plznivelequiv")int plznivelequiv, @Param("plzunidad")int plzunidad, @Param("plzptoautorizado")int plzptoautorizado, @Param("plzptopagado")int plzptopagado, @Param("plzrfiriuf")String plzrfiriuf, @Param("plztiposervpublico")String plztiposervpublico);
*/
    
	// INICIO query para hacer select del numero de plaza
	@Query("SELECT m FROM sn_plaza m WHERE m.plz_id = :plzNumero")
	sn_plaza findByIdPlaza(@Param("plzNumero")int plzNumero);
	// FIN query para hacer select del numero de plaza

}