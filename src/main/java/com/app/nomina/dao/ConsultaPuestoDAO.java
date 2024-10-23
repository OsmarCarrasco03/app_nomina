package com.app.nomina.dao;
import java.util.List;



import com.app.nomina.models.sn_cfgpuesto;
import com.app.nomina.models.ctg_puesto;
import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.ctg_lstpuesto;

public interface ConsultaPuestoDAO {
	List<sn_cfgpuesto> obtenerDatosPuesto();
	List<ctg_puesto> obtenerDatosCtgPuesto();
	List<ctg_niveles> obtenerDatosCtgNiveles();
	
	List<ctg_lstpuesto> obtenerDatosctg_lstpuesto();
	//public ResponseEntity<List<sn_cfgpuesto2>> obtenerDatosPuestox();
	

}