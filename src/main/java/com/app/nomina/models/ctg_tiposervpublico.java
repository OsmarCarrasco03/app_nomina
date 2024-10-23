package com.app.nomina.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "ctg_tiposervpublico")
@ToString @EqualsAndHashCode
public class ctg_tiposervpublico {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Getter @Setter
    private int tsp_id;

    @Getter @Setter
    private String tsp_codigo;

    @Getter @Setter
    private String tsp_descripcion;

    @Getter @Setter
    private String tsp_carocupacional;

    @Getter @Setter
    private int tsp_tipocontratacion;

    @Getter @Setter
    private String tsp_tipoespecifico;

    @Getter @Setter
    private int tsp_situacion;

}
