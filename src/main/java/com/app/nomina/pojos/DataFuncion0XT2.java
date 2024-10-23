package com.app.nomina.pojos;

import java.math.BigDecimal;

import javax.persistence.Column;

import lombok.Getter;
import lombok.Setter;

public class DataFuncion0XT2 {
	
	@Getter @Setter
	public String concepto;
	
	@Getter @Setter
	public BigDecimal percepcionesFijas;
	
	@Getter @Setter
	@Column(name = "ejercicio", precision = 4, scale = 0)
	public BigDecimal ejercicio;
	
}
