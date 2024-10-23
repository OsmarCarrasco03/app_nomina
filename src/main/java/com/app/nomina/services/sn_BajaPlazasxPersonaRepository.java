package com.app.nomina.services;

import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.app.nomina.models.*;


@Repository
public interface sn_BajaPlazasxPersonaRepository extends JpaRepository<sn_plazapersona, Integer>{
    

    //Inicio query para insertar los datos de la tabla sn_plazapersona a sn_plazapersonaha

    @Query(value="INSERT INTO sn_plazapersonaha \n"
    + "SELECT * FROM sn_plazapersona \n"
    + "WHERE pxp_idplaza = :pxp_idplaza  or pxp_idpersona = :pxp_idpersona ", nativeQuery = true)
    List<Object[]>   insertdatasnplazapersonaha(@Param("pxp_idplaza") Integer pxp_idplaza, @Param("pxp_idpersona") Integer pxp_idpersona);

    //Fin query para insertar los datos de la tabla sn_plazapersona a sn_plazapersonaha

     //Inicio query para insertar la fechatermino a sn_plazapersonaha

     @Query(value="UPDATE sn_plazapersonaha \n"
     + "SET pxp_fechatermino = :pxp_fechatermino, pxp_situacion = 2 WHERE pxp_idplaza = :pxp_idplaza  or pxp_idpersona = :pxp_idpersona  ", nativeQuery = true)
     List<Object[]>   fechaterminosnplazapersonaha(@Param("pxp_idplaza") Integer pxp_idplaza, @Param("pxp_idpersona") Integer pxp_idpersona, @Param("pxp_fechatermino") Date pxp_fechatermino);
 
     //Fin query para insertar la fechatermino a sn_plazapersonaha
    
    //INICIO query para actualizar el plz_estatusocup a 2 en sn_plaza

    @Query(value="UPDATE sn_plaza \n"
    + "SET plz_estatusocup = 2 \n"
    + "WHERE plz_id = :plz_id", nativeQuery = true)
     List<Object[]>   actualizarestatusocupado(@Param("plz_id") Integer plz_id);

    //FIN query para actualizar el plz_estatusocup a 2 en sn_plaza

    //Inicio query para borrar las plazas de sn_plazapersona que ya fueron pasadas a sn_plazapersonaha
    @Query(value="DELETE FROM sn_plazapersona \n"
    + "WHERE pxp_idplaza = :pxp_idplaza or pxp_idpersona = :pxp_idpersona ", nativeQuery = true) 
    List<Object[]>   deletedatasnplazapersona(@Param("pxp_idplaza") Integer pxp_idplaza, @Param("pxp_idpersona") Integer pxp_idpersona);
    //Fin query para borrar las plazas de sn_plazapersona que ya fueron pasadas a sn_plazapersonaha

}
