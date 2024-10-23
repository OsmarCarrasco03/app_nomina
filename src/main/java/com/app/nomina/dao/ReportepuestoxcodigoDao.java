package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.ctg_lstpuesto;

import com.app.nomina.models.ctg_puesto;

public interface ReportepuestoxcodigoDao {

	List<ctg_lstpuesto>obtenerTipoPuestoreporte();

	List<ctg_puesto> obtenerDatosctgReporte(ctg_puesto eleccion);

	List<ctg_lstpuesto> obtenerSituPuestoReporte();

	List<ctg_puesto>obtenerCodigos();

}
