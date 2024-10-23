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
@Table(name = "sn_persona") // Determina el nombre de la tabla.
@ToString
@EqualsAndHashCode

public class sn_persona {
	@Id // Indica que es la clave priamria de la entidad
	@GeneratedValue(strategy = GenerationType.SEQUENCE) // Especifica la estrategia de generación de valores para la
														// clave primaria.

	@Getter
	@Setter
	private int per_id;

	@Getter
	@Setter
	private String per_curp;

	@Getter
	@Setter
	private String per_rfc;

	@Getter
	@Setter
	private String per_homoclave;

	@Getter
	@Setter
	private String per_nombre;

	@Getter
	@Setter
	private String per_appaterno;

	@Getter
	@Setter
	private String per_apmaterno;

	@Getter
	@Setter
	private Integer per_genero;

	@Getter
	@Setter
	private String per_noseguridad;

	@Getter
	@Setter
	private Integer per_edocivil;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate per_fechaingreso;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate per_fechaingresosp;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate per_fechabaja;

	@Getter
	@Setter
	private Integer per_nacionalidad;

	@Getter
	@Setter
	private Integer per_origenedo;

	@Getter
	@Setter
	private Integer per_origenmun;

	 @Getter
	@Setter
	private Integer per_numempleado;

	@Getter
	@Setter
	private Integer per_regimenissste;

	@Getter
	@Setter
	private String per_idrusp;

	@Getter
	@Setter
	private String per_idinfonacot;

	@Getter
	@Setter
	private Integer per_cpfiscal;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate per_fechanacimiento;

	@Getter
	@Setter
	private String per_email;

	@Getter
	@Setter
	private Integer per_tipodiscap;

	@Getter
	@Setter
	private Integer per_escolaridad;

	@Getter
	@Setter
	private Integer per_idioma;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate per_fechainicio;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate per_fechatermino;

	@Getter
	@Setter
	private int per_usucapturo;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate per_fechamod;

	@Getter
	@Setter
	private int per_usumodifico;

	@Getter
	@Setter
	private Integer per_situacion;

}