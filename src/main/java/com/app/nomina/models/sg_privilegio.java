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
public class sg_privilegio {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Getter
	@Setter
	private int priv_id;

	@Getter
	@Setter
	private int priv_idusuario;

	@Getter
	@Setter
	private int priv_idmodulo;

	@Getter
	@Setter
	private String priv_fechainicio;

	@Getter
	@Setter
	private String priv_fechatermino;

	@Getter
	@Setter
	private int priv_usucapturo;

	@Getter
	@Setter
	private String priv_fechamod;

	@Getter
	@Setter
	private int priv_usumodifico;

	@Getter
	@Setter
	private int priv_situacion;
}
