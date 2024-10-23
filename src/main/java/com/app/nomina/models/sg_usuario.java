package com.app.nomina.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@EqualsAndHashCode
public class sg_usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Getter
	@Setter
	private int usu_id;

	@Getter
	@Setter
	private int usu_idpersona;

	@Getter
	@Setter
	private String usu_alias;

	@Getter
	@Setter
	private String usu_usuario;

	@Getter
	@Setter
	private String usu_passoriginal;

	@Getter
	@Setter
	private String usu_password;

	@Getter
	@Setter
	private int usu_reset;

	@Getter
	@Setter
	private int usu_administrador;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate usu_fechainicio;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(nullable = true)
	private LocalDate usu_fechatermino;

	@Getter
	@Setter
	private int usu_usucapturo;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate usu_fechamod;

	@Getter
	@Setter
	private int usu_usumodifico;

	@Getter
	@Setter
	private int usu_situacion;
}
