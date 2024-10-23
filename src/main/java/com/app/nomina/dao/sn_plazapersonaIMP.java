package com.app.nomina.dao;

import com.app.nomina.models.*;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class sn_plazapersonaIMP implements sn_plazapersonaDAO{

    @PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")
    @Override
    public List<sn_plazapersona> queryUnoSnPlazaPersonaAllDatos (@Param("pxp_idplaza")int pxp_idplaza) {
        
        String query = "SELECT\n"
        		+ "	p.pxp_idplaza, p.pxp_idpersona,\n"
        		+ "	plaza.plz_numero, plaza.plz_numplzpadre, plaza.plz_codintrhnet,\n"
        		+ "	plaza.plz_estatusocup,\n"
        		+ "	(select lplz_descripcion from ctg_lstplaza where lplz_clase = 1 and lplz_clave = plz_estatusocup) as statusocup_desc,\n"
        		+ "	plaza.plz_motoblidecpatri,\n"
        		+ "	(select lplz_descripcion from ctg_lstplaza where lplz_clase = 2 and lplz_clave = plz_motoblidecpatri) as motoblipatri_desc,\n"
        		+ "	plaza.plz_areas, plaza.plz_conpublicas, plaza.plz_traclap, plaza.plz_traebi,\n"
        		+ "	plaza.plz_traemdmajr,\n"
        		+ "	(select lplz_descripcion from ctg_lstplaza where lplz_clase = 7 and lplz_clave = plz_traemdmajr) as traemdmajr_desc,\n"
        		+ "	plaza.plz_nivelequiv,\n"
        		+ "	(select lplz_descripcion from ctg_lstplaza where lplz_clase = 8 and lplz_clave = plz_nivelequiv) as nivelequiv_desc,\n"
        		+ "	plaza.plz_rfiriuf, plaza.plz_tiposervpublico,\n"
        		+ "	plaza.plz_unidad, unidad.uni_idunidad, unidad.uni_desc,\n"
        		+ "	plaza.plz_centrodist, centrodist.cdis_clave, centrodist.cdis_nombre,\n"
        		+ "	plaza.plz_centrotrabajo, centrotrab.ctra_clave, centrotrab.ctra_nombre,\n"
        		+ "	plaza.plz_ptoautorizado,\n"
        		+ "	(select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptoautorizado) as idcodpuestoa,\n"
        		+ "	(select ctgp_codigo from ctg_puesto where ctgp_id = (select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as codpuestoa,\n"
        		+ "	(select ctgp_descripcion from ctg_puesto where ctgp_id = (select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descpuestoa,\n"
        		+ "	(select pto_tipo from sn_cfgpuesto where pto_id = plz_ptoautorizado) as tipopuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = (select pto_tipo from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as desctipoptoa,\n"
        		+ "	(select pto_zona from sn_cfgpuesto where pto_id = plz_ptoautorizado) as zonapuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = (select pto_zona from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as desczonaptoa,\n"
        		+ "	(select pto_nivel from sn_cfgpuesto where pto_id = plz_ptoautorizado) as nivelpuestoa,\n"
        		+ "	(select nvl_nivel from ctg_niveles where nvl_id = (select pto_nivel from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descnivptoa,\n"
        		+ "	(select pto_categoria from sn_cfgpuesto where pto_id = plz_ptoautorizado) as categoriapuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = (select pto_categoria from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as desccatptoa,\n"
        		+ "	(select pto_subcategoria from sn_cfgpuesto where pto_id = plz_ptoautorizado) as subcatpuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = (select pto_subcategoria from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descsubcatptoa,\n"
        		+ "	(select pto_clasfinterna from sn_cfgpuesto where pto_id = plz_ptoautorizado) as clasfintpuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = (select pto_clasfinterna from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descclasintptoa,\n"
        		+ "	(select pto_contratacion from sn_cfgpuesto where pto_id = plz_ptoautorizado) as contratacionpuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = (select pto_contratacion from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as desccontraptoa,\n"
        		+ "	(select pto_declaracion from sn_cfgpuesto where pto_id = plz_ptoautorizado) as declaracionpuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = (select pto_declaracion from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descdeclaptoa,\n"
        		+ "	plaza.plz_ptopagado,\n"
        		+ "	(select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptopagado) as idcodpuestop,\n"
        		+ "	(select ctgp_codigo from ctg_puesto where ctgp_id = (select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptopagado)) as codpuestop,\n"
        		+ "	(select ctgp_descripcion from ctg_puesto where ctgp_id = (select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptopagado)) as descpuestop,\n"
        		+ "	(select pto_tipo from sn_cfgpuesto where pto_id = plz_ptopagado) as tipopuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = (select pto_tipo from sn_cfgpuesto where pto_id = plz_ptopagado)) as desctipoptop,\n"
        		+ "	(select pto_zona from sn_cfgpuesto where pto_id = plz_ptopagado) as zonapuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = (select pto_zona from sn_cfgpuesto where pto_id = plz_ptopagado)) as desczonaptop,\n"
        		+ "	(select pto_nivel from sn_cfgpuesto where pto_id = plz_ptopagado) as nivelpuestop,\n"
        		+ "	(select nvl_nivel from ctg_niveles where nvl_id = (select pto_nivel from sn_cfgpuesto where pto_id = plz_ptopagado)) as descnivptop,\n"
        		+ "	(select pto_categoria from sn_cfgpuesto where pto_id = plz_ptopagado) as categoriapuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = (select pto_categoria from sn_cfgpuesto where pto_id = plz_ptopagado)) as desccatptop,\n"
        		+ "	(select pto_subcategoria from sn_cfgpuesto where pto_id = plz_ptopagado) as subcatpuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = (select pto_subcategoria from sn_cfgpuesto where pto_id = plz_ptopagado)) as descsubcatptop,\n"
        		+ "	(select pto_clasfinterna from sn_cfgpuesto where pto_id = plz_ptopagado) as clasfintpuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = (select pto_clasfinterna from sn_cfgpuesto where pto_id = plz_ptopagado)) as descclasintptop,\n"
        		+ "	(select pto_contratacion from sn_cfgpuesto where pto_id = plz_ptopagado) as contratacionpuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = (select pto_contratacion from sn_cfgpuesto where pto_id = plz_ptopagado)) as desccontraptop,\n"
        		+ "	(select pto_declaracion from sn_cfgpuesto where pto_id = plz_ptopagado) as declaracionpuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = (select pto_declaracion from sn_cfgpuesto where pto_id = plz_ptopagado)) as descdeclaptop,\n"
        		+ "	persona.per_nombre, persona.per_appaterno, persona.per_apmaterno, persona.per_numempleado, persona.per_curp,\n"
        		+ "	p.pxp_vigdesde, p.pxp_vighasta,\n"
        		+ "	p.pxp_fechainicio, p.pxp_fechatermino,\n"
        		+ "	p.pxp_usucapturo,\n"
        		+ "	(select usu_alias from sg_usuario where usu_id = p.pxp_usucapturo) as usu_capturo,\n"
        		+ "	p.pxp_fechamod,\n"
        		+ "	p.pxp_usumodifico,\n"
        		+ "	(select usu_alias from sg_usuario where usu_id = p.pxp_usumodifico) as usu_modifico,\n"
        		+ "	p.pxp_situacion,\n"
        		+ "	(case when p.pxp_situacion = 1 then 'ACTIVO' else 'BAJA' end)\n"
        		+ "FROM sn_plazapersona p\n"
        		+ "	join sn_plaza plaza on plaza.plz_id = p.pxp_idplaza\n"
        		+ "	join sn_persona persona on persona.per_id = p.pxp_idpersona\n"
        		+ "	join ctg_unidad unidad on unidad.uni_id = plz_unidad\n"
        		+ "	join ctg_centrodist centrodist on centrodist.cdis_id = plz_centrodist\n"
        		+ "	join ctg_centrotrabajo centrotrab on centrotrab.ctra_id = plz_centrotrabajo\n"
        		+ "WHERE p.pxp_idplaza = ?";


        return entityManager.createNativeQuery(query)
        .setParameter(1, pxp_idplaza) // Establecer el parámetro explícitamente
        .getResultList();

         //return entityManager.createNativeQuery(query).getResultList();
    }






	@SuppressWarnings("unchecked")
    @Override
    public List<sn_plazapersona> queryDosSnPlazaPersonaAllDatos (@Param("pxp_idpersona")int pxp_idpersona) {
        
        String query = "SELECT\n"
        		+ "	p.pxp_idplaza, p.pxp_idpersona,\n"
        		+ "	plaza.plz_numero, plaza.plz_numplzpadre, plaza.plz_codintrhnet,\n"
        		+ "	plaza.plz_estatusocup,\n"
        		+ "	(select lplz_descripcion from ctg_lstplaza where lplz_clase = 1 and lplz_clave = plz_estatusocup) as statusocup_desc,\n"
        		+ "	plaza.plz_motoblidecpatri,\n"
        		+ "	(select lplz_descripcion from ctg_lstplaza where lplz_clase = 2 and lplz_clave = plz_motoblidecpatri) as motoblipatri_desc,\n"
        		+ "	plaza.plz_areas, plaza.plz_conpublicas, plaza.plz_traclap, plaza.plz_traebi,\n"
        		+ "	plaza.plz_traemdmajr,\n"
        		+ "	(select lplz_descripcion from ctg_lstplaza where lplz_clase = 7 and lplz_clave = plz_traemdmajr) as traemdmajr_desc,\n"
        		+ "	plaza.plz_nivelequiv,\n"
        		+ "	(select lplz_descripcion from ctg_lstplaza where lplz_clase = 8 and lplz_clave = plz_nivelequiv) as nivelequiv_desc,\n"
        		+ "	plaza.plz_rfiriuf, plaza.plz_tiposervpublico,\n"
        		+ "	plaza.plz_unidad, unidad.uni_idunidad, unidad.uni_desc,\n"
        		+ "	plaza.plz_centrodist, centrodist.cdis_clave, centrodist.cdis_nombre,\n"
        		+ "	plaza.plz_centrotrabajo, centrotrab.ctra_clave, centrotrab.ctra_nombre,\n"
        		+ "	plaza.plz_ptoautorizado,\n"
        		+ "	(select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptoautorizado) as idcodpuestoa,\n"
        		+ "	(select ctgp_codigo from ctg_puesto where ctgp_id = (select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as codpuestoa,\n"
        		+ "	(select ctgp_descripcion from ctg_puesto where ctgp_id = (select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descpuestoa,\n"
        		+ "	(select pto_tipo from sn_cfgpuesto where pto_id = plz_ptoautorizado) as tipopuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = (select pto_tipo from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as desctipoptoa,\n"
        		+ "	(select pto_zona from sn_cfgpuesto where pto_id = plz_ptoautorizado) as zonapuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = (select pto_zona from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as desczonaptoa,\n"
        		+ "	(select pto_nivel from sn_cfgpuesto where pto_id = plz_ptoautorizado) as nivelpuestoa,\n"
        		+ "	(select nvl_nivel from ctg_niveles where nvl_id = (select pto_nivel from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descnivptoa,\n"
        		+ "	(select pto_categoria from sn_cfgpuesto where pto_id = plz_ptoautorizado) as categoriapuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = (select pto_categoria from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as desccatptoa,\n"
        		+ "	(select pto_subcategoria from sn_cfgpuesto where pto_id = plz_ptoautorizado) as subcatpuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = (select pto_subcategoria from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descsubcatptoa,\n"
        		+ "	(select pto_clasfinterna from sn_cfgpuesto where pto_id = plz_ptoautorizado) as clasfintpuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = (select pto_clasfinterna from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descclasintptoa,\n"
        		+ "	(select pto_contratacion from sn_cfgpuesto where pto_id = plz_ptoautorizado) as contratacionpuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = (select pto_contratacion from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as desccontraptoa,\n"
        		+ "	(select pto_declaracion from sn_cfgpuesto where pto_id = plz_ptoautorizado) as declaracionpuestoa,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = (select pto_declaracion from sn_cfgpuesto where pto_id = plz_ptoautorizado)) as descdeclaptoa,\n"
        		+ "	plaza.plz_ptopagado,\n"
        		+ "	(select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptopagado) as idcodpuestop,\n"
        		+ "	(select ctgp_codigo from ctg_puesto where ctgp_id = (select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptopagado)) as codpuestop,\n"
        		+ "	(select ctgp_descripcion from ctg_puesto where ctgp_id = (select pto_idcodpuesto from sn_cfgpuesto where pto_id = plz_ptopagado)) as descpuestop,\n"
        		+ "	(select pto_tipo from sn_cfgpuesto where pto_id = plz_ptopagado) as tipopuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = (select pto_tipo from sn_cfgpuesto where pto_id = plz_ptopagado)) as desctipoptop,\n"
        		+ "	(select pto_zona from sn_cfgpuesto where pto_id = plz_ptopagado) as zonapuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = (select pto_zona from sn_cfgpuesto where pto_id = plz_ptopagado)) as desczonaptop,\n"
        		+ "	(select pto_nivel from sn_cfgpuesto where pto_id = plz_ptopagado) as nivelpuestop,\n"
        		+ "	(select nvl_nivel from ctg_niveles where nvl_id = (select pto_nivel from sn_cfgpuesto where pto_id = plz_ptopagado)) as descnivptop,\n"
        		+ "	(select pto_categoria from sn_cfgpuesto where pto_id = plz_ptopagado) as categoriapuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = (select pto_categoria from sn_cfgpuesto where pto_id = plz_ptopagado)) as desccatptop,\n"
        		+ "	(select pto_subcategoria from sn_cfgpuesto where pto_id = plz_ptopagado) as subcatpuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = (select pto_subcategoria from sn_cfgpuesto where pto_id = plz_ptopagado)) as descsubcatptop,\n"
        		+ "	(select pto_clasfinterna from sn_cfgpuesto where pto_id = plz_ptopagado) as clasfintpuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = (select pto_clasfinterna from sn_cfgpuesto where pto_id = plz_ptopagado)) as descclasintptop,\n"
        		+ "	(select pto_contratacion from sn_cfgpuesto where pto_id = plz_ptopagado) as contratacionpuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = (select pto_contratacion from sn_cfgpuesto where pto_id = plz_ptopagado)) as desccontraptop,\n"
        		+ "	(select pto_declaracion from sn_cfgpuesto where pto_id = plz_ptopagado) as declaracionpuestop,\n"
        		+ "	(select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = (select pto_declaracion from sn_cfgpuesto where pto_id = plz_ptopagado)) as descdeclaptop,\n"
        		+ "	persona.per_nombre, persona.per_appaterno, persona.per_apmaterno, persona.per_numempleado, persona.per_curp,\n"
        		+ "	p.pxp_vigdesde, p.pxp_vighasta,\n"
        		+ "	p.pxp_fechainicio, p.pxp_fechatermino,\n"
        		+ "	p.pxp_usucapturo,\n"
        		+ "	(select usu_alias from sg_usuario where usu_id = p.pxp_usucapturo) as usu_capturo,\n"
        		+ "	p.pxp_fechamod,\n"
        		+ "	p.pxp_usumodifico,\n"
        		+ "	(select usu_alias from sg_usuario where usu_id = p.pxp_usumodifico) as usu_modifico,\n"
        		+ "	p.pxp_situacion,\n"
        		+ "	(case when p.pxp_situacion = 1 then 'ACTIVO' else 'BAJA' end)\n"
        		+ "FROM sn_plazapersona p\n"
        		+ "	join sn_plaza plaza on plaza.plz_id = p.pxp_idplaza\n"
        		+ "	join sn_persona persona on persona.per_id = p.pxp_idpersona\n"
        		+ "	join ctg_unidad unidad on unidad.uni_id = plz_unidad\n"
        		+ "	join ctg_centrodist centrodist on centrodist.cdis_id = plz_centrodist\n"
        		+ "	join ctg_centrotrabajo centrotrab on centrotrab.ctra_id = plz_centrotrabajo\n"
        		+ "WHERE p.pxp_idpersona = ?";


        return entityManager.createNativeQuery(query)
        .setParameter(1, pxp_idpersona) // Establecer el parámetro explícitamente
        .getResultList();

         //return entityManager.createNativeQuery(query).getResultList();
    }






}
