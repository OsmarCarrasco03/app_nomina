
package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.ctg_centrodist;
import com.app.nomina.models.ctg_centrotrabajo;



public interface ModalDao {

    List<ctg_centrotrabajo> obtenerDatosXcentrotrabajo();
    List<ctg_centrotrabajo> obtenerDatosXdistribucion();
	List<ctg_centrotrabajo> obtenerDatosXctratrabajo(ctg_centrotrabajo ctra_estado);
     List<ctg_centrodist> obtenerDatosXcentrodist(ctg_centrodist cdis_estado);
}