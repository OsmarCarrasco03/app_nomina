package com.app.nomina.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@EqualsAndHashCode
public class sg_modulo {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Getter
	@Setter
	private Long mod_id;

	@Getter
	@Setter
	private String mod_descripcion;

	@Getter
	@Setter
	private String mod_url;

	@Getter
	@Setter
	private int mod_idpadre;

	@Getter
	@Setter
	private String mod_fechainicio;

	@Getter
	@Setter
	private String mod_fechatermino;

	@Getter
	@Setter
	private int mod_usucapturo;

	@Getter
	@Setter
	private String mod_fechamod;

	@Getter
	@Setter
	private int mod_usumodifico;

	@Getter
	@Setter
	private int mod_situacion;
}
