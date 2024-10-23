package com.app.nomina.dao;

import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.controllers.SessionController;
import com.app.nomina.models.sg_privilegio;

@Repository
@Transactional
public class PrivilegioDaoImp implements PrivilegioDao {
	
	Logger logger = LoggerFactory.getLogger(PrivilegioDaoImp.class);
	
	@PersistenceContext
    EntityManager entityManager;
	
	@Autowired
    private AuditoriaDao auditoria;
	
	@Autowired
    private SessionController sesion;

	@SuppressWarnings("unchecked")
	@Override
	public boolean mostrarPagina(sg_privilegio privilegio) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "FROM sg_privilegio WHERE priv_idusuario = :priv_idusuario "
				+ "AND priv_idmodulo = :priv_idmodulo";
		
		try {
			List<sg_privilegio> lista = (List<sg_privilegio>) entityManager.createQuery(query)
					.setParameter("priv_idusuario", privilegio.getPriv_idusuario())
					.setParameter("priv_idmodulo", privilegio.getPriv_idmodulo())
					.getResultList();
			
			if(!lista.isEmpty()) {
				
				int insert = auditoria.InsertAuditoria(Integer.parseInt(idUsuario), privilegio.getPriv_idmodulo(),
						6, "Se muestra el módulo " + privilegio.getPriv_idmodulo() + ". Cuenta con privilegios"
						, ipUsuario, macUsuario);
				
				if (insert > 0) {
					logger.info(idUsuario + "|Mostrando el módulo: " + privilegio.getPriv_idmodulo());
					return true;
				}
				return false;
			}
			
			logger.info(idUsuario + "|No tiene privilegios para visualizar el módulo: " + privilegio.getPriv_idmodulo());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), privilegio.getPriv_idmodulo(), 6, 
					"No tiene privilegios para visualizar el módulo: " + privilegio.getPriv_idmodulo(), 
					ipUsuario, macUsuario);
			
			return false;
		} catch (Exception e) {
			
			logger.error(idUsuario + "|Error al consultar privilegio para visualizar el módulo. PrivilegioDaoImp.mostrarPagina. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), privilegio.getPriv_idmodulo(), 8, 
					"Error al consultar privilegio para visualizar el módulo. PrivilegioDaoImp.mostrarPagina.", 
					ipUsuario, macUsuario);
			
			return false;
		}
	}
}