package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.sn_conceptosxpuesto;
import com.app.nomina.models.ctg_puesto;

public interface PuestosDao {

	List<ctg_puesto> listarPuestos();
	
	List<ctg_puesto> puestosSinConceptos();

	List<ctg_puesto> obtenerDatosXCodigo(ctg_puesto codigo);
	
	List<ctg_puesto> consultaXCodigo(ctg_puesto codigo);
	
	List<ctg_puesto> SituacionPuestoSinConceptos(ctg_puesto codigo);
	
	List<Object[]> consultaConcepto(sn_conceptosxpuesto concepto);
	
	List<Object[]> consultaConceptoFijo(sn_conceptosxpuesto concepto);
	
	List<Object[]> consultaConceptoVariable(sn_conceptosxpuesto concepto);
	
	List<Object[]> LlenarModalConcepto(sn_conceptosxpuesto datosConcepto);
	
	boolean eliminarConcepto(sn_conceptosxpuesto concepto);
	
	List<Object> AgregarConcepto(sn_conceptosxpuesto concepto);

	boolean registrarPuesto(ctg_puesto puesto);
	
	boolean ModificarImporte(sn_conceptosxpuesto concepto);
	
	boolean InsertarPuesto(sn_conceptosxpuesto concepto);
	
}
