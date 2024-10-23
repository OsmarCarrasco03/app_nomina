package com.app.nomina.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.models.sg_modulo;

@Repository
@Transactional
public class ModuloDaoImp implements ModuloDao {

	Logger logger = LoggerFactory.getLogger(ModuloDaoImp.class);

	@PersistenceContext
	EntityManager entityManager;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private AuditoriaDao auditoria;

	@SuppressWarnings("unchecked")
	@Override
	public List<sg_modulo> ObtenerArbolPrivilegios() {

		HttpSession session = request.getSession(true);

		String idUsuario = session.getAttribute("idUsuario").toString();
		String ipUsuario = session.getAttribute("ipUsuario").toString();
		String macUsuario = session.getAttribute("macUsuario").toString();

		try {
			logger.info(idUsuario + "|Obteniendo árbol de privilegios.");

			String query = "WITH RECURSIVE cte_query AS ( \n"
					+ "select mod_id, mod_descripcion, mod_idpadre, 1 as nivel \n" + "from sg_modulo \n"
					+ "where mod_idpadre = 0 and mod_situacion = 1 \n" + "UNION ALL \n"
					+ "select e.mod_id, e.mod_descripcion, e.mod_idpadre, c.nivel + 1 \n" + "From sg_modulo e \n"
					+ "JOIN cte_query c ON c.mod_id = e.mod_idpadre ) \n"
					+ "select * from cte_query order by nivel, mod_id";

			logger.info(idUsuario + "|Se obtuvo el árbol de privilegios correctamente.");

			int insert = auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 7, 6,
					"Se obtuvo el árbol de privilegios.", ipUsuario, macUsuario);
			if (insert > 0) {
				return entityManager.createNativeQuery(query).getResultList();
			}

			logger.error(idUsuario + "|Error al obtener árbol de privilegios. ModuloDaoImp.ObtenerArbolPrivilegios.");

			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 7, 8,
					"Error al obtener árbol de privilegios. ModuloDaoImp.ObtenerArbolPrivilegios. ", ipUsuario,
					macUsuario);

			return new ArrayList<>();

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al obtener árbol de privilegios. ModuloDaoImp.ObtenerArbolPrivilegios. "
					+ e.getMessage(), e);

			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 7, 8,
					"Error al obtener árbol de privilegios. ModuloDaoImp.ObtenerArbolPrivilegios. ", ipUsuario,
					macUsuario);

			return new ArrayList<>();
		}
	}
}
