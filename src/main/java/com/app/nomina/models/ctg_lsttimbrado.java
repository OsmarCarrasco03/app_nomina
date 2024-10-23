package com.app.nomina.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity // Marca la clase como una entidad JPA.
@Table(name = "ctg_lsttimbrado") // Determina el nombre de la tabla.
@ToString
@EqualsAndHashCode

public class ctg_lsttimbrado {
	@Id // Indica que es la clave priamria de la entidad
	@GeneratedValue(strategy = GenerationType.SEQUENCE) // Especifica la estrategia de generación de valores para la
														// clave primaria.

	@Getter
	@Setter
	private int ltim_id;
	@Getter
	@Setter
	private int ltim_clase;
	@Getter
	@Setter
	private int ltim_clave;
	@Getter
	@Setter
	private String ltim_descripcion;
	@Getter
	@Setter
	private int ltim_clasepadre;
	@Getter
	@Setter
	private int ltim_clavepadre;
	@Getter
	@Setter
	private String ltim_clavealfabetica;

}