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
@Table(name = "ctg_agrupamiento")
@ToString
@EqualsAndHashCode

public class ctg_agrupamiento {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	@Getter
	@Setter
	private int lagru_id;

	@Getter
	@Setter
	private int lagru_tipopuesto;

	@Getter
	@Setter
	private int lagru_tipogrupfun;

	@Getter
	@Setter
	private int lagru_clave;

	@Getter
	@Setter
	private String lagru_descripcion;

	@Getter
	@Setter
	private int lagru_situacion;

}
