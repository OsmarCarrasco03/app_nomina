package com.app.nomina.services;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.app.nomina.models.ctg_lstctabanper;

public interface ctg_lstctabanperRepository extends JpaRepository<ctg_lstctabanper, Integer>{
    //Clase 1 Select Tipo
    @Query("SELECT ctal_clave, ctal_descripcion FROM ctg_lstctabanper WHERE ctal_clase='1'")
	List<Object[]> queryUnoCtgLstCtaBanPer();

    //Clase 2 Select Modo Pago
    @Query("SELECT ctal_clave, ctal_descripcion FROM ctg_lstctabanper WHERE ctal_clase='2'")
	List<Object[]> queryDosCtgLstCtaBanPer();

    //Clase 3 Select Moneda
    @Query("SELECT ctal_clave, ctal_descripcion FROM ctg_lstctabanper WHERE ctal_clase='3'")
	List<Object[]> queryTresCtgLstCtaBanPer();

} 
