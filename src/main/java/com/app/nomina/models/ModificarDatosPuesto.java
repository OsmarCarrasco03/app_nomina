package com.app.nomina.models;

import javax.persistence.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString @EqualsAndHashCode
public class ModificarDatosPuesto {
	
	@Id
	@Getter @Setter
	private int idTipoConsulta;
    
	@Getter @Setter
	private String fecha;
	
	@Getter @Setter
	private String dato;

}