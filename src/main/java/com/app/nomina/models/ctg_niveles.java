package com.app.nomina.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ctg_niveles")
@ToString
@EqualsAndHashCode
public class ctg_niveles {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	@Setter
	private int nvl_id;

	@Getter
	@Setter
	private String nvl_nivel;

	@Getter
	@Setter
	private int nvl_zona;

	@Getter
	@Setter
	private int nvl_situacion;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate nvl_fechainicio;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate nvl_fechatermino;

	@Getter
	@Setter
	private int nvl_usucapturo;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate  nvl_fechamod;

	@Getter
	@Setter
	private int nvl_usumodifico;

}
