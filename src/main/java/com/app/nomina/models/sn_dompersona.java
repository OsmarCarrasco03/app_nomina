package com.app.nomina.models;

import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "sn_dompersona")
@ToString @EqualsAndHashCode 
 
public class sn_dompersona { 
	@Id 
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	
	@Getter @Setter
	private int domp_id;
	 
	@Getter @Setter
	private Integer domp_idpersona;
	
	@Getter @Setter
	private Integer domp_territorio;
	
	@Getter @Setter
	private Integer domp_estado;
	
	@Getter @Setter
	private Integer domp_municipio;
	 
	@Getter @Setter
	private String domp_colonia;
	
	@Getter @Setter
	private Integer domp_codpostal;
	
	@Getter @Setter
	private String domp_calle;
	
	@Getter @Setter
	private String domp_numext;
	
	@Getter @Setter
	private String domp_numint;
	
	@Getter @Setter
	private String domp_telparticular;
	
	@Getter @Setter
	private Integer domp_estadocambio;
	
	@Getter @Setter
	private Integer domp_muncambio;
	
	@Getter @Setter
	private Integer domp_dispcambiores;
	
    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate domp_fechainicio;
	
    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate domp_fechatermino;
	
	@Getter @Setter
	private Integer domp_usucapturo;
	
    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate domp_fechamod;
	
	@Getter @Setter
	private Integer domp_usumodifico;
	
	@Getter @Setter
	private Integer domp_situacion;	
	
}