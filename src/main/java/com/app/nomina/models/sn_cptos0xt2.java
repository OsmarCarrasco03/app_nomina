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
public class sn_cptos0xt2 {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Getter @Setter
	private int c0x_id;
	
	@Column(name = "c0x_concepto", length = 4)
	@Getter @Setter
    private String c0x_concepto; 
	
	@Column(name = "c0x_tipo", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal c0x_tipo;
	
	@Column(name = "c0x_porcentaje", precision = 5, scale = 3)
	@Getter @Setter
    private BigDecimal c0x_porcentaje;
	
	@Column(name = "c0x_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal c0x_ejercicio;
	
	@Column(name = "c0x_tabla", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal c0x_tabla;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate c0x_fechainicio;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate c0x_fechatermino;
	
	@Getter @Setter
	private Integer c0x_usucapturo;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate c0x_fechamod;
	
	@Getter @Setter
	private Integer c0x_usumodifico;
	
	@Column(name = "c0x_situacion", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal c0x_situacion;
}
