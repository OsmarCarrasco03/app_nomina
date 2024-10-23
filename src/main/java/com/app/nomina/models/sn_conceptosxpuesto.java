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
public class sn_conceptosxpuesto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Getter @Setter
	private int cxpto_id;
    
	@Getter @Setter
	private int cxpto_idpuesto;
    
	@Column(name = "cxpto_concepto", length = 2)
	@Getter @Setter
    private String cxpto_concepto; 
    
	@Column(name = "cxpto_tipocpto", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal cxpto_tipocpto;
	
	@Column(name = "cxpto_importe", precision = 12, scale = 3)
	@Getter @Setter
    private BigDecimal cxpto_importe;
	
	@Getter @Setter
	private int cxpto_situacion;
	
	@Column(name = "cxpto_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal cxpto_ejercicio;
	
	@Column(name = "cxpto_tabla", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal cxpto_tabla;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate cxpto_fechainicio;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate cxpto_fechatermino;
	
	@Getter @Setter
	private int cxpto_usucapturo;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate cxpto_fechamod;
	
	@Getter @Setter
	private int cxpto_usumodifico;
}