package com.app.nomina.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@EqualsAndHashCode
public class test {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Getter
	@Setter
	private Long id;

	@Getter
	@Setter
	private String fecha;

	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate fecha_str;

}