package com.app.nomina.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigInteger;
import java.time.LocalDate;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "sn_ctabancpersona")
@ToString @EqualsAndHashCode
public class sn_ctabancpersona {
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)

    @Getter @Setter
	private int ctab_id;

    @Getter @Setter
    private int ctab_idpersona;

    @Getter @Setter
    private String ctab_banco;

    @Getter @Setter
    private String ctab_clabeinter;

    @Getter @Setter
    private BigInteger ctab_cuenta; 

    @Getter @Setter
    private int ctab_moneda;

    @Getter @Setter
    private int ctab_tipo;

    @Getter @Setter
    private int ctab_modpago;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate ctab_fechainicio;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate ctab_fechatermino;

    @Getter @Setter
    private int ctab_usucapturo;

    @Getter @Setter
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate ctab_fechamod;

    @Getter @Setter
    private int ctab_usumodifico;

    @Getter @Setter
    private int  ctab_situacion;
}
