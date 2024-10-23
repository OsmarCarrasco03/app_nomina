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
@Table(name = "ctg_grupfunyxresp")
@ToString @EqualsAndHashCode

public class ctg_grupfunyxresp {
	
	@Id
	//@GeneratedValue(strategy=GenerationType.AUTO)
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@Getter @Setter
	private int lgrup_id;
	
	@Getter @Setter
	private int lgrup_tipopuesto;
	
	@Getter @Setter
	private int lgrup_clave;
	
	@Getter @Setter
	private String lgrup_descripcion;
	
	@Getter @Setter
	private int lgrup_situacion;

	
	

}