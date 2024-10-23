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

@Entity
@EqualsAndHashCode
public class sn_salariosminimos {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Getter @Setter
	public int salm_id;
	
	@Column(name = "salm_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal salm_ejercicio;
	
	@Getter @Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate salm_fechainicio;
	
	@Getter @Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate salm_fechatermino;
	
	@Column(name = "salm_zona", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal salm_zona;
	
	@Column(name = "salm_importe", precision = 6, scale = 3)
	@Getter @Setter
    private BigDecimal salm_importe;
	
	@Column(name = "salm_tabla", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal salm_tabla;
	
	@Column(name = "salm_situacion", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal salm_situacion;
}
