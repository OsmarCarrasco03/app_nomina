package com.app.nomina.ServiceCptos.PV;

import java.math.BigDecimal;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.nomina.RepositoryCptos.PV.FC33T3_Repository;
import com.app.nomina.controllers.SessionController;
import com.app.nomina.dao.AuditoriaDao;
import com.app.nomina.pojos.DataFuncionFC33T3;

@Service
public class FC33T3_Service {
	
	@Autowired
    private AuditoriaDao auditoria;
	
	@Autowired
    private SessionController sesion;
	
	Logger logger = LoggerFactory.getLogger(FC33T3_Service.class);
	
	public final FC33T3_Repository repository;
	
	@Autowired
	public FC33T3_Service(FC33T3_Repository repository) {
		this.repository = repository;
	}
	
	//Obtiene el concepto de Puntualidad
	public BigDecimal FC33T3(DataFuncionFC33T3 dataFuncionFC33T3) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
    	
    	logger.info(idUsuario + "|Obteniendo el concepto de Puntualidad");
		
		try {
			
			return repository.getFC33T3(dataFuncionFC33T3.getEjercicio(), 
										dataFuncionFC33T3.getZona());
			
		} catch (Exception e) {
			
			logger.info(idUsuario + "|Error al obtener el concepto de Puntualidad. FC33T3_Service.FC33T3. " 
					+ e.getMessage(), e);
    		
    		auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 85, 8, 
    				"Error al obtener el concepto de Puntualidad. FC33T3_Service.FC33T3. "
    						+ e.getMessage() + " " + e, 
    				ipUsuario, macUsuario);
			
			return null;
		}
	}
	
}
