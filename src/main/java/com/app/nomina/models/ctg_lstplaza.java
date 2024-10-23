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
@Table(name = "ctg_lstplaza")
@ToString
@EqualsAndHashCode
public class ctg_lstplaza {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Getter
	@Setter
	private int lplz_id;

	@Getter
	@Setter
	private int lplz_clase;

	@Getter
	@Setter
	private int lplz_clave;

	@Getter
	@Setter
	private String lplz_descripcion;

}
