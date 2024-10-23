package com.app.nomina.dao;

import java.util.List;
import com.app.nomina.models.ctg_conceptosdenomina;
import com.app.nomina.models.ctg_lstcptosdenomina;
import com.app.nomina.models.ctg_lsttimbrado;
import com.app.nomina.models.sn_cptosperiodosaplic;
import com.app.nomina.models.sn_periodosdepago;
import com.app.nomina.models.sp_clasificadordegasto;


public interface ConceptosNominaDao {
List<ctg_conceptosdenomina> obtenerDatosXconcepto();
List<ctg_conceptosdenomina>obtenerDatosXGerenciaDatosPorContraconcepto(ctg_conceptosdenomina eleccion);
List<sn_periodosdepago> obtenerDatosXperiodo();
List<sn_cptosperiodosaplic> obtenerDatosXfecha();
List<sn_cptosperiodosaplic> obtenerDatosXperiodoaplic();
List<sn_cptosperiodosaplic> realizarSegundaConsulta(ctg_conceptosdenomina eleccion);
List<ctg_lstcptosdenomina> obtenerDatosXclasificacion() ;
List<ctg_lstcptosdenomina> obtenerDatosXtipo(); 
List<ctg_lstcptosdenomina> obtenerDatosXgrupoacum();
List<ctg_lstcptosdenomina> obtenerDatosXgruposecu(); 
List<ctg_lsttimbrado> obtenerDatosXtimbrado();
List<sp_clasificadordegasto> obtenerDatosXpartida(); 
List<ctg_lstcptosdenomina> obtenerDatosXtipoimporte();
List<ctg_lstcptosdenomina> obtenerDatosXfactororigen();
List<ctg_lstcptosdenomina> obtenerDatosXorigenimporte(); 
List<ctg_lstcptosdenomina> obtenerDatosXmodalidaddedeterminaciondeimporte();
List<ctg_lstcptosdenomina> obtenerDatosXmodalidaddeintegracionabasegravable();
List<ctg_lstcptosdenomina> obtenerGatoAsignado();
List<ctg_lstcptosdenomina> CalcularsobreBase();
List<ctg_lstcptosdenomina> GravarSubsidio();
List<ctg_lstcptosdenomina> CalcularsobrebaseDos();
List<ctg_lstcptosdenomina> GravarSubsidioDos();
List<ctg_lstcptosdenomina> importeexcento();
List<ctg_lstcptosdenomina> ObtenerModalidad();
boolean registrarConcepto(ctg_conceptosdenomina concepto); 



}