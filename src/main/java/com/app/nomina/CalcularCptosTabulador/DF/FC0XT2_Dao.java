package com.app.nomina.CalcularCptosTabulador.DF;

import java.math.BigDecimal;
import java.util.List;

import com.app.nomina.models.sn_salariosminimos;
import com.app.nomina.pojos.DataFuncion0XT2;

public interface FC0XT2_Dao {
	
	List<BigDecimal> CalcularConceptos0XT2(DataFuncion0XT2 dataFuncion0XT2);
	
	BigDecimal ObtenerUma();
	
	List<sn_salariosminimos> ObtenerSalarioMinimo(sn_salariosminimos zona);
	
	BigDecimal CalcularConceptos0AT2(DataFuncion0XT2 dataFuncion0XT2);
	
	BigDecimal CalcularConceptos0BT2(DataFuncion0XT2 dataFuncion0XT2);
	
	BigDecimal CalcularConceptos0CT2(DataFuncion0XT2 dataFuncion0XT2);
	
	BigDecimal CalcularConceptos0DT2(DataFuncion0XT2 dataFuncion0XT2);
	
	BigDecimal CalcularConceptos0ET2(DataFuncion0XT2 dataFuncion0XT2);
}
