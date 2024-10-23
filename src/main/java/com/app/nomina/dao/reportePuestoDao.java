				package com.app.nomina.dao;
				import java.util.List;
				import com.app.nomina.models.ctg_lstpuesto;
import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.sn_cfgpuesto;



				 public interface reportePuestoDao{
				 //	List<ctg_lstpuesto2> obtenerDatosXeleccion(ctg_lstpuesto2 eleccion);
				 List<ctg_lstpuesto> obtenerDatosXbase();
				 List<ctg_lstpuesto> obtenerDatosXindice();
				 List<ctg_niveles> obtenerDatosXnivel();
				 List<ctg_lstpuesto> obtenerDatosXcategoria();
				 List<ctg_lstpuesto> obtenerDatosXsubcategoria();
				 List<ctg_lstpuesto> obtenerDatosXinterna();
				 List<ctg_lstpuesto> obtenerDatosXcontratacion();
				 List<ctg_lstpuesto> obtenerDatosXdeclaracion();
				 List<sn_cfgpuesto> obtenerDatosXeleccion(sn_cfgpuesto eleccion);
			   }