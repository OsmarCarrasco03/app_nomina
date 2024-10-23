package com.app.nomina.models;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Entity
@Table(name = "sn_plaza")
@ToString @EqualsAndHashCode 

public class sn_plaza {

    @Id 
	@GeneratedValue(strategy= GenerationType.IDENTITY)/* para resolver el problema del incremento de id que no inicia en 1 se comento 
    esta linea y se intento con .AUTO y .SECUENCE */

    @Getter @Setter
    private int plz_id;

    @Getter @Setter
    private Integer plz_numero;

    @Getter @Setter
    private Integer plz_numplzpadre;

    @Getter @Setter
    private String plz_codintrhnet;

    @Getter @Setter
    private int plz_estatusocup;

    @Getter @Setter
    private int plz_motoblidecpatri;

    @Getter @Setter
    private String plz_areas;

    @Getter @Setter
    private String plz_conpublicas; 

    @Getter @Setter
    private String plz_traclap;

    @Getter @Setter
    private String plz_traebi;

    @Getter @Setter
    private int plz_traemdmajr;

    @Getter @Setter
    private int plz_nivelequiv;

    @Getter @Setter
    private String plz_rfiriuf;

    @Getter @Setter
    private String plz_tiposervpublico;

    @Getter @Setter
    private int plz_unidad;

    @Getter @Setter
    private int plz_centrodist;

    @Getter @Setter
    private int plz_centrotrabajo;

    @Getter @Setter
    private int plz_ptoautorizado;

    @Getter @Setter
    private int plz_ptopagado;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Getter @Setter
    private LocalDate plz_fechainicio;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Getter @Setter
    private LocalDate plz_fechatermino;

    @Getter @Setter
    private int plz_usucapturo;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Getter @Setter
    private LocalDate plz_fechamod;

    @Getter @Setter
    private int plz_usumodifico;

    @Getter @Setter
    private int plz_situacion;

}
