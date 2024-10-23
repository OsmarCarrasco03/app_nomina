package com.app.nomina.services;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.nomina.models.sn_ctabancpersona;

public interface sn_ctabancperRepository extends JpaRepository<sn_ctabancpersona, Integer>{

    @Query("SELECT COUNT(p) FROM sn_ctabancpersona p WHERE p.ctab_idpersona = :idpersona")
    int countCuentasRegistros(@Param("idpersona")int idpersona);

    // @Query("SELECT COUNT(p) FROM sn_ctabancpersona p WHERE p.ctab_idpersona = :idpersona AND " +
    // "p.ctab_banco = :banco AND p.ctab_clabeinter = :clabeinter AND s" +
    // "p.ctab_cuenta = :cuenta AND p.ctab_moneda = :moneda AND " +
    // "p.ctab_tipo = :tipo AND p.ctab_modpago = :modpago AND " +
    // "p.ctab_fechainicio = :fechainicio AND p.ctab_fechatermino = :fechatermino AND " +
    // "p.ctab_usucapturo = :usucapturo AND p.catb_fechamod = :fechamod AND " +
    // "p.catb_usumodifico = :usumodifico AND p.catb_situacion = :situacion")

    // int countCuentasRegistros(@Param("idpersona")int idpersona, 
    // @Param("banco")int banco, @Param("clabeinter")int clabeinter,
    // @Param("cuenta")String cuenta, @Param("moneda")int codpostal, 
    // @Param("tipo")String tipo, @Param("modpago")String modpago, 
    // @Param("fechainicio")String fechainicio, @Param("fechatermino")String fechatermino, 
    // @Param("usucapturo")int usucapturo, @Param("fechamod")Date fechamod, 
    // @Param("usumodifico")int usumodifico, @Param("situacion")int situacion);

    @Query("SELECT p.ctab_idpersona, p.ctab_banco, p.ctab_clabeinter, p.ctab_cuenta, p.ctab_moneda, p.ctab_tipo, p.ctab_modpago, p.ctab_fechainicio, p.ctab_fechatermino, p.ctab_usucapturo, p.ctab_fechamod, p.ctab_usumodifico, p.ctab_situacion, u1.usu_alias AS usuCap, u2.usu_alias AS usuMod\n"
                +"FROM sn_ctabancpersona p\n"
                +"LEFT JOIN sg_usuario u1 ON ctab_usucapturo = u1.usu_id\n"
                +"LEFT JOIN sg_usuario u2 ON ctab_usumodifico = u2.usu_id\n"
                +"WHERE p.ctab_situacion = 1")
	List<Object[]> queryUnoCtaBancPersona();
    
    @Query("SELECT p FROM sn_ctabancpersona p WHERE p.ctab_idpersona = :persona AND p.ctab_situacion = :situacion")
	sn_ctabancpersona findByPersonaAndSituacionCTABANCPERSONA(@Param("persona") Integer persona, @Param("situacion") Integer situacion);
}


