package com.app.nomina.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.app.nomina.models.*;

@Repository
public interface SnPersonaSituacionRepository extends JpaRepository<sn_persona, Integer> {

    @Query("select per_id, per_curp, per_nombre, per_appaterno, per_apmaterno, per_situacion, per_numempleado from sn_persona")
    List<Object[]> findByQueryPersona();

}
