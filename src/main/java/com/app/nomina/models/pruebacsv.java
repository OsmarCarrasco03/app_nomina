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
@Table(name = "pruebacsv")
@ToString
@EqualsAndHashCode

public class pruebacsv {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)

	@Getter
	@Setter
	private Long prucsv_id;
	@Getter
	@Setter
	private String prucsv_nombre;
	@Getter
	@Setter
	private String prucsv_appaterno;
	@Getter
	@Setter
	private String prucsv_apmaterno;
	@Getter
	@Setter
	private Integer prucsv_numero;
	@Getter
	@Setter
	private Integer prucsv_situacion;

}