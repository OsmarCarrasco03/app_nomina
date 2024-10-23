package com.app.nomina.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.nomina.controllers.FuncionesGeneralesController;
import com.app.nomina.controllers.SessionController;
import com.app.nomina.models.ctg_puesto;
import com.app.nomina.models.sn_ejercicio;
import com.app.nomina.models.sn_periodosdepago;
import com.app.nomina.models.sn_vigtabulador;

@Repository
@Transactional
public class FuncionesGeneralesDaoImp implements FuncionesGeneralesDao{
	
	@Autowired
    private SessionController sesion;
	
	@PersistenceContext
    EntityManager entityManager;
	
	Logger logger = LoggerFactory.getLogger(FuncionesGeneralesDaoImp.class);

	@SuppressWarnings("unchecked")
	@Override
	public List<sn_ejercicio> EjercicioActual() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "FROM sn_ejercicio WHERE ejer_situacion = :ejer_situacion";
		
		try {
			
			logger.info(idUsuario + "|Realizando consulta del ejercicio actual.");
			
			BigDecimal situacion = new BigDecimal("1");
			
			List<sn_ejercicio> lista = (List<sn_ejercicio>) entityManager.createQuery(query)
					.setParameter("ejer_situacion", situacion)
					.getResultList();
			
			return lista;
			 
		} catch (Exception e) {
			logger.error("Error al consultar el ejercicio actual. FuncionesGeneralesDaoImp.EjercicioActual " 
					+ e.getMessage(), e);
			
			return new ArrayList<>();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<sn_periodosdepago> PeriodoActual() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "FROM sn_periodosdepago WHERE pp_operando = :pp_operando";
		
		try {
			
			logger.info(idUsuario + "|Realizando consulta del periodo actual.");
			
			BigDecimal pp_operando = new BigDecimal("1");
			
			List<sn_periodosdepago> lista = (List<sn_periodosdepago>) entityManager.createQuery(query)
					.setParameter("pp_operando", pp_operando)
					.getResultList();
			
			return lista;
			 
		} catch (Exception e) {
			logger.error("Error al consultar el periodo actual. FuncionesGeneralesDaoImp.PeriodoActual " 
					+ e.getMessage(), e);
			
			return new ArrayList<>();
		}
	}

	

	@SuppressWarnings("unchecked")
	@Override
	public List<sn_vigtabulador> TabuladorActual() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "FROM sn_vigtabulador WHERE vigt_situacion = :vigt_situacion";
		
		try {
			
			logger.info(idUsuario + "|Realizando consulta del tabulador actual.");
			
			List<sn_vigtabulador> lista = (List<sn_vigtabulador>) entityManager.createQuery(query)
					.setParameter("vigt_situacion", 1)
					.getResultList();
			
			return lista;
			 
		} catch (Exception e) {
			logger.error("Error al consultar del tabulador actual. FuncionesGeneralesDaoImp.TabuladorActual " 
					+ e.getMessage(), e);
			
			return new ArrayList<>();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public Integer TabuladorActualNUmero() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();

		sesionUsuario = sesion.sesionUsuario();

		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");

		String query = "SELECT cast(vigt_tabla as integer) FROM sn_vigtabulador WHERE vigt_situacion = :vigt_situacion";

		try {

			logger.info(idUsuario + "|Realizando consulta del tabulador actual.");

			Integer vig_tabulador = (Integer) entityManager.createQuery(query)
					.setParameter("vigt_situacion", 1)
					.getSingleResult();

			return vig_tabulador;

		} catch (Exception e) {
			logger.error("Error al consultar del tabulador actual. FuncionesGeneralesDaoImp.TabuladorActualNUmero "
					+ e.getMessage(), e);

			return null;
		}
	}
	
}
