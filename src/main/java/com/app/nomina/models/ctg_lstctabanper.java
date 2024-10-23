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
@Table(name = "ctg_lstctabanper")
@ToString @EqualsAndHashCode

public class ctg_lstctabanper {
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)

    @Getter @Setter
    private int ctal_id;

    @Getter @Setter
    private int ctal_clase;

    @Getter @Setter
    private int ctal_clave;

    @Getter @Setter
    private String ctal_descripcion;

    @Getter @Setter
    private int ctal_clasepadre;
}
