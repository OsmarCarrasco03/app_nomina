package com.app.nomina.dao;

import java.util.List;


import com.app.nomina.models.ctg_escolaridad;
import com.app.nomina.models.ctg_estado;
import com.app.nomina.models.ctg_idioma;
import com.app.nomina.models.ctg_lstpersona;
import com.app.nomina.models.ctg_municipio;
import com.app.nomina.models.sg_usuario;
import com.app.nomina.models.sn_persona;

public interface PersonaDao {
	List<Object[]> obtenerDatosXTabla();
	List<sn_persona> obtenerDatosXGerencia(sn_persona curp);
	boolean registrarPersona(sn_persona persona);
	List<ctg_lstpersona> obtenerDatosXgenero();
	List<ctg_lstpersona> obtenerDatosXedocivil();
	List<ctg_estado> obtenerDatosXestado();
    List<ctg_municipio> obtenerDatosXmunicipio();
    List<ctg_lstpersona> obtenerDatosXnacionalidad();
    List<ctg_lstpersona> obtenerDatosXsituacion();
    List<ctg_lstpersona> obtenerDatosXcontratacion();
    List<ctg_lstpersona> obtenerDatosXissste();
    List<sg_usuario> obtenerDatosXusuario();
    List<ctg_idioma> obtenerDatosXidioma();
	List<ctg_escolaridad> obtenerDatosXescolaridad();
    List<sn_persona> obtenerDatosXeleccion(sn_persona eleccion);
    boolean actualizarDatos(sn_persona persona);
    boolean curpExiste(String persona);
    boolean EmpleadoExiste(Integer empleado);
    boolean rfcHomoclaveExiste(String rfcHomoclave);
	List<ctg_lstpersona> obtenerDatosXdiscapacidad();

	
	
}