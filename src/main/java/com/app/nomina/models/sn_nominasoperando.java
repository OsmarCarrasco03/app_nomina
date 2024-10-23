package com.app.nomina.models;
import lombok.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

@Entity
@Table(name = "sn_nominasoperando")
@ToString
@EqualsAndHashCode
public class sn_nominasoperando {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Getter
	@Setter
	private int nop_id;

    @Getter
	@Setter
	private int nop_ejercicio;

    @Getter
	@Setter
	private int nop_periodo;

    @Getter
	@Setter
	private int nop_numnomina;

    @Getter
	@Setter
	private int nop_etapa;

    @Getter
	@Setter
	private int nop_secuenciarad;

    @Getter
	@Setter
	private int nop_situacion;

    @Getter
	@Setter
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate nop_fechainicio;

    @Getter
	@Setter
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate nop_fechatermino;

    @Getter
	@Setter
	private int nop_usucapturo;


    @Getter
	@Setter
    @JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate nop_fechamod;

    @Getter
	@Setter
	private int nop_usumodifico;

    

}

