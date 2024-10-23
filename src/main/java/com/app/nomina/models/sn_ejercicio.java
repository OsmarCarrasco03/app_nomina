package com.app.nomina.models;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
   
@Entity
@Table(name = "sn_ejercicio")
@ToString @EqualsAndHashCode 

public class sn_ejercicio {
    @Id 
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
	
	@Getter @Setter
	private int ejer_id;

    @Column(name = "ejer_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal ejer_ejercicio;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate ejer_fechainicio;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate ejer_fechatermino;

    @Getter @Setter
    private Integer ejer_usucapturo;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate ejer_fechamod;

    @Getter @Setter
    private Integer ejer_usumodifico;

    @Column(name = "ejer_situacion", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal ejer_situacion;
    
}