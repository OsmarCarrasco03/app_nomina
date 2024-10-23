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
@Table(name = "ctg_centrotrabajo")
@ToString
@EqualsAndHashCode
public class ctg_centrotrabajo {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	@Getter
	@Setter
	private int ctra_id;

	@Getter
	@Setter
	private String ctra_clave;

	@Getter
	@Setter
	private String ctra_nombre;

	@Getter
	@Setter
	private int ctra_territorio;

	@Getter
	@Setter
	private String ctra_calle;

	@Getter
	@Setter
	private String ctra_entrecalle1;

	@Getter
	@Setter
	private String ctra_entrecalle2;

	@Getter
	@Setter
	private String ctra_numext;

	@Getter
	@Setter
	private String ctra_numint;

	@Getter
	@Setter
	private String ctra_colonia;

	@Getter
	@Setter
	private Integer ctra_estado;

	@Getter
	@Setter
	private Integer ctra_municipio;

	@Getter
	@Setter
	private String ctra_localidad;

	@Getter
	@Setter
	private String ctra_codpostal;

	@Getter
	@Setter
	private int ctra_unidad;

	@Getter
	@Setter
	private int ctra_tipo;

	@Getter
	@Setter
	private int ctra_tipoadm;

	@Getter
	@Setter
	private String ctra_fechainicio;

	@Getter
	@Setter
	private String ctra_fechatermino;

	@Getter
	@Setter
	private int ctra_usucapturo;

	@Getter
	@Setter
	private String ctra_fechamod;

	@Getter
	@Setter
	private int ctra_usumodifico;

	@Getter
	@Setter
	private int ctra_situacion;

}



