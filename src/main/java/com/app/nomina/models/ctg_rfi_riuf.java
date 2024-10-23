package com.app.nomina.models;


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
@Table(name = "ctg_rfi_riuf")
@ToString @EqualsAndHashCode
public class ctg_rfi_riuf {


    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Getter @Setter
	private int riuf_id;

    @Getter @Setter
    private int riuf_consecutivo;

    //@Column(name = "riuf_riuf")
    @Getter @Setter
    private String riuf_riuf;

    @Getter @Setter
    private int riuf_edo;

    @Getter @Setter
    private int riuf_municipio;

    @Getter @Setter
    private String riuf_colonia;

    @Getter @Setter
    private String riuf_vialidad;

    @Getter @Setter
    private String riuf_noext;

    @Getter @Setter
    private String riuf_noint;

    @Getter @Setter
    private String riuf_nombre;

    @Getter @Setter
    private String riuf_codpostal;

    @Getter @Setter
    private int riuf_situacion;


}
