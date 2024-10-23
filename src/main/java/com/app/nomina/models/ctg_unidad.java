package com.app.nomina.models;

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
@Table(name = "ctg_unidad")
@ToString
@EqualsAndHashCode
public class ctg_unidad {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Getter
	@Setter
	private int uni_id;

	@Getter
	@Setter
	private int uni_ejercicio;

	@Getter
	@Setter
	private String uni_idunidad;

	@Getter
	@Setter
	private String uni_desc;

	@Getter
	@Setter
	private int uni_idpadre;

	@Getter
	@Setter
	private int uni_tipo;

	@Getter
	@Setter
	private int uni_estado;

	@Getter
	@Setter
	private int uni_situacion;

	@Getter
	@Setter
	private int uni_tipofuncion;

}
