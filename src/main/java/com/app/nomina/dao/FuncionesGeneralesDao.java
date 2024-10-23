package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.sn_ejercicio;
import com.app.nomina.models.sn_periodosdepago;
import com.app.nomina.models.sn_vigtabulador;

public interface FuncionesGeneralesDao {
	
	List<sn_ejercicio> EjercicioActual();
	
	List<sn_periodosdepago> PeriodoActual();
	
	List<sn_vigtabulador> TabuladorActual();

	Integer TabuladorActualNUmero();
}
