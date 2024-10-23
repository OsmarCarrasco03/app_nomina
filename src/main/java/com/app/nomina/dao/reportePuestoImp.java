					package com.app.nomina.dao;
					import java.util.List;
					import javax.persistence.EntityManager;
					import javax.persistence.PersistenceContext;
					import org.hibernate.query.Query;
					import org.slf4j.Logger;
					import org.slf4j.LoggerFactory;
					import org.springframework.stereotype.Repository;
					import org.springframework.transaction.annotation.Transactional;
					import com.app.nomina.controllers.IndexController;
					import com.app.nomina.models.ctg_lstpuesto;
import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.sn_cfgpuesto;

					@Repository
					@Transactional
					public class reportePuestoImp implements reportePuestoDao{
					
						@PersistenceContext
						EntityManager entityManager;
						Logger logger = LoggerFactory.getLogger(IndexController.class);
						
						
						@SuppressWarnings("unchecked")
						@Override
						public List<ctg_lstpuesto> obtenerDatosXbase() {
						    try {
						        String query = "from ctg_lstpuesto where lpto_clase = 1";
						        List<ctg_lstpuesto> resultados = entityManager.createQuery(query).getResultList();
						        logger.info("Consulta exitosa -Resultados: " + resultados);
						        return resultados;
						        } 
						    catch (Exception e) {
						        logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
						       
						        throw new RuntimeException("Error al ejecutar la consulta", e);
						    }
						}
					
						
						@SuppressWarnings("unchecked")
						@Override
						public List<ctg_lstpuesto> obtenerDatosXindice() {
							try {
							    String query = "from ctg_lstpuesto where lpto_clase = 2";
							    logger.info("Consulta exitosa - Resultados: " + entityManager.createQuery(query).getResultList());
							    return entityManager.createQuery(query).getResultList();
								}
									catch (Exception e) {
										logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
										throw new RuntimeException("Error al ejecutar la consulta", e);
							}
							   
						}
						
						
						@SuppressWarnings("unchecked")
						@Override
						public List<ctg_niveles> obtenerDatosXnivel() {
							try {
						    String query = "from ctg_niveles  where nvl_situacion = 1";
						    logger.info("Consulta exitosa - Resultados: " + entityManager.createQuery(query).getResultList());
						    return entityManager.createQuery(query).getResultList();
							}catch (Exception e) {
								logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
								throw new RuntimeException("Error al ejecutar la consulta", e);
							}
						    
						}
						
						@SuppressWarnings("unchecked")
						@Override
						public List<ctg_lstpuesto> obtenerDatosXcategoria() {
						  try {
							    String query = "from ctg_lstpuesto where lpto_clase = 3";
							    logger.info("query: " + entityManager.createQuery(query).getResultList());
							    return entityManager.createQuery(query).getResultList();
							        }   
								catch (Exception e) {
								logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
								throw new RuntimeException("Error al ejecutar la consulta", e);
							}
							    
					}
							
						@SuppressWarnings("unchecked")
						@Override
						public List<ctg_lstpuesto> obtenerDatosXsubcategoria() {
							try {
						    String query = "from ctg_lstpuesto where lpto_clase = 4";
						    logger.info("query: " + entityManager.createQuery(query).getResultList());
						    return entityManager.createQuery(query).getResultList();
						}catch (Exception e) {
							logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
							throw new RuntimeException("Error al ejecutar la consulta", e);
						}
						    
						}
						
						@SuppressWarnings("unchecked")
						@Override
						public List<ctg_lstpuesto> obtenerDatosXinterna() {
							try {
						    String query = "from ctg_lstpuesto where lpto_clase = 5";
						    logger.info("query: " + entityManager.createQuery(query).getResultList());
						    return entityManager.createQuery(query).getResultList();
						}catch (Exception e) {
							logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
							throw new RuntimeException("Error al ejecutar la consulta", e);
						}
						    
						}
						
						
						@SuppressWarnings("unchecked")
						@Override
						public List<ctg_lstpuesto> obtenerDatosXcontratacion() {
							try {
						    String query = "from ctg_lstpuesto where lpto_clase = 6";
						    logger.info("query: " + entityManager.createQuery(query).getResultList());
						    return entityManager.createQuery(query).getResultList();
						}catch (Exception e) {
							logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
							throw new RuntimeException("Error al ejecutar la consulta", e);
						}
						    
						}
						
						
					
						@SuppressWarnings("unchecked")
						@Override
						public List<ctg_lstpuesto> obtenerDatosXdeclaracion() {
							try {
						    String query = "from ctg_lstpuesto where lpto_clase = 7";
						    logger.info("query: " + entityManager.createQuery(query).getResultList());
						    return entityManager.createQuery(query).getResultList();
						   }catch (Exception e) {
							logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
							throw new RuntimeException("Error al ejecutar la consulta", e);
						}
						    
						}
					
						
					@SuppressWarnings({ "rawtypes", "unchecked" })
					public List<sn_cfgpuesto> obtenerDatosXeleccion(sn_cfgpuesto eleccion) {
					//		
					//		String query = "SELECT pto_id, pto_idcodpuesto, ctgp_codigo, ctgp_descripcion, pto_tipo,\n"
					//				+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto2 WHERE lpto_clase = 1 AND lpto_clave = pto_tipo) AS tipo_desc,\n"
					//				+ "    pto_zona,\n"
					//				+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto2 WHERE lpto_clase = 2 AND lpto_clave = pto_zona) AS zona_desc,\n"
					//				+ "    pto_nivel,\n"
					//				+ "    nvl_nivel,\n"
					//				+ "    pto_categoria,\n"
					//				+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto2 WHERE lpto_clase = 3 AND lpto_clave = pto_categoria) AS categoria_desc,\n"
					//				+ "    pto_subcategoria,\n"
					//				+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto2 WHERE lpto_clase = 4 AND lpto_clave = pto_subcategoria) AS subcat_desc,\n"
					//				+ "    pto_clasfinterna,\n"
					//				+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto2 WHERE lpto_clase = 5 AND lpto_clave = pto_clasfinterna) AS clasfint_desc,\n"
					//				+ "    pto_contratacion,\n"
					//				+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto2 WHERE lpto_clase = 6 AND lpto_clave = pto_contratacion) AS contratacion_desc,\n"
					//				+ "    pto_declaracion,\n"
					//				+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto2 WHERE lpto_clase = 7 AND lpto_clave = pto_declaracion) AS declaracion_desc,\n"
					//				+ "    pto_fechainicio,\n"
					//				+ "    pto_fechatermino,\n"
					//				+ "    pto_usucapturo,\n"
					//				+ "    (SELECT usu_alias FROM sg_usuario WHERE usu_id = pto_usucapturo) AS usucapturo_alias,\n"
					//				+ "    pto_fechamod,\n"
					//				+ "    pto_usumodifico,\n"
					//				+ "    (SELECT usu_alias FROM sg_usuario WHERE usu_id = pto_usumodifico) AS usumodifico_alias,\n"
					//				+ "    pto_situacion\n"
					//				+ "FROM\n"
					//				+ "    sn_cfgpuesto2,\n"
					//				+ "    ctg_puesto,\n"
					//				+ "    ctg_niveles\n"
					//				+ "WHERE\n"
					//				+ "    ctgp_id = pto_idcodpuesto\n"
					//				+ "    AND nvl_id = pto_nivel";
							try {
							String query = "SELECT\n"
									+ "    (SELECT ctgp_codigo FROM ctg_puesto WHERE ctgp_id = pto_idcodpuesto) AS ctgp_codigo,\n"
									+ "    (SELECT ctgp_descripcion FROM ctg_puesto WHERE ctgp_id = pto_idcodpuesto) AS ctgp_descripcion,\n"
									+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 1 AND lpto_clave = pto_tipo) AS tipo_desc,\n"
									+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 2 AND lpto_clave = pto_zona) AS zona_desc,\n"
									+ "    (SELECT nvl_nivel FROM ctg_niveles WHERE nvl_id = pto_nivel) AS nvl_nivel,\n"
									+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 3 AND lpto_clave = pto_categoria) AS categoria_desc,\n"
									+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 4 AND lpto_clave = pto_subcategoria) AS subcat_desc,\n"
									+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 5 AND lpto_clave = pto_clasfinterna) AS clasfint_desc,\n"
									+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 6 AND lpto_clave = pto_contratacion) AS contratacion_desc,\n"
									+ "    (SELECT lpto_descripcion FROM ctg_lstpuesto WHERE lpto_clase = 7 AND lpto_clave = pto_declaracion) AS declaracion_desc,\n"
									+ "    pto_fechainicio,\n"
									+ "    pto_fechatermino,\n"
									+ "    (SELECT usu_alias FROM sg_usuario WHERE usu_id = pto_usucapturo) AS usucapturo_alias,\n"
									+ "    pto_fechamod,\n"
									+ "    (SELECT usu_alias FROM sg_usuario WHERE usu_id = pto_usumodifico) AS usumodifico_alias\n"
									+ "    FROM\n"
									+ "    sn_cfgpuesto\n"
									+ "    WHERE\n"
									+ "    1 = 1\n";
							
						    if (eleccion.getPto_tipo() != null) {
						        query += " AND pto_tipo = :ptotipoElegido";
						    } 
					
						    if (eleccion.getPto_zona() != null) {
						        query += " AND pto_zona = :zonaElegido";
						    }
						    
						    if (eleccion.getPto_nivel() != null) {
						        query += " AND pto_nivel = :nivelElegido";
						    }
						    
						    if (eleccion.getPto_categoria() != null) {
						        query += " AND pto_categoria = :categoriaElegido";
						    }
						    
						    if (eleccion.getPto_subcategoria() != null) {
						        query += " AND pto_subcategoria = :subcategoriaElegido";
						    }
						    
						    if (eleccion.getPto_clasfinterna() != null) {
						        query += " AND pto_clasfinterna = :clasfinternaElegido";
						    }
						    
						    if (eleccion.getPto_contratacion() != null) {
						        query += " AND pto_contratacion = :contratacionElegido";
						    }
						    if (eleccion.getPto_declaracion() != null) {
						        query += " AND pto_declaracion = :declaracionElegido";
						    }
						    
						    if (eleccion.getPto_idcodpuesto() != null) {
						        query += " AND pto_idcodpuesto = :idcodpuestoElegido";
						    }
						    
						    if (eleccion.getPto_situacion() != null) {
						        query += " AND pto_situacion = :situacionElegido";
						    }
					
						    Query consulta = (Query) entityManager.createQuery(query);
					
						    if (eleccion.getPto_tipo() != null) {
						        consulta.setParameter("ptotipoElegido", eleccion.getPto_tipo());
						    }
					
						    if (eleccion.getPto_zona() != null) {
						        consulta.setParameter("zonaElegido", eleccion.getPto_zona());
						    }
						    
						    if (eleccion.getPto_nivel() != null) {
						        consulta.setParameter("nivelElegido", eleccion.getPto_nivel());
						    }
						    
						    if (eleccion.getPto_categoria() != null) {
						        consulta.setParameter("categoriaElegido", eleccion.getPto_categoria());
						    }
						    
						    
						    if (eleccion.getPto_subcategoria() != null) {
						        consulta.setParameter("subcategoriaElegido", eleccion.getPto_subcategoria());
						    }
						    
						    if (eleccion.getPto_clasfinterna() != null) {
						        consulta.setParameter("clasfinternaElegido", eleccion.getPto_clasfinterna());
						    }
						    
					
						    if (eleccion.getPto_contratacion() != null) {
						        consulta.setParameter("contratacionElegido", eleccion.getPto_contratacion());
						    }
						    
						    if (eleccion.getPto_declaracion() != null) {
						        consulta.setParameter("declaracionElegido", eleccion.getPto_declaracion());
						    }
						    
						    if (eleccion.getPto_idcodpuesto() != null) {
						        consulta.setParameter("idcodpuestoElegido", eleccion.getPto_idcodpuesto());
						    }
					
					
						    if (eleccion.getPto_situacion() != null) {
						        consulta.setParameter("situacionElegido", eleccion.getPto_situacion());
						    }
					
					        List<sn_cfgpuesto> descripcion = consulta.getResultList();
					        logger.info("Consulta exitosa al generar repote de puesto " + descripcion);
					        return descripcion;
					        
					        } catch (Exception e) {
					        logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
					        throw new RuntimeException("Error al ejecutar la consulta", e);
					    }
					}
				}