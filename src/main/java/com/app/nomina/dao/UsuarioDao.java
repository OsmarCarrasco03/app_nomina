package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.buscar_persona;
import com.app.nomina.models.sg_usuario;

public interface UsuarioDao {

	List<Object[]> iniciarSesion(sg_usuario usuario);

	boolean actualizarUsuario(sg_usuario usuario);

	List<Object[]> autocompletarUsuarioPersona();

	Object[] ObtenerNavbar(sg_usuario usuario);

	List<Object[]> buscarUsuario(buscar_persona persona);

	boolean registrarUsuario(sg_usuario usuario);

	String verificarUsuario(sg_usuario usuario);

	List<sg_usuario> autocompletarUsuario();

	List<sg_usuario> consultarUsuario(sg_usuario usuario);
	
	boolean CambiarContrasena(sg_usuario usuario);
}
