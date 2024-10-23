package com.app.nomina.services;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.app.nomina.models.*;

@Repository
public interface ctgHistoricoPlazaRepository extends JpaRepository<sn_plaza, Integer>{
    
    //Inicio query para obtener datos importantes de plaza

    @Query(value="select plz_id, plz_numero, plz_numplzpadre, \n"
    + "plz_unidad, unidad.uni_idunidad, unidad.uni_desc, \n"
    + "plz_centrodist, cendist.cdis_clave, cendist.cdis_nombre, \n"
    + "plz_centrotrabajo, centra.ctra_clave, centra.ctra_nombre, \n"
    + "plz_ptopagado \n"
    + "from sn_plaza \n"
    + "join ctg_unidad as unidad on unidad.uni_id = plz_unidad \n"
    + "join ctg_centrodist as cendist on cendist.cdis_id = plz_centrodist \n"
    + "join ctg_centrotrabajo as centra on centra.ctra_id = plz_centrotrabajo \n"
    + "where plz_numero = :plz_numero", nativeQuery = true)
    List<Object[]>   findbydatosplaza(@Param("plz_numero") Integer plz_numero);

    //Fin query para obtener datos importantes de plaza

    //Inicio query Obtener datos de puesto recibiendo como parametro un id del puesto

    @Query(value="select pto_id, pto_idcodpuesto, puesto.ctgp_codigo, puesto.ctgp_descripcion, \n"
    + "pto_tipo, (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 1 and lpto_clave = pto_tipo) as tipo_desc, \n"
    + "pto_zona, (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 2 and lpto_clave = pto_zona) as zona_desc,\n"
    + "pto_nivel, nivel.nvl_nivel, \n"
    + "pto_contratacion, (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 6 and lpto_clave = pto_contratacion) as contratacion_desc,\n"
    + "pto_categoria, (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 3 and lpto_clave = pto_categoria) as categoria_desc, \n"
    + "pto_subcategoria, (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 4 and lpto_clave = pto_subcategoria) as subcategoria_desc, \n"
    + "pto_clasfinterna, (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 5 and lpto_clave = pto_clasfinterna) as clasfinterna_desc, \n"
    + "pto_declaracion, (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 7 and lpto_clave = pto_declaracion) as declaracion_desc, \n"
    + "pto_situacion, (select lpto_descripcion from ctg_lstpuesto where lpto_clase = 8 and lpto_clave = pto_situacion) as situacion_desc \n"
    + "from sn_cfgpuesto \n"
    + "join ctg_puesto as puesto on puesto.ctgp_id = pto_idcodpuesto \n"
    + "join ctg_niveles as nivel on nivel.nvl_id = pto_nivel \n"
    + "where pto_id = :pto_id", nativeQuery = true) 
    List<Object[]>   findbydatospuesto(@Param("pto_id") Integer pto_id);

    //Fin query Obtener datos de puesto recibiendo como parametro un id del puesto

    //HISTORICA
    //Inicio query Obtener las personas que han tenido esa plaza en plazapersonaha

    @Query(value="select pxp_id, pxp_idplaza, \n"
    + "pxp_idpersona, \n"
    + "persona.per_curp, persona.per_nombre, persona.per_appaterno, persona.per_apmaterno, persona.per_numempleado, \n"
    + "pxp_vigdesde, pxp_vighasta \n"
    + "from sn_plazapersonaha \n"
    + "join sn_persona persona on persona.per_id = pxp_idpersona \n"
    + "where pxp_idplaza = :pxp_idplaza \n"
    + "order by pxp_vigdesde DESC", nativeQuery = true)
    List<Object[]>   findbydatospersonasporplazaha(@Param("pxp_idplaza") Integer pxp_idplaza);

    //Fin query Obtener las personas que han tenido esa plaza

    //ACTUAL
    //Inicio query Obtener la persona que tiene esta plaza actualmente en plazapersona

    @Query(value="select pxp_id, pxp_idplaza, \n"
    + "pxp_idpersona, \n"
    + "persona.per_curp, persona.per_nombre, persona.per_appaterno, persona.per_apmaterno, persona.per_numempleado, \n"
    + "pxp_vigdesde, pxp_vighasta \n"
    + "from sn_plazapersona \n"
    + "join sn_persona persona on persona.per_id = pxp_idpersona \n"
    + "where pxp_idplaza = :pxp_idplaza \n"
    + "order by pxp_vigdesde DESC", nativeQuery = true)
    List<Object[]>   findbydatospersonasporplaza(@Param("pxp_idplaza") Integer pxp_idplaza);

    //Fin query Obtener la persona que tiene esta plaza actualmente en plazapersona


    //HISTORICA
    //Inicio query para buscar las plazas que ha tenido una persona

    @Query(value="select pxp_id, pxp_idplaza, pxp_idpersona, pxp_vigdesde, pxp_vighasta, \n"
    + "plaza.plz_numero, plaza.plz_numplzpadre, \n"
    + "plaza.plz_unidad, unidad.uni_idunidad, unidad.uni_desc,\n"
    + "plaza.plz_centrodist, cendist.cdis_clave, cendist.cdis_nombre,\n"
    + "plaza.plz_centrotrabajo, centra.ctra_clave, centra.ctra_nombre,\n"
    + "plaza.plz_ptopagado \n"
    + "from sn_plazapersonaha \n"
    + "join sn_plaza as plaza on plaza.plz_id = pxp_idplaza \n"
    + "join ctg_unidad as unidad on unidad.uni_id = plaza.plz_unidad \n"
    + "join ctg_centrodist as cendist on cendist.cdis_id = plaza.plz_centrodist \n"
    + "join ctg_centrotrabajo as centra on centra.ctra_id = plaza.plz_centrotrabajo \n"
    + "where pxp_idpersona = :pxp_idpersona", nativeQuery = true) 
    List<Object[]>   findbydatosplazasporpersonaha(@Param("pxp_idpersona") Integer pxp_idpersona);

    //Fin query para buscar las plazas que ha tenido una persona

    //ACTUAL
    //Inicio query para buscar la plaza actual de una persona

    @Query(value="select pxp_id, pxp_idplaza, pxp_idpersona, pxp_vigdesde, pxp_vighasta, \n"
    + "plaza.plz_numero, plaza.plz_numplzpadre, \n"
    + "plaza.plz_unidad, unidad.uni_idunidad, unidad.uni_desc,\n"
    + "plaza.plz_centrodist, cendist.cdis_clave, cendist.cdis_nombre,\n"
    + "plaza.plz_centrotrabajo, centra.ctra_clave, centra.ctra_nombre,\n"
    + "plaza.plz_ptopagado \n"
    + "from sn_plazapersona \n"
    + "join sn_plaza as plaza on plaza.plz_id = pxp_idplaza \n"
    + "join ctg_unidad as unidad on unidad.uni_id = plaza.plz_unidad \n"
    + "join ctg_centrodist as cendist on cendist.cdis_id = plaza.plz_centrodist \n"
    + "join ctg_centrotrabajo as centra on centra.ctra_id = plaza.plz_centrotrabajo \n"
    + "where pxp_idpersona = :pxp_idpersona", nativeQuery = true) 
    List<Object[]>   findbydatosplazasporpersona(@Param("pxp_idpersona") Integer pxp_idpersona);

    //Fin query para buscar la plaza actual de una persona


    //Inicio query para obtener todos los datos del empleado
    @Query(value="select * from sn_persona \n"
    + "where per_id = :per_id", nativeQuery = true) 
    List<Object[]>   datosempleados(@Param("per_id") Integer per_id);
    //Fin query para obtener todos los datos del empleado

}


