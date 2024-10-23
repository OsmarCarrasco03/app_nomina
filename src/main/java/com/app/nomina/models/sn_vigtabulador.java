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
public class sn_vigtabulador {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Getter @Setter
	private int vigt_id;
    
	@Column(name = "vigt_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal vigt_ejercicio;
	
	@Column(name = "vigt_tabla", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal vigt_tabla;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate vigt_vigdesde;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate vigt_vighasta;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate vigt_fechainicio;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate vigt_fechatermino;
	
	@Getter @Setter
	private Integer vigt_usucapturo;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate vigt_fechamod;
	
	@Getter @Setter
	private Integer vigt_usumodifico;
    
	@Getter @Setter
	private Integer vigt_situacion;
}