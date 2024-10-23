package com.app.nomina.models;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name = "ctg_lstcptosdenomina")
@ToString
@EqualsAndHashCode

public class ctg_lstcptosdenomina {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Getter
	@Setter
	private int lcdm_id;
    
    @Getter
	@Setter
	private int lcdm_clase;

    @Getter
	@Setter
	private int lcdm_clave;

    @Getter
	@Setter
	private String lcdm_descripcion;

    @Getter
	@Setter
	private int lcdm_clasepadre;

    @Getter
	@Setter
	private int lcdm_clavepadre;

    @Getter
	@Setter
	private int lcdm_situacion;
 

}