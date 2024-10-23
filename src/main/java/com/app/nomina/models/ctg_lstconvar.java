package com.app.nomina.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "ctg_lstconvar")
@ToString
@EqualsAndHashCode

public class ctg_lstconvar {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Getter
	@Setter
	private int lcv_id;

    @Getter
	@Setter
	private int lcv_clase;

    @Getter
	@Setter
	private int lcv_clave;

    @Getter
	@Setter
	private String lcv_descripcion;

    @Getter
	@Setter
	private int lcv_clasepadre;

    @Getter
	@Setter
	private int lcv_clavepadre;

    @Getter
	@Setter
	private int lcv_situacion;

}