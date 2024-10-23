package com.app.nomina.CalcularCptosTabulador.DF;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.nomina.controllers.SessionController;
import com.app.nomina.dao.PuestosDaoImp;
import com.app.nomina.models.sn_tablaisr;
import com.app.nomina.pojos.DataFuncion01T2;

@Repository
@Transactional
public class FC01T2_DaoImp implements FC01T2_Dao{
	
	Logger logger = LoggerFactory.getLogger(PuestosDaoImp.class);

	@PersistenceContext
    EntityManager entityManager;
	
	@Autowired
    private SessionController sesion;

	@SuppressWarnings("unchecked")
	@Override
	public BigDecimal CalcularISPT(DataFuncion01T2 dataFuncion01T2) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			logger.info(idUsuario + "|Realizando el cálculo del concepto 01.");
			
			//1. Calcular salario mensual
	        BigDecimal multiplier = new BigDecimal("2");
	        
	        BigDecimal salarioMensual = dataFuncion01T2.getSalarioBase().multiply(multiplier);
	        
	        //2. Obtener limite inferior y restarlo al salario mensual
	        
	        String query = "FROM sn_tablaisr WHERE :tisr_liminferior >= tisr_liminferior "
	        			+ "AND :tisr_limsuperior <= tisr_limsuperior";
	        
	        sn_tablaisr isr = entityManager.createQuery(query, sn_tablaisr.class)
	        				.setParameter("tisr_liminferior", salarioMensual)
	        				.setParameter("tisr_limsuperior", salarioMensual)
	        				.getSingleResult();
	        
	        BigDecimal salarioMenosLimInferior = salarioMensual.subtract(isr.getTisr_liminferior());
	        
	        //3. Obtener porcentaje del salario de acuerdo a la columna tisr_porcentaje 
	        // de la misma fila que el limite inferior
	        
	        BigDecimal porcentajeSalario = salarioMenosLimInferior.multiply(
	        						isr.getTisr_porcentaje().divide(new BigDecimal("100")))
	        						.setScale(3, RoundingMode.HALF_UP);
	        
	        //4. Sumar la cuota fija al salario resultante de acuerdo a la columna tisr_cuotafija 
	        // de la misma fila que el limite inferior
	        
	        BigDecimal salarioMasCuota = porcentajeSalario.add(isr.getTisr_cuotafija());
	        
	        //5. Obtener el resultado quincenal
	        
	        BigDecimal conceptoQuincenal = salarioMasCuota.divide(new BigDecimal("2"))
	        		.setScale(3, RoundingMode.HALF_UP);
	        
	        logger.info(idUsuario + "|Retornando el resultado del concepto 01.");
	        
			return conceptoQuincenal;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al calcular el concepto 01 Tipo 2. FC01T2_DaoImp.CalcularISPT. " + e.getMessage(), e);

			return null;
		}
	}

}
