package com.app.nomina.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class AuditoriaDaoImp implements AuditoriaDao {

	Logger logger = LoggerFactory.getLogger(AuditoriaDaoImp.class);

	@PersistenceContext
	EntityManager entityManager;

	public int InsertAuditoria(int idUsuario, int idModulo, int idOperacion, String detalle, String ip, String mac) {

		try {
			logger.info(idUsuario + "|Insertando datos de auditoría.");

			String queryAuditoria = "INSERT INTO sg_auditoria( "
					+ "aud_usuario, aud_modulo, aud_operacion, aud_fechaope, aud_detalle, aud_ip, aud_macaddres) "
					+ "VALUES (:aud_usuario, :aud_modulo, :aud_operacion, now(), "
					+ ":aud_detalle, :aud_ip, :aud_macaddres)";

			int update = entityManager.createNativeQuery(queryAuditoria).setParameter("aud_usuario", idUsuario)
					.setParameter("aud_modulo", idModulo).setParameter("aud_operacion", idOperacion)
					.setParameter("aud_detalle", detalle).setParameter("aud_ip", ip).setParameter("aud_macaddres", mac)
					.executeUpdate();

			if (update > 0) {
				logger.info(idUsuario + "|La auditoría se ha registrado correctamente");
				return update;
			} else {
				logger.error(idUsuario + "|Error al insertar auditoria. AuditoriaDaoImp.InsertAuditoria.");
				return 0;
			}

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al insertar auditoria. AuditoriaDaoImp.InsertAuditoria. " + e.getMessage(),
					e);
			return 0;
		}
	}
}
