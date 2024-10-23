package com.app.nomina.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "pruebapdf")
@ToString
@EqualsAndHashCode
public class pruebapdf {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)

	@Getter
	@Setter
	private Long pru_id;
	@Getter
	@Setter
	private String pru_nombrepdf;
	@Getter
	@Setter
	@Lob
	private byte[] pru_documento;
	@Getter
	@Setter
	private int pru_situacion;
}
