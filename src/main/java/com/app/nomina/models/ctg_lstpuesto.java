package com.app.nomina.models;

import java.time.LocalDate;

//import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

//import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ctg_lstpuesto")
@ToString
@EqualsAndHashCode

public class ctg_lstpuesto {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Getter
	@Setter
	private int lpto_id;

	@Getter
	@Setter
	private String lpto_clase;

	@Getter
	@Setter
	private String lpto_clave;

	@Getter
	@Setter
	private String lpto_descripcion;

	@Getter
	@Setter
	private String lpto_clasepadre;

	@Getter
	@Setter
	private String lpto_clavepadre;

	@Getter
	@Setter
	private String lpto_situacion;

@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate lpto_fechainicio;




}
