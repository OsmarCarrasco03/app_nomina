package com.app.nomina.dao;
import com.app.nomina.models.sn_cfgpuesto;
import com.app.nomina.models.ctg_puesto;
import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.ctg_lstpuesto;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class ConsultaPuestoImp implements ConsultaPuestoDAO{

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<sn_cfgpuesto> obtenerDatosPuesto() {
		String query = "select pto_id,\n"
				+ "pto_idcodpuesto,\n"
				+ "ctgp_codigo, ctgp_descripcion,\n"
				+ "pto_tipo,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = pto_tipo) as tipo_desc,\n"
				+ "pto_zona,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = pto_zona) as zona_desc,\n"
				+ "pto_nivel,\n"
				+ "nvl_nivel,\n"
				+ "pto_categoria,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = pto_categoria) as categoria_desc,\n"
				+ "pto_subcategoria,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = pto_subcategoria) as subcat_desc,\n"
				+ "pto_clasfinterna,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = pto_clasfinterna) as clasfint_desc,\n"
				+ "pto_contratacion,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = pto_contratacion) as contratacion_desc,\n"
				+ "pto_declaracion,\n"
				+ "(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = pto_declaracion) as declaracion_desc,\n"
				+ "pto_fechainicio, pto_fechatermino,\n"
				+ "pto_usucapturo,\n"
				+ "(select usu_alias from sg_usuario where usu_id = pto_usucapturo) usucapturo_alias,\n"
				+ "pto_fechamod,\n"
				+ "pto_usumodifico,\n"
				+ "(select usu_alias from sg_usuario where usu_id = pto_usumodifico) usumodifico_alias,\n"
				+ "pto_situacion, ctgp_id\n"
				+ "from sn_cfgpuesto\n"
				+ "join ctg_puesto on ctgp_id = pto_idcodpuesto\n"
				+ "join ctg_niveles on nvl_id = pto_nivel\n"
				+"order by nvl_id";	
				

		//List<sn_cfgpuesto> detalle = entityManager.createNativeQuery(query).getResultList();
		
//		return detalle;
		
		return entityManager.createNativeQuery(query).getResultList();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_puesto> obtenerDatosCtgPuesto() {
		String query ="select ctgp_codigo, ctgp_descripcion\n"
				+ "from sn_cfgpuesto\n"
				+ "join ctg_puesto on ctgp_id = pto_idcodpuesto\n"
				+ "join ctg_niveles on nvl_id = pto_nivel\n"
				+ "group by ctgp_codigo, ctgp_descripcion";
		
		return entityManager.createNativeQuery(query).getResultList();
	}

	@Override
	public List<ctg_niveles> obtenerDatosCtgNiveles() {
		// TODO Apéndice de método generado automáticamente
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_lstpuesto> obtenerDatosctg_lstpuesto() {
		String query ="SELECT  ctgp_id AS alias_ctgp_id,\n" + //
						"        ctgp_codigo AS alias_ctgp_codigo,\n" + //
						"        ctgp_descripcion,\n" + //
						"        ctgp_fechainicio,\n" + //
						"        ctgp_fechamod,\n" + //
						"        ctgp_situacion,\n" + //
						"        (SELECT usu_alias FROM sg_usuario WHERE usu_id = ctgp_usucapturo) AS alias_capturo,\n" + //
						"        (SELECT usu_alias FROM sg_usuario WHERE usu_id = ctgp_usumodifico) AS alias_modifico\n" + //
						"FROM ctg_puesto;";
		
		return entityManager.createNativeQuery(query).getResultList();
	}

}