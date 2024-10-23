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
@Table(name = "ctg_centrodist")
@ToString
@EqualsAndHashCode
public class ctg_centrodist {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	@Getter
	@Setter
	private int cdis_id;

	@Getter
	@Setter
	private String cdis_clave;

	@Getter
	@Setter
	private String cdis_nombre;

	@Getter
	@Setter
	private Integer cdis_estado;

	@Getter
	@Setter
	private int cdis_unidad;

	@Getter
	@Setter
	private String cdis_fechainicio;

	@Getter
	@Setter
	private String cdis_fechatermino;

	@Getter
	@Setter
	private int cdis_usucapturo;

	@Getter
	@Setter
	private String cdis_fechamod;

	@Getter
	@Setter
	private int cdis_usumodifico;

	@Getter
	@Setter
	private int cdis_situacion;

}
