package com.app.nomina.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.nomina.models.sn_plaza;

import java.util.List;

public interface snNumeroPlazaRpository  extends JpaRepository<sn_plaza, Integer>{

    @Query("SELECT plz_id, plz_numero FROM sn_plaza")
    List<Object[]> numeroIdPlaza();
}
 