package com.app.nomina.services;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.app.nomina.models.*;

@Repository
public interface CtgLstcptosDenominaRepository extends JpaRepository<ctg_lstcptosdenomina, Integer> {

    @Query("SELECT lcdm_clave, lcdm_descripcion, lcdm_id FROM ctg_lstcptosdenomina WHERE lcdm_clase = 2 AND lcdm_clave NOT IN (5) ORDER BY lcdm_clave")
    List<Object[]> findByQuery();
}

