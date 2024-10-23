package com.app.nomina.CalcularCptosTabulador.DF;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.hibernate.tool.schema.internal.IndividuallySchemaMigratorImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.nomina.controllers.SessionController;
import com.app.nomina.dao.PuestosDaoImp;
import com.app.nomina.models.sn_cptos0xt2;
import com.app.nomina.models.sn_salariosminimos;
import com.app.nomina.pojos.DataFuncion0XT2;

@Repository
@Transactional
public class FC0XT2_Daoimp implements FC0XT2_Dao{
	
	Logger logger = LoggerFactory.getLogger(PuestosDaoImp.class);

	@PersistenceContext
    EntityManager entityManager;
	
	@Autowired
    private SessionController sesion;

	@Override
	public List<BigDecimal> CalcularConceptos0XT2(DataFuncion0XT2 dataFuncion0XT2) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		BigDecimal percepcionesFijas = dataFuncion0XT2.getPercepcionesFijas();
		
		try {
			logger.info(idUsuario + "|Obteniendo datos de los conceptos del 0A al 0E.");
			
//			List<sn_cptos0xt2> concepto0A = getDatosConcepto0X("0A");
//			List<sn_cptos0xt2> concepto0B = getDatosConcepto0X("0B");
//			List<sn_cptos0xt2> concepto0C = getDatosConcepto0X("0C");
//			List<sn_cptos0xt2> concepto0D = getDatosConcepto0X("0D");
//			List<sn_cptos0xt2> concepto0E = getDatosConcepto0X("0E");
			
//			BigDecimal porcentaje0A = ObtenerPorcentaje("0A",
//					percepcionesFijas,
//					concepto0A.get(0).getC0x_porcentaje());
//			
//			BigDecimal porcentaje0B = ObtenerPorcentaje("0B",
//					percepcionesFijas,
//					concepto0B.get(0).getC0x_porcentaje());
//			
//			BigDecimal porcentaje0C = ObtenerPorcentaje("0C",
//					percepcionesFijas,
//					concepto0C.get(0).getC0x_porcentaje());
//			
//			BigDecimal porcentaje0D = ObtenerPorcentaje("0D",
//					percepcionesFijas,
//					concepto0D.get(0).getC0x_porcentaje());
//			
//			BigDecimal porcentaje0E = ObtenerPorcentaje("0E",
//					percepcionesFijas,
//					concepto0E.get(0).getC0x_porcentaje());
//			
//			List<BigDecimal> porcentajesConceptos = new ArrayList<>();
//			
//			porcentajesConceptos.add(porcentaje0A);
//			porcentajesConceptos.add(porcentaje0B);
//			porcentajesConceptos.add(porcentaje0C);
//			porcentajesConceptos.add(porcentaje0D);
//			porcentajesConceptos.add(porcentaje0E);
			
			return null;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al calcular el concepto 01 Tipo 2. FC01T2_DaoImp.CalcularISPT. " + e.getMessage(), e);

			return new ArrayList<>();
		}
	}
	
	@SuppressWarnings("unchecked")
	private BigDecimal ObtenerPorcentaje(String concepto, BigDecimal percepcionesFijas, 
									BigDecimal porcentaje) {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Calculando porcentaje del concepto: " + concepto);
			
			BigDecimal porcentajeSalario = percepcionesFijas.multiply(
					porcentaje.divide(new BigDecimal("100")))
					.setScale(3, RoundingMode.HALF_UP);
			
			logger.info(idUsuario + "|Retornando porcentaje del concepto: " + concepto);
			
			return porcentajeSalario;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al obtener el porcentaje del concepto: " + concepto
					+ " FC0XT2_DaoImp.getDatosConcepto0X. " + e.getMessage(), e);
			
			return null;
		}
	}

	@Override
	public BigDecimal ObtenerUma() {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Obteniendo la UMA actual.");
			
			String query = "select uma_importe from sn_uma where uma_tabla = :uma_tabla and "
					+ "uma_situacion = :uma_situacion and uma_estado = :uma_estado";
			
			BigDecimal datosConcepto = (BigDecimal) entityManager.createNativeQuery(query)
					.setParameter("uma_tabla", 1)
					.setParameter("uma_situacion", 1)
					.setParameter("uma_estado", 9) //CDMX
					.getSingleResult();
			
			logger.info(idUsuario + "|Retornando UMA actual.");
			
			return datosConcepto;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al obtener la UMA actual. FC0XT2_DaoImp.ObtenerUma. " 
						+ e.getMessage(), e);
			
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	private List<sn_cptos0xt2> getDatosConcepto0X(DataFuncion0XT2 dataFuncion0XT2) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Consultando datos del concepto: " + dataFuncion0XT2.getConcepto());
			
			String query = "select * from sn_cptos0xt2 where c0x_concepto = :c0x_concepto "
					+ "and c0x_ejercicio = (SELECT EXTRACT(YEAR FROM CURRENT_DATE) AS current_year)\n"
					+ "and c0x_situacion = :c0x_situacion";
			
			List<sn_cptos0xt2> datosConcepto = entityManager
					.createNativeQuery(query, sn_cptos0xt2.class)
					.setParameter("c0x_concepto", dataFuncion0XT2.getConcepto())
					.setParameter("c0x_situacion", 1)
					.getResultList();
			
			logger.info(idUsuario + "|Retornando datos del concepto " + dataFuncion0XT2.getConcepto());
			
			return datosConcepto;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al obtener los datos del concepto: " + dataFuncion0XT2.getConcepto()
					+ ". FC0XT2_DaoImp.getDatosConcepto0X. " + e.getMessage(), e);

			return new ArrayList<>();
		}
	}
	
	@Override
	public BigDecimal CalcularConceptos0AT2(DataFuncion0XT2 dataFuncion0XT2) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		BigDecimal percepcionesFijas = dataFuncion0XT2.getPercepcionesFijas();
		
		try {
			logger.info(idUsuario + "|Obteniendo datos del concepto 0A.");
			
			List<sn_cptos0xt2> concepto0A = getDatosConcepto0X(dataFuncion0XT2);
			
			BigDecimal porcentaje0A = ObtenerPorcentaje("0A",
					percepcionesFijas,
					concepto0A.get(0).getC0x_porcentaje());
			
			return porcentaje0A;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al calcular el concepto 0A. FC0XT2_DaoImp.CalcularConceptos0AT2. " + e.getMessage(), e);

			return null;
		}
	}

	@Override
	public BigDecimal CalcularConceptos0BT2(DataFuncion0XT2 dataFuncion0XT2) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		BigDecimal percepcionesFijas = dataFuncion0XT2.getPercepcionesFijas();
		
		try {
			logger.info(idUsuario + "|Obteniendo datos del concepto 0B.");
			
			List<sn_cptos0xt2> concepto0B = getDatosConcepto0X(dataFuncion0XT2);
			
			BigDecimal porcentaje0B = ObtenerPorcentaje("0B",
					percepcionesFijas,
					concepto0B.get(0).getC0x_porcentaje());
			
			return porcentaje0B;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al calcular el concepto 0B. FC0XT2_DaoImp.CalcularConceptos0BT2. " + e.getMessage(), e);

			return null;
		}
	}

	@Override
	public BigDecimal CalcularConceptos0CT2(DataFuncion0XT2 dataFuncion0XT2) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		BigDecimal percepcionesFijas = dataFuncion0XT2.getPercepcionesFijas();
		
		try {
			logger.info(idUsuario + "|Obteniendo datos del concepto 0C.");
			
			List<sn_cptos0xt2> concepto0C = getDatosConcepto0X(dataFuncion0XT2);
			
			BigDecimal porcentaje0C = ObtenerPorcentaje("0C",
					percepcionesFijas,
					concepto0C.get(0).getC0x_porcentaje());
			
			return porcentaje0C;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al calcular el concepto 0C. FC0XT2_DaoImp.CalcularConceptos0CT2. " + e.getMessage(), e);

			return null;
		}
	}

	@Override
	public BigDecimal CalcularConceptos0DT2(DataFuncion0XT2 dataFuncion0XT2) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		BigDecimal percepcionesFijas = dataFuncion0XT2.getPercepcionesFijas();
		
		try {
			logger.info(idUsuario + "|Obteniendo datos del concepto 0D.");
			
			List<sn_cptos0xt2> concepto0D = getDatosConcepto0X(dataFuncion0XT2);
			
			BigDecimal porcentaje0D = ObtenerPorcentaje("0D",
					percepcionesFijas,
					concepto0D.get(0).getC0x_porcentaje());
			
			return porcentaje0D;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al calcular el concepto 0D. FC0XT2_DaoImp.CalcularConceptos0DT2. " + e.getMessage(), e);

			return null;
		}
	}
	
	@Override
	public BigDecimal CalcularConceptos0ET2(DataFuncion0XT2 dataFuncion0XT2) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		BigDecimal percepcionesFijas = dataFuncion0XT2.getPercepcionesFijas();
		
		try {
			logger.info(idUsuario + "|Obteniendo datos del concepto 0E.");
			
			List<sn_cptos0xt2> concepto0E = getDatosConcepto0X(dataFuncion0XT2);
			
			BigDecimal porcentaje0E = ObtenerPorcentaje("0E",
					percepcionesFijas,
					concepto0E.get(0).getC0x_porcentaje());
			
			return porcentaje0E;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al calcular el concepto 0E. FC0XT2_DaoImp.CalcularConceptos0ET2. " + e.getMessage(), e);

			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<sn_salariosminimos> ObtenerSalarioMinimo(sn_salariosminimos zona) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Obteniendo el salario mínimo actual.");
			
			String query = "from sn_salariosminimos where salm_zona = :salm_zona";
			
			List<sn_salariosminimos> salarioMinimo = entityManager.createQuery(query)
					.setParameter("salm_zona", zona.getSalm_zona())
					.getResultList();
			
			logger.info(idUsuario + "|Retornando el salario mínimo actual.");
			
			return salarioMinimo;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al obtener el salario mínimo actual. FC0XT2_DaoImp.ObtenerUma. " 
						+ e.getMessage(), e);
			
			return null;
		}
	}

}
