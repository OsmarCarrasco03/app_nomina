package com.app.nomina.models;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "sn_periodosdepago")
@ToString @EqualsAndHashCode 

public class sn_periodosdepago {
    @Id 
	@GeneratedValue(strategy= GenerationType.SEQUENCE)
	
	@Getter @Setter
	private int pp_id;

    @Column(name = "pp_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
    private BigDecimal pp_ejercicio;

    @Column(name = "pp_quincena", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal pp_quincena;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pp_fechadesde;
    
    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pp_fechahasta;

    @Column(name = "pp_operando", precision = 1, scale = 0)
	@Getter @Setter
    private BigDecimal pp_operando;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pp_fechaapertura;

    @Getter @Setter
    private Integer pp_usuaperturo;
    
    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pp_fechacierre;

    @Getter @Setter
    private Integer pp_usucerro;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate pp_fechamod;

    @Getter @Setter
    private Integer pp_usumodifico;

}