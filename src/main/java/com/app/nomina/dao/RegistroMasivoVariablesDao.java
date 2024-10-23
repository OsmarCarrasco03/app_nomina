package com.app.nomina.dao;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.app.nomina.models.ctg_lstcptosdenomina;
import com.app.nomina.models.ctg_lstpersona;
import com.app.nomina.models.sn_convar_paso_2;
import com.app.nomina.models.sn_convar_paso_3;

import org.springframework.core.io.Resource;

public interface RegistroMasivoVariablesDao {

	// boolean registrarPersonaconCSVmasivo(MultipartFile archivoCSV);
	boolean registrarPersonaconCSVmasivo(MultipartFile archivoCSV, String axoproceso, String perproceso, Date Fechainicio, int UsuCapturo , Date Fechamod, int UsuModifico, int Situacion, int Estatus);
 List<Object[]> obtenerDatosXdatosmasivos();
	
	//List<ctg_lstcptosdenomina> obtenerDatosXtipoMasivo();
	boolean NumeroExisteBase(Integer tipoConcepto); 
	void eliminarDatos(String usuarioCapturo); 
	// boolean actualizarEstatus() ;
	// boolean errorEnEstatus();
	List<sn_convar_paso_3> insertData(); 
	boolean curpExistecargaMasiva(String curp);
	boolean temporalidadExistecargaMasiva(BigDecimal temporalidad);
	boolean factorExistecargaMasiva(BigDecimal factor); 


	boolean validarConceptosDenomina(BigDecimal tipocon, String concepto);
	boolean validarEntradaSoloNumeros();
	boolean validarEntradaSoloNumerospagoanteced();
	boolean conceptoExistecargaMasiva(String concepto, BigDecimal tipo);
	boolean nominaExistecargaMasiva(BigDecimal nomina);
	boolean conceptoUnicoExistecargaMasiva(String conceptounico);



	// boolean validarCampos(Object[] fila) ;
	
	// boolean curpExisteenBase();
	// boolean verificarExistenciaCURPs(String curp);
	// ResponseEntity<Resource> descargarArchivoCSV(MultipartFile archivoCSV) ;
	// List<sn_convar_paso_2> obtenerDatosXeleccion(sn_convar_paso_2 eleccion); 
}
