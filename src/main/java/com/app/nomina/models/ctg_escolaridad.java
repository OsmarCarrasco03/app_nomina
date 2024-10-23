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

@Entity // Marca la clase como una entidad JPA.
@Table(name = "ctg_escolaridad") // Determina el nombre de la tabla.
@ToString
@EqualsAndHashCode

public class ctg_escolaridad {
	@Id // Indica que es la clave priamria de la entidad
	@GeneratedValue(strategy = GenerationType.SEQUENCE) // Especifica la estrategia de generación de valores para la
														// clave primaria.

	@Getter
	@Setter
	private int esc_id;

	@Getter
	@Setter
	private String esc_descripcion;

}