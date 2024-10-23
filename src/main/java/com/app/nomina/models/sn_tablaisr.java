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
public class sn_tablaisr {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Getter @Setter
	private int tisr_id;
    
	@Column(name = "tisr_tabla", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal tisr_tabla;
	
	@Column(name = "tisr_renglon", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal tisr_renglon;
	
	@Column(name = "tisr_liminferior", precision = 12, scale = 3)
	@Getter @Setter
    private BigDecimal tisr_liminferior;
	
	@Column(name = "tisr_limsuperior", precision = 12, scale = 3)
	@Getter @Setter
    private BigDecimal tisr_limsuperior;
	
	@Column(name = "tisr_cuotafija", precision = 12, scale = 3)
	@Getter @Setter
    private BigDecimal tisr_cuotafija;
	
	@Column(name = "tisr_porcentaje", precision = 5, scale = 3)
	@Getter @Setter
    private BigDecimal tisr_porcentaje;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate tisr_fechainicio;
	
	@Getter	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate tisr_fechatermino;
	
	@Column(name = "tisr_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal tisr_ejercicio;
	
	@Column(name = "tisr_situacion", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal tisr_situacion;
	
}