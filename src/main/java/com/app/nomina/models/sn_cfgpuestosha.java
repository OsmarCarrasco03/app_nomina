package com.app.nomina.models;

import java.time.LocalDate;

//import java.time.LocalDate;


import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(name = "sn_cfgpuestoha")
@ToString
@EqualsAndHashCode
public class sn_cfgpuestosha {
	

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Getter
	@Setter
	private int pto_id;

    @Getter
	@Setter
	private int pto_idpuesto;

    @Getter
	@Setter
	private int pto_idcodpuesto;

    @Getter
	@Setter
	private int pto_tipo;

    @Getter
	@Setter
	private int pto_zona;

    @Getter
	@Setter
	private int pto_nivel;

    @Getter
	@Setter
	private int pto_categoria;

    @Getter
	@Setter
	private int pto_subcategoria;

    @Getter
	@Setter
	private int pto_clasfinterna;

    @Getter
	@Setter
	private int pto_contratacion;

    @Getter
	@Setter
	private int pto_declaracion;

    @Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate pto_fechainicio;

    @Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate pto_fechatermino;

    @Getter
	@Setter
	private int pto_usucapturo;

    @Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate pto_fechamod;

    @Getter
	@Setter
	private int pto_usumodifico;

    @Getter
	@Setter
	private int pto_situacion;

}
