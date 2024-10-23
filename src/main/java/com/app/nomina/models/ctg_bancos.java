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
@Table(name = "ctg_bancos")
@ToString @EqualsAndHashCode

public class ctg_bancos {
    @Id
	@GeneratedValue(strategy=GenerationType.AUTO)

    @Getter @Setter
	private int ban_id;

    @Getter @Setter
    private int ban_clase;

    @Getter @Setter
    private String ban_clave;

    @Getter @Setter
    private String ban_nombre;

    @Getter @Setter
    private String ban_clavepadre;
    
    @Getter @Setter
    private int ban_pais;

    @Getter @Setter
    private int ban_estado;
}
