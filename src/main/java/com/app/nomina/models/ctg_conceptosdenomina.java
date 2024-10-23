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
public class ctg_conceptosdenomina {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Getter @Setter
	private int con_id;
	
	@Column(name = "con_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal con_ejercicio;
	
	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate con_vigencia; 
	
	@Getter @Setter
    private String con_concepto;
	
	@Column(name = "con_clasificador", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal con_clasificador;
	
	@Column(name = "con_tipo", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal con_tipo;
	
	@Getter @Setter
    private String con_descripcion;
	
	@Getter @Setter
    private String con_partida;
	
	@Column(name = "con_tipoaplica", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_tipoaplica;
	
	@Column(name = "con_imprimir", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_imprimir;
	
	@Column(name = "con_tipoimporte", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_tipoimporte;
	
	@Column(name = "con_origenimp", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_origenimp;
	
	@Column(name = "con_origenfactor", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_origenfactor;
	
	@Column(name = "con_lovfactor", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_lovfactor;
	
	@Column(name = "con_importe", precision = 12, scale = 3)
	@Getter @Setter
    private BigDecimal con_importe;
	
	@Getter @Setter
	private int con_gvmodalidad;
	
	@Column(name = "con_gvfactor", precision = 11, scale = 2)
	@Getter @Setter
    private BigDecimal con_gvfactor;
	
	@Column(name = "con_gvtipointegra", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_gvtipointegra;
	
	@Column(name = "con_gvexcento", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_gvexcento;
	
	@Column(name = "con_gvexcmod", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_gvexcmod;
	
	@Column(name = "con_gvexcfavor", precision = 11, scale = 2)
	@Getter @Setter
    private BigDecimal con_gvexcfavor;
	
	@Column(name = "con_czmodalidad", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_czmodalidad;
	
	@Column(name = "con_czfactor", precision = 11, scale = 2)
	@Getter @Setter
    private BigDecimal con_czfactor;
	
	@Column(name = "con_tabla", precision = 3, scale = 0)
	@Getter @Setter
    private BigDecimal con_tabla;
	
	@Column(name = "con_precedencia", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal con_precedencia;
	
	@Column(name = "con_impuesto", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_impuesto;
	
	@Column(name = "con_subsidiar", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_subsidiar;
	
	@Column(name = "con_afxpension", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxpension;
	
	@Column(name = "con_afxsuspension", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxsuspension;
	
	@Column(name = "con_afxlicss", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxlicss;
	
	@Column(name = "con_afxfaltas", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxfaltas;
	
	@Column(name = "con_modoperacion", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_modoperacion;
	
	@Column(name = "con_afxanlretro", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxanlretro;
	
	@Column(name = "con_afxcalfrac", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxcalfrac;
	
	@Column(name = "con_afxpenneto", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxpenneto;
	
	@Column(name = "con_afxpenadic", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxpenadic;
	
	@Column(name = "con_subtcalac", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_subtcalac;
	
	@Column(name = "con_subtgrvac", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_subtgrvac;
	
	@Column(name = "con_subtcalba", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_subtcalba;
	
	@Column(name = "con_subtgrvba", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_subtgrvba;
	
	@Column(name = "con_subgasto", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_subgasto;
	
	@Column(name = "con_tipogasto", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_tipogasto;
	
	@Column(name = "con_grupoacum", precision = 3, scale = 0)
	@Getter @Setter
    private BigDecimal con_grupoacum;
	
	@Column(name = "con_grupoacumd", precision = 3, scale = 0)
	@Getter @Setter
    private BigDecimal con_grupoacumd;
	
	@Column(name = "con_gruposecu", precision = 3, scale = 0)
	@Getter @Setter
    private BigDecimal con_gruposecu;
	
	@Column(name = "con_clasegrpsec", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_clasegrpsec;
	
	@Column(name = "con_afxcancelacion", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxcancelacion;
	
	@Column(name = "con_afxreintegro", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxreintegro;
	
	@Column(name = "con_liqsueldos", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_liqsueldos;
	
	@Column(name = "con_liqotrasprest", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_liqotrasprest;
	
	@Column(name = "con_grpindemni", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_grpindemni;
	
	@Column(name = "con_tipocosto", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_tipocosto;
	
	@Column(name = "con_agrpxantecedente", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_agrpxantecedente;
	
	@Column(name = "con_rfpconcepto", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_rfpconcepto;
	
	@Column(name = "con_afxmbcotizable", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxmbcotizable;
	
	@Column(name = "con_tipocostocan", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_tipocostocan;
	
	@Getter @Setter
    private String con_equivtimbrado;
	
	@Column(name = "con_afxfiniquito", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_afxfiniquito;
	
	@Getter @Setter
    private String con_rubrocontable;
	
	@Column(name = "con_idprovgrp", precision = 9, scale = 0)
	@Getter @Setter
    private BigDecimal con_idprovgrp;
	
	@Column(name = "con_cequivtimbrado", precision = 3, scale = 0)
	@Getter @Setter
    private BigDecimal con_cequivtimbrado;
	
	@Getter @Setter
    private String con_cuentapasivo;
	
	@Getter @Setter
	private int con_costocentralizado;
	
	@Column(name = "con_modcontadores", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_modcontadores;
	
	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate con_fechainicio;
	
	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate con_fechatermino;
	
	@Getter @Setter
	private int con_usucapturo;
	
	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate con_fechamod;
	
	@Getter @Setter
	private int con_usumodifico;
	
	@Column(name = "con_situacion", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal con_situacion;

	@Column(name = "con_afxlicms")
	@Getter @Setter
    private Integer con_afxlicms;


	
}
