package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.ctg_lstpuesto;

import com.app.nomina.models.ctg_puesto;

public interface RegistroPuestoDao {

	List<ctg_lstpuesto> obtenerTipoPuesto();

	boolean registroPuesto(ctg_puesto puesto);

	boolean codigoExiste(String codigo);

	List<ctg_puesto> obtenerDatosXcodigoPuesto(String codigoPuesto);

	List<ctg_puesto> obtenerDatosctg_lstpuesto();

	List<ctg_lstpuesto> obtenerSituPuesto();

	boolean actualizarPuesto(ctg_puesto puesto);
	// List<ctg_puesto>ActualizarDatosXcodigoPuesto(ctg_puesto codigoPuesto);
	// List<ctg_lstpuesto> obtenerSituacionPuesto();
}
