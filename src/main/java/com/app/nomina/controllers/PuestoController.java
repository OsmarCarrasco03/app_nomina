package com.app.nomina.controllers;

import java.math.BigDecimal;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.nomina.CalcularCptosTabulador.DF.FC01T2_Dao;
import com.app.nomina.CalcularCptosTabulador.DF.FC0XT2_Dao;
import com.app.nomina.dao.PuestosDao;
import com.app.nomina.models.sn_conceptosxpuesto;
import com.app.nomina.models.sn_salariosminimos;
import com.app.nomina.pojos.DataFuncion01T2;
import com.app.nomina.pojos.DataFuncion0XT2;
import com.app.nomina.models.ctg_puesto;

@RestController
public class PuestoController {

	@Autowired
	private PuestosDao puestosDao;
	
	@Autowired
	private FC01T2_Dao funcion01;
	
	@Autowired
	private FC0XT2_Dao funcion0X;

	Logger logger = LoggerFactory.getLogger(PuestoController.class);

	@PostMapping("api/puestos/registrar")		
	public String login(@RequestBody ctg_puesto puesto) {
		if (puestosDao.registrarPuesto(puesto)) {
			return "OK";
		}
		return "FAIL";
	}

	@PostMapping("api/puestos/consultaXCodigo")
	public List<ctg_puesto> ConsultaXCodigo(@RequestBody ctg_puesto puesto) {
		logger.info("Consulta a la api consultaXCodigo");
		
		return puestosDao.consultaXCodigo(puesto);
	}
	
	@PostMapping("api/puestos/ConsultaTipoConcepto")
	public List<Object[]> ConsultaTipoConcepto(@RequestBody sn_conceptosxpuesto concepto) {
		logger.info("Consulta a la api ConsultaTipoConcepto");
		
		return puestosDao.consultaConcepto(concepto);
	}
	
	@PostMapping("api/puestos/ConsultaConceptoFijo")
	public List<Object[]> ConsultaConceptoFijo(@RequestBody sn_conceptosxpuesto concepto) {
		logger.info("Consulta a la api ConsultaConceptoFijo");
		
		return puestosDao.consultaConceptoFijo(concepto);
	}
	
	@PostMapping("api/puestos/ConsultaConceptoVariable")
	public List<Object[]> ConsultaConceptoVariable(@RequestBody sn_conceptosxpuesto concepto) {
		logger.info("Consulta a la api ConsultaConceptoVariable");
		
		return puestosDao.consultaConceptoVariable(concepto);
	}
	
	@PostMapping("api/puestos/agregar/LlenarModalConcepto")
	public List<Object[]> LlenarModalConcepto(@RequestBody sn_conceptosxpuesto datosConcepto) {
		logger.info("Consulta a la api LlenarModalConcepto");
		
		return puestosDao.LlenarModalConcepto(datosConcepto);
	}
	
	@PostMapping("api/puestos/agregar/AgregarConcepto")
	public List<Object> AgregarConcepto(@RequestBody sn_conceptosxpuesto concepto) {
		logger.info("Consulta a la api AgregarConcepto");
		
		return puestosDao.AgregarConcepto(concepto);
	}
	
	@PostMapping("api/puestos/EliminarConcepto")
	public boolean EliminarConcepto(@RequestBody sn_conceptosxpuesto concepto) {
		logger.info("Consulta a la api EliminarConcepto");
		
		return puestosDao.eliminarConcepto(concepto);
	}


	
	@PostMapping("api/puestos/modificar/ModificarImporte")
	public boolean ModificarImporte(@RequestBody sn_conceptosxpuesto concepto) {
		logger.info("Consulta a la api ModificarImporte");
		
		return puestosDao.ModificarImporte(concepto);
	}
	
	@GetMapping("api/puestos/consultar/puestosSinConceptos")
	public List<ctg_puesto> PuestosSinConceptos() {
		logger.info("Consulta a la api PuestosSinConceptos");
		
		return puestosDao.puestosSinConceptos();
	}
	
	@PostMapping("api/puestos/consultar/situacionPuestoSinConceptos")
	public List<ctg_puesto> SituacionPuestoSinConceptos(@RequestBody ctg_puesto puesto) {
		logger.info("Consulta a la api DatosPuestoSinConceptos");
		
		return puestosDao.SituacionPuestoSinConceptos(puesto);
	}
	
	@PostMapping("api/puestos/insertar/insertarPuesto")
	public boolean InsertarPuesto(@RequestBody sn_conceptosxpuesto concepto) {
		logger.info("Consulta a la api InsertarPuesto");
		
		return puestosDao.InsertarPuesto(concepto);
	}
	
	@PostMapping("api/puestos/calcular/FC01T2")
	public BigDecimal FuncionConcepto01T2(@RequestBody DataFuncion01T2 dataFuncion01T2) {
		logger.info("Consulta a la api FuncionConcepto01T2");
		
		return funcion01.CalcularISPT(dataFuncion01T2);
	}
	
	@PostMapping("api/puestos/calcular/FC0XT2")
	public List<BigDecimal> FuncionConcepto0XT2(@RequestBody DataFuncion0XT2 dataFuncion0XT2) {
		logger.info("Consulta a la api FuncionConcepto0XT2");
		
		return funcion0X.CalcularConceptos0XT2(dataFuncion0XT2);
	}
	
	@GetMapping("api/puestos/ObtenerUma")
	public BigDecimal ObtenerUma() {
		logger.info("Consulta a la api ObtenerUma");
		
		return funcion0X.ObtenerUma();
	}
	
	@PostMapping("api/puestos/SalarioMinimo")
	public List<sn_salariosminimos> ObtenerSalarioMinimo(@RequestBody sn_salariosminimos zona) {
		logger.info("Consulta a la api ObtenerSalarioMinimo");
		
		return funcion0X.ObtenerSalarioMinimo(zona);
	}
	
	@PostMapping("api/puestos/calcular/FC0AT2")
	public BigDecimal FuncionConcepto0AT2(@RequestBody DataFuncion0XT2 dataFuncion0XT2) {
		logger.info("Consulta a la api FuncionConcepto0AT2");
		
		return funcion0X.CalcularConceptos0AT2(dataFuncion0XT2);
	}
	
	@PostMapping("api/puestos/calcular/FC0BT2")
	public BigDecimal FuncionConcepto0BT2(@RequestBody DataFuncion0XT2 dataFuncion0XT2) {
		logger.info("Consulta a la api FuncionConcepto0BT2");
		
		return funcion0X.CalcularConceptos0BT2(dataFuncion0XT2);
	}
	
	@PostMapping("api/puestos/calcular/FC0CT2")
	public BigDecimal FuncionConcepto0CT2(@RequestBody DataFuncion0XT2 dataFuncion0XT2) {
		logger.info("Consulta a la api FuncionConcepto0CT2");
		
		return funcion0X.CalcularConceptos0CT2(dataFuncion0XT2);
	}
	
	@PostMapping("api/puestos/calcular/FC0DT2")
	public BigDecimal FuncionConcepto0DT2(@RequestBody DataFuncion0XT2 dataFuncion0XT2) {
		logger.info("Consulta a la api FuncionConcepto0DT2");
		
		return funcion0X.CalcularConceptos0DT2(dataFuncion0XT2);
	}
	
	@PostMapping("api/puestos/calcular/FC0ET2")
	public BigDecimal FuncionConcepto0ET2(@RequestBody DataFuncion0XT2 dataFuncion0XT2) {
		logger.info("Consulta a la api FuncionConcepto0ET2");
		
		return funcion0X.CalcularConceptos0ET2(dataFuncion0XT2);
	}
	
}

