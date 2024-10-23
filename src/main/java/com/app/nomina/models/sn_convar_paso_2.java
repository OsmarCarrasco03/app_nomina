package com.app.nomina.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString @EqualsAndHashCode
public class sn_convar_paso_2 {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)

	 @Getter
	 @Setter
	 private String var_curp;

	 @Getter
	 @Setter
	 private String var_temporalidad;


	 @Getter
	 @Setter
	 private String var_tipoconcepto;


	 @Getter
	 @Setter
	 private String var_concepto;



	 @Getter
	 @Setter
	 private String var_cptoanteced;


	 @Getter
	 @Setter
	 private String var_pagoanteced;

	 @Getter
	 @Setter
	 private String var_idfactor;


	@Column(name = "var_factor", precision = 15, scale = 3)
	@Getter @Setter
    private BigDecimal var_factor;


	@Column(name = "var_importe", precision = 15, scale = 3)
	@Getter @Setter
    private BigDecimal var_importe;



	@Column(name = "var_contador", precision = 8, scale = 0)
	@Getter @Setter
    private BigDecimal var_contador;


	@Column(name = "var_numnomina", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal var_numnomina;


	@Column(name = "var_axoi", precision = 6, scale = 0)
	@Getter @Setter
    private BigDecimal var_axoi;


	@Column(name = "var_periodoi", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal var_periodoi;

	@Getter
	@Setter
	private Integer var_axof;



	@Getter
	@Setter
	private String var_periodof;


	@Getter
	@Setter
	private String var_fechaocui;

	@Getter
	@Setter
	private String var_fechaocuf;


	@Column(name = "var_axoproceso", precision = 6, scale = 0)
	@Getter @Setter
    private BigDecimal var_axoproceso;



	@Column(name = "var_perproceso", precision = 4	, scale = 0)
	@Getter @Setter
    private BigDecimal var_perproceso;


	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(nullable = true)
	private LocalDate var_fechainicio;



	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(nullable = true)
	private LocalDate var_fechatermino;



	@Getter
	@Setter
	private int var_usucapturo;



	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(nullable = true)
	private LocalDate var_fechamod;


	@Getter
	@Setter
	private int var_usumodifico;

	@Column(name = "var_situacion", precision = 1	, scale = 0)
	@Getter @Setter
    private BigDecimal var_situacion;


	@Column(name = "var_estatus", precision = 2	, scale = 0)
	@Getter @Setter
    private BigDecimal var_estatus;


	@Getter
	@Setter
	private String var_error;














	
	

	
}
