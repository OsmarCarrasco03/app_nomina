package com.app.nomina.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="sp_clasificadordegasto")
@ToString
@EqualsAndHashCode
public class sp_clasificadordegasto {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Getter
	@Setter
	private int cg_id;
	@Getter
	@Setter
	private String cg_clave;

	@Getter
	@Setter
	private String cg_nombre;

	@Getter
	@Setter
	private String cg_definicion;



	@Column(name = "cg_padre", precision = 6, scale = 0)
	@Getter
	@Setter
	private BigDecimal cg_padre;


	@Column(name = "cg_ejercicio", precision = 4, scale = 0)
	@Getter
	@Setter
	private BigDecimal cg_ejercicio;


	@Column(name = "cg_desagregado", precision = 1, scale = 0)
	@Getter
	@Setter
	private BigDecimal cg_desagregado;

	@Column(name = "cg_clase", precision = 1, scale = 0)
	@Getter
	@Setter
	private BigDecimal cg_clase;

	@Getter
	@Setter
	private String cg_abuelo;


	@Column(name = "cg_situacion", precision = 1, scale = 0)
	@Getter
	@Setter
	private BigDecimal cg_situacion;

	@Column(name = "cg_clavedep", precision = 6, scale = 0)
	@Getter
	@Setter
	private BigDecimal cg_clavedep;

	

	

}
