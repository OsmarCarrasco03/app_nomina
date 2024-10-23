package com.app.nomina.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.controllers.SessionController;
import com.app.nomina.models.sn_conceptosxpuesto;
import com.app.nomina.models.sn_vigtabulador;

import com.app.nomina.models.ctg_puesto;

@Repository
@Transactional
public class PuestosDaoImp implements PuestosDao {

	Logger logger = LoggerFactory.getLogger(PuestosDaoImp.class);

	@PersistenceContext
    EntityManager entityManager;
	
	@Autowired
    private SessionController sesion;
	
	@Autowired
    private AuditoriaDao auditoria;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_puesto> listarPuestos() {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "FROM ctg_puesto";
		
		try {
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 19, 2, 
					"Selecciona todos los campos de la tabla ctg_puesto.",  
					ipUsuario, macUsuario);
			
			return entityManager.createQuery(query).getResultList();
			
		} catch (Exception e) {
			logger.error("Error al consultar la tabla ctg_puesto. PuestoDaoImp.listarPuestos " 
					+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 19, 8, 
					"Error al seleccionar todos los campos de la tabla ctg_puesto. "
					+ "PuestoDaoImp.listarPuestos",  
					ipUsuario, macUsuario);
			
			return new ArrayList<>();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_puesto> obtenerDatosXCodigo(ctg_puesto codigo) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "FROM ctg_puesto WHERE ctgp_codigo = :codigo";

		try {
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 19, 2, 
					"Selecciona todos los campos de la tabla ctg_puesto, dónde ctgp_codigo sea: "
					+ codigo.getCtgp_codigo(),  
					ipUsuario, macUsuario);
			
			List<ctg_puesto> descripcion = entityManager.createQuery(query)
					.setParameter("codigo", codigo.getCtgp_codigo())
					.getResultList();

			return descripcion;
			
		} catch (Exception e) {
			logger.error("Error al consultar el puesto por código. PuestoDaoImp.obtenerDatosXCodigo " 
					+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 19, 8, 
					"Error al seleccionar los campos de la tabla ctg_puesto para el código: "
					+ codigo.getCtgp_codigo() + ". PuestoDaoImp.obtenerDatosXCodigo",  
					ipUsuario, macUsuario);
			
			return new ArrayList<>();
		}
	}

	@SuppressWarnings("unused")
	@Override
	public boolean registrarPuesto(ctg_puesto puesto) {
		String query = "FROM ctg_puesto WHERE ctgp_codigo = :codigo";

		LocalDate fechaInicio = puesto.getCtgp_fechainicio();

		@SuppressWarnings("unchecked")
		List<ctg_puesto> codigoExiste = entityManager.createQuery(query).setParameter("codigo", puesto.getCtgp_codigo())
				.getResultList();

		if (codigoExiste.isEmpty()) {
			logger.info("Esta vacio");

			if (entityManager.merge(puesto) != null) {
				return true;
			} else {
				return false;
			}
		}

		logger.info("No esta vacio");

		return false;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_puesto> consultaXCodigo(ctg_puesto codigo) {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		List<ctg_puesto> lista = new ArrayList<ctg_puesto>();
		
		String query = "select pto_id, pto_idcodpuesto, ctgp_codigo, ctgp_descripcion, pto_tipo,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = pto_tipo) as tipo_desc,\n"
				+ "pto_zona,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = pto_zona) as zona_desc,\n"
				+ "pto_nivel, nvl_nivel, pto_categoria,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = pto_categoria) as categoria_desc, \n"
				+ "pto_subcategoria, \n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = pto_subcategoria) as subcat_desc, \n"
				+ "pto_clasfinterna,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = pto_clasfinterna) as clasfint_desc,\n"
				+ "pto_contratacion,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = pto_contratacion) as contratacion_desc,\n"
				+ "pto_declaracion,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = pto_declaracion) as declaracion_desc,\n"
				+ "pto_fechainicio, pto_fechatermino, pto_usucapturo, \n"
				+ "(select usu_alias from sg_usuario where usu_id = pto_usucapturo) usucapturo_alias,\n"
				+ "pto_fechamod, pto_usumodifico, \n"
				+ "(select usu_alias from sg_usuario where usu_id = pto_usumodifico) usumodifico_alias,\n"
				+ "pto_situacion, ctgp_id from sn_cfgpuesto\n"
				+ "join ctg_puesto on ctgp_id = pto_idcodpuesto\n"
				+ "join ctg_niveles on nvl_id = pto_nivel where ctgp_codigo = :ctgp_codigo order by nvl_id";
		
		try {
			
			logger.info(idUsuario + "|Realizando consulta de puesto por código.");
			
			lista = (List<ctg_puesto>) entityManager.createNativeQuery(query)
					.setParameter("ctgp_codigo", codigo.getCtgp_codigo())
					.getResultList();
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta de datos específicos del puesto con el código: "
					+ codigo.getCtgp_codigo(), 
					ipUsuario, macUsuario);
			
			logger.info(idUsuario + "|Retornando consulta de puesto por código.");
			
			return lista;
			 
		} catch (Exception e) {
			logger.error("Error al consultar puesto por código. PuestoDaoImp.consultaXCodigo " 
					+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 8, 
					"Error al consultar datos específicos del puesto con el código: "
					+ codigo.getCtgp_codigo() + ". PuestoDaoImp.consultaXCodigo", 
					ipUsuario, macUsuario);
			
			return new ArrayList<>();
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> consultaConcepto(sn_conceptosxpuesto concepto) {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "select ejer_ejercicio from sn_ejercicio where ejer_situacion = :ejer_situacion";

		try {
			logger.info(idUsuario + "|Realizando consulta del ejercicio actual.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta del ejercicio actual (sn_ejercicio).", 
					ipUsuario, macUsuario);
			
			BigDecimal ejercicio = (BigDecimal) entityManager.createNativeQuery(query)
					.setParameter("ejer_situacion", 1)
					.getSingleResult();
			
			logger.info(idUsuario + "|Consulta del ejercicio actual realizada correctamente.");
			
			query = "from sn_vigtabulador "
					+ "where vigt_ejercicio = :vigt_ejercicio and vigt_situacion = :vigt_situacion";
			
			logger.info(idUsuario + "|Realizando consulta del tabulador actual.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta del tabulador actual (sn_vigtabulador).", 
					ipUsuario, macUsuario);
			
			List<sn_vigtabulador> tabuladorActual = entityManager.createQuery(query)
					.setParameter("vigt_ejercicio", ejercicio)
					.setParameter("vigt_situacion", 1)
					.getResultList();
			
			tabuladorActual.stream().forEach(item -> {
			    concepto.setCxpto_ejercicio(item.getVigt_ejercicio());
			    concepto.setCxpto_tabla(item.getVigt_tabla());
			});
			
			logger.info(idUsuario + "|Consulta del tabulador actual correctamente");
			
			query = "SELECT cxpto_id, cxpto_concepto, con_descripcion, cxpto_importe, \n"
					+ "cxpto_ejercicio, cxpto_tabla, cxpto_fechainicio, cxpto_fechatermino, \n"
					+ "cxpto_usucapturo, \n"
					+ "(SELECT usu_alias FROM sg_usuario WHERE usu_id = cxpto_usucapturo) AS alias_usucapturo, \n"
					+ "cxpto_fechamod, cxpto_usumodifico, \n"
					+ "(SELECT usu_alias FROM sg_usuario WHERE usu_id = cxpto_usumodifico) AS alias_usumodifico \n"
					+ "FROM sn_conceptosxpuesto \n"
					+ "JOIN ctg_conceptosdenomina ON con_concepto = cxpto_concepto "
					+ "AND con_tipo = cxpto_tipocpto \n"
					+ "AND con_ejercicio = cxpto_ejercicio AND con_tabla = cxpto_tabla \n"
					+ "WHERE cxpto_idpuesto = :cxpto_idpuesto AND cxpto_tipocpto = :cxpto_tipocpto \n"
					+ "AND cxpto_ejercicio = :cxpto_ejercicio AND cxpto_tabla = :cxpto_tabla "
					+ "AND cxpto_situacion = :cxpto_situacion \n"
					+ "ORDER BY cxpto_id";
			
			logger.info(idUsuario + "|Realizando consulta de conceptos tipo: " + concepto.getCxpto_tipocpto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta de conceptos tipo: " + concepto.getCxpto_tipocpto(), 
					ipUsuario, macUsuario);
			
			List<Object[]> conceptos = new ArrayList<>();

			conceptos = entityManager.createNativeQuery(query)
					.setParameter("cxpto_idpuesto", concepto.getCxpto_idpuesto())
					.setParameter("cxpto_tipocpto", concepto.getCxpto_tipocpto())
					.setParameter("cxpto_ejercicio", concepto.getCxpto_ejercicio())
					.setParameter("cxpto_tabla", concepto.getCxpto_tabla())
					.setParameter("cxpto_situacion", 1)
					.getResultList();

			logger.info(idUsuario + "|Búsqueda de conceptos tipo: " + concepto.getCxpto_tipocpto() 
										+ " exitosa. Retornando resultados.");

			return conceptos;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al consultar conceptos tipo: " + concepto.getCxpto_tipocpto() 
						+ ". PuestosDaoImp.consultaConcepto. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 8, 
					"Error al consultar conceptos tipo: " + concepto.getCxpto_tipocpto() +
					". PuestosDaoImp.consultaConcepto. ", 
					ipUsuario, macUsuario);

			return new ArrayList<>();
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> consultaConceptoFijo(sn_conceptosxpuesto concepto) {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "select ejer_ejercicio from sn_ejercicio where ejer_situacion = :ejer_situacion";

		try {
			logger.info(idUsuario + "|Realizando consulta del ejercicio actual.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta del ejercicio actual (sn_ejercicio).", 
					ipUsuario, macUsuario);
			
			BigDecimal ejercicio = (BigDecimal) entityManager.createNativeQuery(query)
					.setParameter("ejer_situacion", 1)
					.getSingleResult();
			
			logger.info(idUsuario + "|Consulta del ejercicio actual realizada correctamente.");
			
			query = "from sn_vigtabulador "
					+ "where vigt_ejercicio = :vigt_ejercicio and vigt_situacion = :vigt_situacion";
			
			logger.info(idUsuario + "|Realizando consulta del tabulador actual.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta del tabulador actual (sn_vigtabulador).", 
					ipUsuario, macUsuario);
			
			List<sn_vigtabulador> tabuladorActual = entityManager.createQuery(query)
					.setParameter("vigt_ejercicio", ejercicio)
					.setParameter("vigt_situacion", 1)
					.getResultList();
			
			tabuladorActual.stream().forEach(item -> {
			    concepto.setCxpto_ejercicio(item.getVigt_ejercicio());
			    concepto.setCxpto_tabla(item.getVigt_tabla());
			});
			
			logger.info(idUsuario + "|Consulta del tabulador actual correctamente");
			
			query= "SELECT \n"
					+ "    cxpto_id, cxpto_concepto, con_descripcion, cxpto_importe, cxpto_ejercicio, \n"
					+ "	cxpto_tabla, cxpto_fechainicio, cxpto_fechatermino, cxpto_usucapturo, \n"
					+ "    (SELECT usu_alias FROM sg_usuario WHERE usu_id = cxpto_usucapturo) AS alias_usucapturo, \n"
					+ "    cxpto_fechamod, cxpto_usumodifico, \n"
					+ "    (SELECT usu_alias FROM sg_usuario WHERE usu_id = cxpto_usumodifico) AS alias_usumodifico \n"
					+ "FROM sn_conceptosxpuesto \n"
					+ "JOIN ctg_conceptosdenomina ON con_concepto = cxpto_concepto \n"
					+ "    AND con_tipo = cxpto_tipocpto AND con_ejercicio = cxpto_ejercicio \n"
					+ "	AND con_tabla = cxpto_tabla \n"
					+ "JOIN \n"
					+ "    ctg_cptostabimpfijo ON cxpto_concepto = cptof_concepto \n"
					+ "    AND cxpto_tipocpto = cptof_tipo \n"
					+ "WHERE \n"
					+ "    cxpto_idpuesto = :cxpto_idpuesto and cxpto_ejercicio = :cxpto_ejercicio \n"
					+ "	and cxpto_tabla = :cxpto_tabla and cxpto_situacion = :cxpto_situacion \n"
					+ "	and cxpto_tipocpto = :cxpto_tipocpto";
			
			logger.info(idUsuario + "|Realizando consulta de conceptos tipo: " + concepto.getCxpto_tipocpto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta de conceptos tipo: " + concepto.getCxpto_tipocpto(), 
					ipUsuario, macUsuario);
			
			List<Object[]> conceptos = new ArrayList<>();

			conceptos = entityManager.createNativeQuery(query)
					.setParameter("cxpto_idpuesto", concepto.getCxpto_idpuesto())
					.setParameter("cxpto_tipocpto", concepto.getCxpto_tipocpto())
					.setParameter("cxpto_ejercicio", concepto.getCxpto_ejercicio())
					.setParameter("cxpto_tabla", concepto.getCxpto_tabla())
					.setParameter("cxpto_situacion", 1)
					.getResultList();

			logger.info(idUsuario + "|Búsqueda de conceptos tipo: " + concepto.getCxpto_tipocpto() 
										+ " exitosa. Retornando resultados.");

			return conceptos;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al consultar conceptos tipo: " + concepto.getCxpto_tipocpto() 
						+ ". PuestosDaoImp.consultaConcepto. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 8, 
					"Error al consultar conceptos tipo: " + concepto.getCxpto_tipocpto() +
					". PuestosDaoImp.consultaConcepto. ", 
					ipUsuario, macUsuario);

			return new ArrayList<>();
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> consultaConceptoVariable(sn_conceptosxpuesto concepto) {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "select ejer_ejercicio from sn_ejercicio where ejer_situacion = :ejer_situacion";

		try {
			logger.info(idUsuario + "|Realizando consulta del ejercicio actual.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta del ejercicio actual (sn_ejercicio).", 
					ipUsuario, macUsuario);
			
			BigDecimal ejercicio = (BigDecimal) entityManager.createNativeQuery(query)
					.setParameter("ejer_situacion", 1)
					.getSingleResult();
			
			logger.info(idUsuario + "|Consulta del ejercicio actual realizada correctamente.");
			
			query = "from sn_vigtabulador "
					+ "where vigt_ejercicio = :vigt_ejercicio and vigt_situacion = :vigt_situacion";
			
			logger.info(idUsuario + "|Realizando consulta del tabulador actual.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta del tabulador actual (sn_vigtabulador).", 
					ipUsuario, macUsuario);
			
			List<sn_vigtabulador> tabuladorActual = entityManager.createQuery(query)
					.setParameter("vigt_ejercicio", ejercicio)
					.setParameter("vigt_situacion", 1)
					.getResultList();
			
			tabuladorActual.stream().forEach(item -> {
			    concepto.setCxpto_ejercicio(item.getVigt_ejercicio());
			    concepto.setCxpto_tabla(item.getVigt_tabla());
			});
			
			logger.info(idUsuario + "|Consulta del tabulador actual correctamente");
			
			query = "SELECT cxpto_id, cxpto_concepto, con_descripcion, cxpto_importe, \n"
					+ "cxpto_ejercicio, cxpto_tabla, cxpto_fechainicio, cxpto_fechatermino, \n"
					+ "cxpto_usucapturo, \n"
					+ "(SELECT usu_alias FROM sg_usuario WHERE usu_id = cxpto_usucapturo) AS alias_usucapturo, \n"
					+ "cxpto_fechamod, cxpto_usumodifico, \n"
					+ "(SELECT usu_alias FROM sg_usuario WHERE usu_id = cxpto_usumodifico) AS alias_usumodifico \n"
					+ "FROM sn_conceptosxpuesto \n"
					+ "JOIN ctg_conceptosdenomina ON con_concepto = cxpto_concepto "
					+ "AND con_tipo = cxpto_tipocpto \n"
					+ "AND con_ejercicio = cxpto_ejercicio AND con_tabla = cxpto_tabla \n"
					+ "WHERE cxpto_idpuesto = :cxpto_idpuesto AND cxpto_tipocpto = :cxpto_tipocpto \n"
					+ "AND cxpto_ejercicio = :cxpto_ejercicio AND cxpto_tabla = :cxpto_tabla "
					+ "AND cxpto_situacion = :cxpto_situacion \n"
					+ "ORDER BY cxpto_id";
			
			logger.info(idUsuario + "|Realizando consulta de conceptos tipo: " + concepto.getCxpto_tipocpto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Consulta de conceptos tipo: " + concepto.getCxpto_tipocpto(), 
					ipUsuario, macUsuario);
			
			List<Object[]> conceptos = new ArrayList<>();

			conceptos = entityManager.createNativeQuery(query)
					.setParameter("cxpto_idpuesto", concepto.getCxpto_idpuesto())
					.setParameter("cxpto_tipocpto", concepto.getCxpto_tipocpto())
					.setParameter("cxpto_ejercicio", concepto.getCxpto_ejercicio())
					.setParameter("cxpto_tabla", concepto.getCxpto_tabla())
					.setParameter("cxpto_situacion", 1)
					.getResultList();

			logger.info(idUsuario + "|Búsqueda de conceptos tipo: " + concepto.getCxpto_tipocpto() 
										+ " exitosa. Retornando resultados.");

			return conceptos;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al consultar conceptos tipo: " + concepto.getCxpto_tipocpto() 
						+ ". PuestosDaoImp.consultaConcepto. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 8, 
					"Error al consultar conceptos tipo: " + concepto.getCxpto_tipocpto() +
					". PuestosDaoImp.consultaConcepto. ", 
					ipUsuario, macUsuario);

			return new ArrayList<>();
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean eliminarConcepto(sn_conceptosxpuesto concepto) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");

		String query = "UPDATE sn_conceptosxpuesto "
				+ "SET cxpto_situacion = :cxpto_situacion, "
				+ "cxpto_fechatermino = current_date "
				+ "WHERE cxpto_id = :cxpto_id";
		
		try {
			logger.info(idUsuario + "|Eliminando concepto con id: " + concepto.getCxpto_id()
				+ ". Puesto ID: " + concepto.getCxpto_idpuesto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 4, 
					"Eliminando concepto con id: " + concepto.getCxpto_id()
						+ ". Puesto ID: " + concepto.getCxpto_idpuesto(), 
					ipUsuario, macUsuario);
			
			int resultado = entityManager.createNativeQuery(query)
					.setParameter("cxpto_situacion", 0)
					.setParameter("cxpto_id", concepto.getCxpto_id())
					.executeUpdate();

			if (resultado > 0) {
				logger.info(idUsuario + "|Se ha eliminado el concepto exitosamente.");
				return true;
			}
			
			logger.error(idUsuario + "|Error al eliminar concepto. PuestosDaoImp.eliminarConcepto.");
			return false;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al eliminar el concepto con id: "  + concepto.getCxpto_id() + 
					". Puesto ID: " + concepto.getCxpto_idpuesto() + ". PuestosDaoImp.eliminarConcepto." 
					+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 8, 
					"Error al eliminar el concepto con id: " + concepto.getCxpto_id()
						+ ". Puesto ID: " + concepto.getCxpto_idpuesto() + 
						". PuestosDaoImp.eliminarConcepto.", 
					ipUsuario, macUsuario);

			return false;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> LlenarModalConcepto(sn_conceptosxpuesto datosConcepto) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "SELECT con_concepto, con_descripcion, con_tipo, con_importe, con_id, \n"
				+ "con_fechainicio, con_fechatermino, con_usucapturo, \n"
				+ "(select usu_alias from sg_usuario where usu_id = con_usucapturo) as usu_capturodesc, \n"
				+ "con_fechamod, con_usumodifico, \n"
				+ "(select usu_alias from sg_usuario where usu_id = con_usumodifico) as usu_modificodesc \n"
				+ "FROM ctg_conceptosdenomina \n"
				+ "WHERE con_tipo = :con_tipo \n"
				+ "and con_concepto not in (select cxpto_concepto from sn_conceptosxpuesto \n"
				+ "where cxpto_tipocpto = :cxpto_tipocpto \n"
				+ "and cxpto_idpuesto = :cxpto_idpuesto and cxpto_situacion = :cxpto_situacion)";
		
		List<Object[]> conceptos = new ArrayList<>();
		
		try {

			logger.info(idUsuario + "|Búsqueda de conceptos tipo: " + datosConcepto.getCxpto_tipocpto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 2, 
					"Búsqueda de conceptos tipo: " + datosConcepto.getCxpto_tipocpto(), 
					ipUsuario, macUsuario);
			
			conceptos = entityManager.createNativeQuery(query)
					.setParameter("con_tipo", datosConcepto.getCxpto_tipocpto())
					.setParameter("cxpto_tipocpto", datosConcepto.getCxpto_tipocpto())
					.setParameter("cxpto_idpuesto", datosConcepto.getCxpto_idpuesto())
					.setParameter("cxpto_situacion", 1)
					.getResultList();

			return conceptos;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al consultar los conceptos tipo: " + datosConcepto.getCxpto_tipocpto()
				+ ". PuestosDaoImp.LlenarModalConcepto." + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 51, 8, 
					"Error al consultar los conceptos tipo: " + datosConcepto.getCxpto_tipocpto()
					+ " PuestosDaoImp.LlenarModalConcepto.", 
					ipUsuario, macUsuario);

			return new ArrayList<>();
		}
	}

	@Override
	public List<Object> AgregarConcepto(sn_conceptosxpuesto concepto) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();

		sesionUsuario = sesion.sesionUsuario();

		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");

		List<Object> codigoError = new ArrayList<>();
		
		String query = "SELECT COUNT(*) FROM sn_conceptosxpuesto WHERE "
				+ "cxpto_idpuesto = :cxpto_idpuesto AND "
				+ "cxpto_concepto = :cxpto_concepto AND "
				+ "cxpto_tipocpto = :cxpto_tipocpto AND "
				+ "cxpto_situacion = 1";
		
		try {
			logger.info(idUsuario + "|Comprobando si existe algún puesto con el concepto: " 
						+ concepto.getCxpto_concepto() + ". Con situación 1");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 2, 
					"Comprobando si existe algún puesto con el concepto: " + concepto.getCxpto_concepto() +
					". Con situación 1", 
					ipUsuario, macUsuario);
			
			//Obtiene la cantidad de conceptos habilitados
			Object count = entityManager.createQuery(query)
					.setParameter("cxpto_idpuesto", concepto.getCxpto_idpuesto())
					.setParameter("cxpto_concepto", concepto.getCxpto_concepto())
					.setParameter("cxpto_tipocpto", concepto.getCxpto_tipocpto())
					.getSingleResult();
			
			int conceptosIguales = Integer.valueOf(count.toString());
			
			if (conceptosIguales > 0) {
				logger.error(idUsuario + "|Error al insertar el concepto: " + concepto.getCxpto_concepto() +
						". El puesto ya tiene agregado el concepto. PuestosDaoImp.AgregarConcepto");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 8, 
						"Error al insertar el concepto: " + concepto.getCxpto_concepto() + 
						". El puesto ya tiene agregado el concepto. PuestosDaoImp.AgregarConcepto", 
						ipUsuario, macUsuario);
				
				codigoError.add(1);//1 = el puesto ya tiene agregado el concepto
				return codigoError;
			}
			
			query = "SELECT COUNT(*) FROM sn_conceptosxpuesto WHERE "
					+ "cxpto_idpuesto = :cxpto_idpuesto AND "
					+ "cxpto_concepto = :cxpto_concepto AND "
					+ "cxpto_tipocpto = :cxpto_tipocpto AND "
					+ "cxpto_situacion = 0";
			
			logger.info(idUsuario + "|Comprobando si existe algún puesto con el concepto: " 
					+ concepto.getCxpto_concepto() + ". Con situación 0");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 2, 
				"Comprobando si existe algún puesto con el concepto: " + concepto.getCxpto_concepto() +
				". Con situación 0", 
				ipUsuario, macUsuario);
			
			//Obtiene la cantidad de conceptos deshabilitados
			Object countRegistro = entityManager.createQuery(query)
					.setParameter("cxpto_idpuesto", concepto.getCxpto_idpuesto())
					.setParameter("cxpto_concepto", concepto.getCxpto_concepto())
					.setParameter("cxpto_tipocpto", concepto.getCxpto_tipocpto())
					.getSingleResult();
			
			int conceptoDeshabilitado = Integer.valueOf(countRegistro.toString());
			
			logger.info(idUsuario + "|Obteniendo importe del concepto: " + concepto.getCxpto_concepto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 2, 
					"Obteniendo importe del concepto: " + concepto.getCxpto_concepto(), 
					ipUsuario, macUsuario);
			
			query = "SELECT con_importe FROM ctg_conceptosdenomina "
					+ "WHERE con_concepto = :con_concepto AND "
					+ "con_tipo = :con_tipo";
			
			Object importe = entityManager.createQuery(query)
					.setParameter("con_concepto", concepto.getCxpto_concepto())
					.setParameter("con_tipo", concepto.getCxpto_tipocpto())
					.getSingleResult();
			
			BigDecimal importeConcepto = new BigDecimal(importe.toString());
			
			List<Object> codigoCorrecto = new ArrayList<>();
			
			if (conceptoDeshabilitado > 0) {
				logger.info(idUsuario + "|El concepto: " + concepto.getCxpto_concepto()
					+ ". Ya se encuentra registrado. Cambiando su situación a Activo.");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 3, 
						"El concepto: " + concepto.getCxpto_concepto()
						+ ". Ya se encuentra registrado. Cambiando su situación a Activo.", 
						ipUsuario, macUsuario);
				
				query = "UPDATE sn_conceptosxpuesto "
						+ "SET cxpto_situacion = 1, "
						+ "cxpto_fechatermino = NULL, "
						+ "cxpto_usumodifico = :cxpto_usumodifico, "
						+ "cxpto_fechamod = current_date "
						+ "WHERE cxpto_idpuesto = :cxpto_idpuesto AND "
						+ "cxpto_concepto = :cxpto_concepto AND "
						+ "cxpto_tipocpto = :cxpto_tipocpto";
				
				int insertarConcepto = entityManager.createNativeQuery(query)
						.setParameter("cxpto_usumodifico", concepto.getCxpto_usumodifico())
						.setParameter("cxpto_idpuesto", concepto.getCxpto_idpuesto())
						.setParameter("cxpto_concepto", concepto.getCxpto_concepto())
						.setParameter("cxpto_tipocpto", concepto.getCxpto_tipocpto())
						.executeUpdate();
				
				if (insertarConcepto > 0) {
					logger.info(idUsuario + "|Se ha agregado el concepto: " + concepto.getCxpto_concepto() +
							". Al puesto con id: " + concepto.getCxpto_idpuesto());
					
					auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 6, 
							"Se ha agregado el concepto: " + concepto.getCxpto_concepto() +
								". Al puesto con id: " + concepto.getCxpto_idpuesto(), 
							ipUsuario, macUsuario);
					
					codigoCorrecto.add(2);
					return codigoCorrecto;
				}
			}
			
			/*Si el concepto no se ha registrado, entonces se hace la inserción a la tabla*/
			
			logger.info(idUsuario + "|Insertando concepto: " + concepto.getCxpto_concepto() +
					". Al puesto con Id: " + concepto.getCxpto_idpuesto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 1, 
					"Insertando concepto: " + concepto.getCxpto_concepto() +
					". Al puesto con Id: " + concepto.getCxpto_idpuesto(), 
					ipUsuario, macUsuario);
			
			query = "INSERT INTO sn_conceptosxpuesto(cxpto_idpuesto, \n"
					+ "cxpto_concepto, cxpto_tipocpto, cxpto_importe, cxpto_situacion, cxpto_ejercicio, \n"
					+ "cxpto_tabla, cxpto_fechainicio, \n"
					+ "cxpto_usucapturo, cxpto_fechamod, cxpto_usumodifico) \n"
					+ " VALUES ("
					+ ":cxpto_idpuesto, :cxpto_concepto, \n"
					+ ":cxpto_tipocpto, :cxpto_importe, :cxpto_situacion, \n"
					+ "(SELECT EXTRACT(YEAR FROM CURRENT_DATE) AS current_year), :cxpto_tabla, \n"
					+ "current_date, :cxpto_usucapturo, \n"
					+ "current_date, :cxpto_usumodifico)";
			
			int insertarConcepto = entityManager.createNativeQuery(query)
					.setParameter("cxpto_idpuesto", concepto.getCxpto_idpuesto())
					.setParameter("cxpto_concepto", concepto.getCxpto_concepto())
					.setParameter("cxpto_tipocpto", concepto.getCxpto_tipocpto())
					.setParameter("cxpto_importe", importeConcepto)
					.setParameter("cxpto_situacion", 1)
					.setParameter("cxpto_tabla", 1)
					//.setParameter("cxpto_fechainicio", importeConcepto)
					//.setParameter("cxpto_fechatermino", importeConcepto)
					.setParameter("cxpto_usucapturo", concepto.getCxpto_usucapturo())
					//.setParameter("cxpto_fechamod", importeConcepto)
					.setParameter("cxpto_usumodifico", concepto.getCxpto_usucapturo())
					.executeUpdate();
			
			if (insertarConcepto > 0) {
				logger.info(idUsuario + "|Se ha agregado el concepto: " + concepto.getCxpto_concepto() +
						". Al puesto con id: " + concepto.getCxpto_idpuesto());
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 6, 
						"Se ha agregado el concepto: " + concepto.getCxpto_concepto() +
						". Al puesto con id: " + concepto.getCxpto_idpuesto(), 
						ipUsuario, macUsuario);
				
				codigoCorrecto.add(2);
				return codigoCorrecto;
			}
			
			logger.error(idUsuario + "|Error al insertar el concepto: " + concepto.getCxpto_concepto() +
						". PuestosDaoImp.AgregarConcepto.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 8, 
					"Error al insertar el concepto: " + concepto.getCxpto_concepto() +
						". PuestosDaoImp.AgregarConcepto.", 
					ipUsuario, macUsuario);
			
			return new ArrayList<>();

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al insertar el concepto: " + concepto.getCxpto_concepto()
					+ ". PuestosDaoImp.AgregarConcepto." + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 8, 
					"Error al insertar el concepto: " + concepto.getCxpto_concepto() +
						". PuestosDaoImp.AgregarConcepto.", 
					ipUsuario, macUsuario);

			return new ArrayList<>();
		}
	}

	@Override
	public boolean ModificarImporte(sn_conceptosxpuesto concepto) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");

		String query = "UPDATE sn_conceptosxpuesto "
				+ "SET cxpto_importe = :cxpto_importe, "
				+ "cxpto_usumodifico = :cxpto_usumodifico, "
				+ "cxpto_fechamod = current_date \n"
				+ "WHERE cxpto_id = :cxpto_id";
		
		try {
			logger.info(idUsuario + "|Actualizando el importe del concepto: " + concepto.getCxpto_concepto()
				+ " con id: " + concepto.getCxpto_id()
				+ ". Puesto ID: " + concepto.getCxpto_idpuesto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 3, 
					"Actualizando el importe del concepto: " + concepto.getCxpto_concepto()
						+ " con id: " + concepto.getCxpto_id()
						+ ". Puesto ID: " + concepto.getCxpto_idpuesto(), 
					ipUsuario, macUsuario);

			int resultado = entityManager.createNativeQuery(query)
					.setParameter("cxpto_id", concepto.getCxpto_id())
					.setParameter("cxpto_importe", concepto.getCxpto_importe())
					.setParameter("cxpto_usumodifico", concepto.getCxpto_usumodifico())
					.executeUpdate();

			if (resultado > 0) {
				logger.info(idUsuario + "|Se ha modificado el importe exitosamente.");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 6, 
						"Se ha modificado el importe exitosamente.", 
						ipUsuario, macUsuario);
				
				return true;
			}
			
			logger.error(idUsuario + "|Error al modificar importe del concepto: " + concepto.getCxpto_concepto()
				+ " con id: " + concepto.getCxpto_id()
				+ ". Puesto ID: " + concepto.getCxpto_idpuesto() 
				+ ". PuestosDaoImp.ModificarImporte.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 8, 
					"Error al modificar importe del concepto: " + concepto.getCxpto_concepto()
						+ " con id: " + concepto.getCxpto_id()
						+ ". Puesto ID: " + concepto.getCxpto_idpuesto() 
						+ ". PuestosDaoImp.ModificarImporte.", 
					ipUsuario, macUsuario);
			
			return false;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al modificar importe del concepto: " + concepto.getCxpto_concepto()
				+ " con id: " + concepto.getCxpto_id()
				+ ". Puesto ID: " + concepto.getCxpto_idpuesto() 
				+ ". PuestosDaoImp.ModificarImporte.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 8, 
					"Error al modificar importe del concepto: " + concepto.getCxpto_concepto()
						+ " con id: " + concepto.getCxpto_id()
						+ ". Puesto ID: " + concepto.getCxpto_idpuesto() 
						+ ". PuestosDaoImp.ModificarImporte.", 
					ipUsuario, macUsuario);

			return false;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_puesto> puestosSinConceptos() {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		List<ctg_puesto> lista = new ArrayList<ctg_puesto>();
		
		String query = "select ctgp_codigo, ctgp_descripcion from ctg_puesto where \n"
				+ "ctgp_id in (select pto_idcodpuesto from sn_cfgpuesto where \n"
				+ "pto_id not in (select cxpto_idpuesto from sn_conceptosxpuesto))";
		
		try {
			logger.info(idUsuario + "|Realizando consulta de puestos sin conceptos.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 2, 
					"Realizando consulta de puestos sin conceptos (ctg_puesto, sn_cfgpuesto, "
					+ "sn_conceptosxpuesto)", 
					ipUsuario, macUsuario);
			
			return lista = (List<ctg_puesto>) entityManager.createNativeQuery(query)
					.getResultList();
			
		} catch (Exception e) {
			logger.error("Error al consultar puestos sin conceptos. PuestoDaoImp.puestosSinConceptos." 
					+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 8, 
					"Error al consultar puestos sin conceptos. PuestoDaoImp.puestosSinConceptos.", 
					ipUsuario, macUsuario);
			
			return new ArrayList<>();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_puesto> SituacionPuestoSinConceptos(ctg_puesto codigo) {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		List<ctg_puesto> lista = new ArrayList<ctg_puesto>();
		
		String query = "select ctgp_id, ctgp_situacion from ctg_puesto \n"
				+ "where ctgp_codigo = :ctgp_codigo";
		
		try {
			logger.info(idUsuario + "|Realizando consulta de la situación del puesto: " +
					codigo.getCtgp_codigo() + ". El cual no tiene conceptos.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 8, 
					"Realizando consulta de la situación del puesto: " +
						codigo.getCtgp_codigo() + ". El cual no tiene conceptos.", 
					ipUsuario, macUsuario);
			
			return lista = (List<ctg_puesto>) entityManager.createNativeQuery(query)
					.setParameter("ctgp_codigo", codigo.getCtgp_codigo())
					.getResultList();
			
		} catch (Exception e) {
			logger.error("Error al consultar el puesto: " + codigo.getCtgp_codigo() + 
					". PuestoDaoImp.SituacionPuestoSinConceptos." 
					+ e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 8, 
					"Error al consultar el puesto: " + codigo.getCtgp_codigo() + 
					". PuestoDaoImp.SituacionPuestoSinConceptos.", 
					ipUsuario, macUsuario);
			
			return new ArrayList<>();
		}
	}

	@Override
	public boolean InsertarPuesto(sn_conceptosxpuesto concepto) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query =  "INSERT INTO sn_conceptosxpuesto(cxpto_idpuesto, \n"
			+ "	cxpto_concepto, cxpto_tipocpto, cxpto_importe, \n"
			+ " cxpto_situacion, cxpto_ejercicio, \n"
			+ "	cxpto_tabla, cxpto_fechainicio, \n"
			+ "	cxpto_usucapturo, cxpto_fechamod, cxpto_usumodifico) \n"
			+ " VALUES ( "
			+ " :cxpto_idpuesto, :cxpto_concepto, \n"
			+ "	:cxpto_tipocpto, :cxpto_importe, :cxpto_situacion, \n"
			+ "	(SELECT EXTRACT(YEAR FROM CURRENT_DATE) AS current_year), :cxpto_tabla, \n"
			+ "	current_date, :cxpto_usucapturo, \n"
			+ "	current_date, :cxpto_usumodifico)";
		
		try {
			
			logger.info(idUsuario + "|Insertando el concepto: " + concepto.getCxpto_concepto() + 
					" al puesto con id: " + concepto.getCxpto_idpuesto());
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 1, 
					"Insertando el concepto " + concepto.getCxpto_concepto() + 
					". Al puesto con id: " + concepto.getCxpto_idpuesto(), 
					ipUsuario, macUsuario);
			
			int resultado = 0;
			
			resultado = entityManager.createNativeQuery(query)
					.setParameter("cxpto_idpuesto", concepto.getCxpto_idpuesto())
					.setParameter("cxpto_concepto", concepto.getCxpto_concepto())
					.setParameter("cxpto_tipocpto", concepto.getCxpto_tipocpto())
					.setParameter("cxpto_importe", concepto.getCxpto_importe())
					.setParameter("cxpto_situacion", 1)
					.setParameter("cxpto_tabla", 1)
					.setParameter("cxpto_usucapturo", concepto.getCxpto_usucapturo())
					.setParameter("cxpto_usumodifico", concepto.getCxpto_usumodifico())
					.executeUpdate();
			
			if (resultado > 0) {
				logger.info(idUsuario + "|Se ha insertado el concepto " + concepto.getCxpto_concepto()
						+ " correctamente.");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 6, 
						"Se ha insertado el concepto " + concepto.getCxpto_concepto() + 
						". Al puesto con id: " + concepto.getCxpto_idpuesto(), 
						ipUsuario, macUsuario);
				
				return true;
			}
			
			logger.error(idUsuario + "|Error al insertar el concepto " + concepto.getCxpto_concepto() + 
					". PuestosDaoImp.InsertarPuesto.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 6, 
					"Error al insertar el concepto " + concepto.getCxpto_concepto() + 
					". Del puesto: " + concepto.getCxpto_idpuesto() + ". PuestosDaoImp.InsertarPuesto.", 
					ipUsuario, macUsuario);
			
			return false;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al insertar el concepto " + concepto.getCxpto_concepto() + 
					". PuestosDaoImp.InsertarPuesto.");

			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 60, 6, 
					"Error al insertar el concepto " + concepto.getCxpto_concepto() + 
					". Del puesto: " + concepto.getCxpto_idpuesto() + ". PuestosDaoImp.InsertarPuesto.", 
					ipUsuario, macUsuario);
			
			return false;
		}
	}
}

