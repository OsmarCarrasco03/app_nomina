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
public class datosGralPlazaImp implements datosGralPlazaDAO{

    @PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")
    @Override
    public List<sn_plaza> consultaDatos(@Param("num_plaza")int num_plaza) {
        
        String query = "SELECT\n"
        		+ "	p.plz_numero AS plazaNumero,\n"
        		+ "	p.plz_numplzpadre AS Plaza_padre,\n"
        		+ "	p.plz_codintrhnet AS codintrhnet,\n"
        		+ "	estatus.lplz_id AS id_Estatus_ocupacional,\n"
        		+ "	estatus.lplz_descripcion AS Estatus_ocupacional,\n"
        		+ "	motivos.lplz_id AS id_motivos,\n"
        		+ "	motivos.lplz_descripcion AS motivos,\n"
        		+ "	p.plz_areas AS areas,\n"
        		+ "	p.plz_conpublicas AS contraPublic,\n"
        		+ "	p.plz_traclap AS Clapp,\n"
        		+ "	p.plz_traebi AS EBI,\n"
        		+ "	aedmajr.lplz_id AS id_AEDMAJR,\n"
        		+ "	aedmajr.lplz_descripcion AS AEDMAJR,\n"
        		+ "	nivel.lplz_id AS id_NivelEq,\n"
        		+ "	nivel.lplz_descripcion AS NivelEq,\n"
        		+ "	p.plz_rfiriuf AS Riuf,\n"
        		+ "	p.plz_tiposervpublico AS TipServPubli,\n"
        		+ "	u.uni_id AS id_Unidad,\n"
        		+ "	u.uni_idunidad AS CodigoUnidad,\n"
        		+ "	u.uni_desc AS Unidad,\n"
        		+ "	ct.ctra_id AS id_centroTrab,\n"
        		+ "	ct.ctra_nombre AS centroTrab,\n"
        		+ "	cd.cdis_id AS id_centrodist,\n"
        		+ "	cd.cdis_nombre AS centrodist,\n"
        		+ "	p.plz_ptoautorizado AS id_pAutoriz_sncfgpuesto,\n"
        		+ "	p.plz_ptopagado AS id_pPagado_sncfgpuesto,\n"
        		+ "	p.plz_fechainicio AS fechaIni,\n"
        		+ "	p.plz_fechatermino AS fechaTermino,\n"
        		+ "	p.plz_usucapturo AS id_UsuCapturo,\n"
        		+ "	capturo.usu_alias AS UsuCapturo,\n"
        		+ "	p.plz_fechamod AS FechaMod,\n"
        		+ "	p.plz_usumodifico AS id_Usumodifico,\n"
        		+ "	modifico.usu_alias AS Usumodifico,\n"
        		+ "	p.plz_situacion AS Situacion,\n"
				+ " p.plz_id AS idPlaza\n"
        		+ "FROM \n"
        		+ "	sn_plaza p\n"
        		+ "LEFT JOIN \n"
        		+ "	ctg_lstplaza estatus ON estatus.lplz_id = p.plz_estatusocup\n"
        		+ "LEFT JOIN \n"
        		+ "	ctg_lstplaza motivos ON motivos.lplz_id = p.plz_motoblidecpatri\n"
        		+ "LEFT JOIN \n"
        		+ "	ctg_lstplaza aedmajr ON aedmajr.lplz_id = p.plz_traemdmajr\n"
        		+ "LEFT JOIN \n"
        		+ "	ctg_lstplaza nivel ON nivel.lplz_id = p.plz_nivelequiv\n"
        		+ "LEFT JOIN \n"
        		+ "	ctg_unidad u ON u.uni_id = p.plz_unidad\n"
        		+ "LEFT JOIN \n"
        		+ "	ctg_centrotrabajo ct ON ct.ctra_id = p.plz_centrotrabajo\n"
        		+ "LEFT JOIN \n"
        		+ "	ctg_centrodist cd ON cd.cdis_id = p.plz_centrodist\n"
        		+ "LEFT JOIN \n"
        		+ "	sg_usuario capturo ON capturo.usu_id = p.plz_usucapturo\n"
        		+ "LEFT JOIN \n"
        		+ "	sg_usuario modifico ON modifico.usu_id = p.plz_usumodifico\n"
        		+ "WHERE p.plz_numero = ?";


        return entityManager.createNativeQuery(query)
        .setParameter(1, num_plaza) // Establecer el parámetro explícitamente
        .getResultList();

         //return entityManager.createNativeQuery(query).getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<ctg_lstpuesto> consultaPtoAutoriz(@Param("x")int x) {
        String query ="select \n"
        		+ "                        pto_id, ctgp_codigo, ctgp_descripcion,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = pto_tipo) as tipo_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = pto_zona) as zona_desc,\n"
        		+ "                        nvl_nivel,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = pto_categoria) as categoria_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = pto_subcategoria) as subcat_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = pto_clasfinterna) as clasfint_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = pto_contratacion) as contratacion_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = pto_declaracion) as declaracion_desc\n"
        		+ "                        from sn_cfgpuesto\n"
        		+ "                        join ctg_puesto on ctgp_id = pto_idcodpuesto\n"
        		+ "                        join ctg_niveles on nvl_id = pto_nivel\n"
        		+ "						where pto_id = (SELECT pto_idcodpuesto from sn_cfgpuesto where pto_id = (select plz_ptoautorizado from sn_plaza where plz_numero = ?))";

                        return entityManager.createNativeQuery(query)
                        .setParameter(1, x) // Establecer el parámetro explícitamente
                        .getResultList();
    } 

    @SuppressWarnings("unchecked")
    @Override
    public List<ctg_lstpuesto> consultaPtopagado(@Param("y")int y) {
        String query ="select \n"
        		+ "                        pto_id, ctgp_codigo, ctgp_descripcion,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = pto_tipo) as tipo_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = pto_zona) as zona_desc,\n"
        		+ "                        nvl_nivel,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = pto_categoria) as categoria_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = pto_subcategoria) as subcat_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = pto_clasfinterna) as clasfint_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = pto_contratacion) as contratacion_desc,\n"
        		+ "                        (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = pto_declaracion) as declaracion_desc\n"
        		+ "                        from sn_cfgpuesto\n"
        		+ "                        join ctg_puesto on ctgp_id = pto_idcodpuesto\n"
        		+ "                        join ctg_niveles on nvl_id = pto_nivel\n"
        		+ "                        where pto_id = (SELECT pto_idcodpuesto from sn_cfgpuesto where pto_id = (select plz_ptopagado from sn_plaza where plz_numero = ?));";

                        return entityManager.createNativeQuery(query)
                        .setParameter(1, y) // Establecer el parámetro explícitamente
                        .getResultList();
    }

}
