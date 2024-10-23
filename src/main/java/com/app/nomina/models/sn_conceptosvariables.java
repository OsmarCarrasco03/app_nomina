package com.app.nomina.models;

import java.time.LocalDate;
import javax.persistence.*;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
 
@Entity
@Table(name = "sn_conceptosvariables")
@ToString @EqualsAndHashCode
public class sn_conceptosvariables {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Getter @Setter
	private int var_id;

    @Getter @Setter
	private int var_idpersona;

    @Getter @Setter
	private int var_temporalidad;

    @Getter @Setter
	private int var_tipoconcepto;
    
    @Getter @Setter
	private String var_concepto;

    @Getter @Setter @Nullable
	private String var_cptoanteced;

    @Getter @Setter @Nullable
	private String var_pagoanteced;

    @Getter @Setter
	private int var_idfactor;

    @Getter @Setter
	private int var_factor;

    @Getter @Setter
	private int var_importe;

    @Getter @Setter
	private int var_contador;

    @Getter @Setter
	private int var_numnomina;

    @Getter @Setter
	private int var_axoi;

    @Getter @Setter
	private int var_periodoi;

    @Getter @Setter @Nullable
	private Integer var_axof;

    @Getter @Setter @Nullable
	private Integer var_periodof;

    @Getter @Setter
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate var_fechaocui;

    @Getter @Setter @Nullable
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate var_fechaocuf;

    @Getter @Setter
	private int var_axoproceso;

    @Getter @Setter
	private int var_perproceso;

    @Getter @Setter
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate var_fechainicio;

    @Getter @Setter @Nullable
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate var_fechatermino;

    @Getter @Setter
	private int var_usucapturo;

    @Getter @Setter
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate var_fechamod;

    @Getter @Setter
	private int var_usumodifico;

    @Getter @Setter
	private int var_situacion;
    
    @Getter @Setter
	private int var_forzarimporte;

    @Getter @Setter
	private int var_importeforzado;

}
