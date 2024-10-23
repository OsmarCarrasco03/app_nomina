package com.app.nomina.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "ctg_nominas")
@ToString
@EqualsAndHashCode

public class ctg_nominas {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Getter
	@Setter
	private int nom_id;
    
    @Getter
	@Setter
	private int nom_ejercicio;

    @Getter
	@Setter
	private int nom_clave;

    @Getter
	@Setter
	private String nom_nombre ;

    @Getter
	@Setter
	private int nom_situacion;

    @Getter
	@Setter
	private int nom_ajustar;

    @Getter
	@Setter
	private int nom_incluyesar;

    @Getter
	@Setter
	private int nom_isrirregular;

    @Getter
	@Setter
	private int nom_ajustaenord;

    @Getter
	@Setter
	private int nom_tipoproceso;

    @Getter
	@Setter
	private int nom_isriregular;
}
