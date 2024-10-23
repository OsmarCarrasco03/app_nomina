package com.app.nomina.models;

import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "sn_plazapersona")
@ToString @EqualsAndHashCode 

public class sn_plazapersona {

	@Id 
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	
	@Getter @Setter
	private int pxp_id;
	
	@Getter @Setter
	private int pxp_idplaza;
	
	@Getter @Setter
	private int pxp_idpersona;
	 
	@Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pxp_fechainicio;
	
	@Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pxp_fechatermino;
	
	@Getter @Setter
	private int pxp_usucapturo;
	
	@Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pxp_fechamod;
	
	@Getter @Setter
	private int pxp_usumodifico;
	
	@Getter @Setter
	private int pxp_situacion;
	
	@Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pxp_vigdesde;
	
	@Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pxp_vighasta;
}
