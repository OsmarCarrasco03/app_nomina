package com.app.nomina.models;

import java.time.LocalDate;

import javax.persistence.Column;
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
@Table(name = "sn_cfgpuesto")
@ToString @EqualsAndHashCode
public class sn_cfgpuesto {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Getter @Setter
	private Integer pto_id;
	
	@Getter @Setter
	private Integer pto_idcodpuesto;
	 
	@Getter @Setter
    private Integer pto_tipo;
    
	@Getter @Setter
    private Integer pto_zona;
	
	@Getter @Setter
    private Integer pto_nivel;

	@Getter @Setter
    private Integer pto_categoria;
	
	@Getter @Setter
    private Integer pto_subcategoria;
	
	@Getter @Setter
	private Integer pto_clasfinterna;

	@Getter @Setter
	private Integer pto_contratacion;

	@Getter @Setter
	private Integer pto_declaracion;

	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate pto_fechainicio;
	
	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(nullable = true)
	private LocalDate pto_fechatermino;
	
	@Getter @Setter
	private Integer pto_usucapturo;

	@Getter @Setter
	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(nullable = true)
	private LocalDate pto_fechamod;

	@Getter @Setter
	private Integer pto_usumodifico;
	
	@Getter @Setter
	private Integer pto_situacion;
}