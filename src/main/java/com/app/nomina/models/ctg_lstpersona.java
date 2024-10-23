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
@Table(name = "ctg_lstpersona")
@ToString
@EqualsAndHashCode

public class ctg_lstpersona {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	@Getter
	@Setter
	private int lper_id;
	@Getter
	@Setter
	private int lper_clase;
	@Getter
	@Setter
	private int lper_clave;
	@Getter
	@Setter
	private String lper_descripcion;
	@Getter
	@Setter
	private int lper_clasepadre;
	@Getter
	@Setter
	private int lper_clavepadre;
	@Getter
	@Setter
	private int lper_situacion;

}
