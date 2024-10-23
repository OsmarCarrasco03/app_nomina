package com.app.nomina.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "ctg_estado")
@ToString @EqualsAndHashCode
public class ctg_estado {

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    
	@Getter @Setter
    private int edo_id;
    
    @Getter @Setter
    private String edo_nombre;
    
    @Getter @Setter
    private String edo_equivsat;
    
    @Getter @Setter
    private String edo_fechainicio;
    
    @Getter @Setter
    private String edo_fechatermino;
    
    @Getter @Setter
    private int edo_usucapturo;
    
    @Getter @Setter
    private String edo_fechamod;
    
    @Getter @Setter
    private int edo_usumodifico;
    
    @Getter @Setter
    private int edo_situacion;

}