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
@Table(name = "ctg_municipio")
@ToString
@EqualsAndHashCode
public class ctg_municipio {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	@Getter
	@Setter
	private int mun_id;

	@Getter
	@Setter
	private int mun_edopadre;

	@Getter
	@Setter
	private int mun_numero;

	@Getter
	@Setter
	private String mun_nombre;

	@Getter
	@Setter
	private String mun_fechainicio;

	@Getter
	@Setter
	private String mun_fechatermino;

	@Getter
	@Setter
	private int mun_usucapturo;

	@Getter
	@Setter
	private String mun_fechamod;

	@Getter
	@Setter
	private int mun_usumodifico;

	@Getter
	@Setter
	private int mun_situacion;

}
