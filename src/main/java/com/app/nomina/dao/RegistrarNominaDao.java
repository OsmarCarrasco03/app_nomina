package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.ctg_nominas;
import com.app.nomina.models.sn_nominasoperando;
import com.app.nomina.models.sn_periodosdepago;


public interface RegistrarNominaDao {
	

	List<ctg_nominas> autocompletarNomina();

	boolean registroNomina(sn_nominasoperando registrar);

	List<ctg_nominas> buscarNominasOperando();
	
	boolean bajaNomina(sn_nominasoperando baja);

	List<sn_periodosdepago> Periodos();

	List<sn_nominasoperando> tablaPorPeriodo(Integer input);

}
