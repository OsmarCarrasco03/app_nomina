package com.app.nomina.services;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.app.nomina.models.*;

@Repository
public interface CtglstconvarRepository extends JpaRepository<ctg_lstconvar, Integer>{

    @Query("select lcv_clase, lcv_clave, lcv_descripcion, lcv_id from ctg_lstconvar order by lcv_clave")
    List<Object[]> findByQueryLstConVar();

}
