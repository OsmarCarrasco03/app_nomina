package com.app.nomina.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.app.nomina.controllers.SessionController;
import com.app.nomina.models.buscar_persona;
import com.app.nomina.models.sg_usuario;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao {

	Logger logger = LoggerFactory.getLogger(UsuarioDaoImp.class);
	
	@PersistenceContext
    EntityManager entityManager;
	
	@Autowired
    private AuditoriaDao auditoria;
	
	@Autowired
    private SessionController sesion;
	
	@SuppressWarnings("unchecked")
	public List<Object[]> iniciarSesion(sg_usuario usuario) {
		
		String query = "FROM sg_usuario WHERE usu_usuario = :usu_usuario";
		
		List<sg_usuario> lista = new ArrayList<sg_usuario>();
		
		try {
			logger.info("Verificando credenciales de acceso");
			
			lista = (List<sg_usuario>) entityManager.createQuery(query)
					.setParameter("usu_usuario", usuario.getUsu_usuario()).getResultList();

			Argon2PasswordEncoder arg2SpringSecurity = new Argon2PasswordEncoder(16, 32, 1, 10000, 3);

			for (sg_usuario password : lista) {

				if (arg2SpringSecurity.matches(usuario.getUsu_password(), password.getUsu_password())) {
					
					List<Object[]> listaFiltrada = new ArrayList<>();

					Object[] agregarDatos = new Object[] { lista.get(0).getUsu_id(), 
							lista.get(0).getUsu_alias(), lista.get(0).getUsu_administrador(),
							lista.get(0).getUsu_fechainicio(), lista.get(0).getUsu_fechatermino(),
							lista.get(0).getUsu_situacion(), lista.get(0).getUsu_reset()};

					listaFiltrada.add(agregarDatos);
					
					logger.info("La contraseña coincide");
					return listaFiltrada;

				} else {

					logger.error("La contraseña no coincide.");
					return new ArrayList<>();
				}
			}
		} catch (Exception e) {
			logger.error("Error de la función iniciar sesión. UsuarioDaoImp.iniciarSesion " + e.getMessage(), e);
			
			return new ArrayList<>();
		}
		logger.error("Error de la función iniciar sesión. UsuarioDaoImp.iniciarSesion");
		
		return new ArrayList<>();
	}
	
	@Override
	public boolean actualizarUsuario(sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "";
		String password = "";
		String passOriginal = "";
		
		try {
			// Fecha de término no esta vacía
			if (usuario.getUsu_fechatermino() != null) {
				logger.info(idUsuario + "|La fecha de término no está vacía");

				query = "UPDATE sg_usuario " 
						+ "	SET usu_alias = :usu_alias, usu_usuario = :usu_usuario, "
						+ "	usu_passoriginal = :usu_passoriginal, usu_password = :usu_password, "
						+ " usu_reset = 1, usu_administrador = :usu_administrador, "
						+ "	usu_fechainicio = :usu_fechainicio, usu_fechatermino = :usu_fechatermino, "
						+ " usu_fechamod = current_date, "
						+ "	usu_usumodifico = :usu_usumodifico, usu_situacion = :usu_situacion "
						+ "	WHERE usu_id = :usu_id";

				password = EncriptarPassword(usuario);
				passOriginal = EncriptarPassword(usuario);

				if (password != "error" && passOriginal != "error") {
					int update = entityManager.createNativeQuery(query)
							.setParameter("usu_alias", usuario.getUsu_alias())
							.setParameter("usu_usuario", usuario.getUsu_usuario())
							.setParameter("usu_passoriginal", passOriginal).setParameter("usu_password", password)
							.setParameter("usu_administrador", usuario.getUsu_administrador())
							.setParameter("usu_fechainicio", usuario.getUsu_fechainicio())
							.setParameter("usu_fechatermino", usuario.getUsu_fechatermino())
							.setParameter("usu_usumodifico", usuario.getUsu_usumodifico())
							.setParameter("usu_situacion", usuario.getUsu_situacion())
							.setParameter("usu_id", usuario.getUsu_id()).executeUpdate();

					if (update > 0) {
						logger.info(idUsuario + "|Se actualizó correctamente al usuario");
						
							auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 3, 
									"Se actualizó correctamente al usuario. " +
									"Datos. ID: " + usuario.getUsu_id() + 
									"|Alias: " + usuario.getUsu_alias() +
									"|Usuario: " + usuario.getUsu_usuario() + 
									"|Administrador: " + usuario.getUsu_administrador() +
									"|Fecha inicio: " + usuario.getUsu_fechainicio() +
									"|Fecha termino: " + usuario.getUsu_fechatermino() +
									"|Situacion: " + usuario.getUsu_situacion(),  
									ipUsuario, macUsuario);
						
						return true;
					}
					logger.error(idUsuario + "|Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario");
					
					auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
							"Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario", 
							ipUsuario, macUsuario);
					
					return false;
				}
				logger.error(idUsuario + "|Error al encriptar contraseñas. UsuarioDaoImp.actualizarUsuario");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
						"Error al encriptar contraseñas. UsuarioDaoImp.actualizarUsuario", 
						ipUsuario, macUsuario);
				
				return false;
			}

			// Fecha de término vacía
			logger.info(idUsuario + "|La fecha de término está vacía");

			query = "UPDATE sg_usuario " 
					+ "	SET usu_alias = :usu_alias, usu_usuario = :usu_usuario, "
					+ "	usu_passoriginal = :usu_passoriginal, usu_password = :usu_password, usu_reset = 1, "
					+ " usu_administrador = :usu_administrador, usu_fechainicio = :usu_fechainicio, "
					+ " usu_fechatermino = NULL, " + " usu_fechamod = current_date, "
					+ "	usu_usumodifico = :usu_usumodifico, usu_situacion = :usu_situacion "
					+ "	WHERE usu_id = :usu_id";

			password = EncriptarPassword(usuario);
			passOriginal = EncriptarPassword(usuario);

			if (password != "error" && passOriginal != "error") {
				int update = entityManager.createNativeQuery(query).setParameter("usu_alias", usuario.getUsu_alias())
						.setParameter("usu_usuario", usuario.getUsu_usuario())
						.setParameter("usu_passoriginal", passOriginal).setParameter("usu_password", password)
						.setParameter("usu_administrador", usuario.getUsu_administrador())
						.setParameter("usu_fechainicio", usuario.getUsu_fechainicio())
						.setParameter("usu_usumodifico", usuario.getUsu_usumodifico())
						.setParameter("usu_situacion", usuario.getUsu_situacion())
						.setParameter("usu_id", usuario.getUsu_id()).executeUpdate();

				if (update > 0) {
					logger.info(idUsuario + "|Se actualizó correctamente al usuario");
					
					auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 3, 
							"Se actualizó correctamente al usuario. " +
							"Datos. ID: " + usuario.getUsu_id() + 
							"|Alias: " + usuario.getUsu_alias() +
							"|Usuario: " + usuario.getUsu_usuario() + 
							"|Administrador: " + usuario.getUsu_administrador() +
							"|Fecha inicio: " + usuario.getUsu_fechainicio() +
							"|Fecha termino: N/A" +
							"|Situacion: " + usuario.getUsu_situacion(),  
							ipUsuario, macUsuario);
					
					return true;
				}
				logger.error(idUsuario + "|Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
						"Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario", 
						ipUsuario, macUsuario);
				
				return false;
			}
			logger.error(idUsuario + "|Error al encriptar contraseñas. UsuarioDaoImp.actualizarUsuario");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
					"Error al encriptar contraseñas. UsuarioDaoImp.actualizarUsuario", 
					ipUsuario, macUsuario);
			
			return false;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
					"Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario.", 
					ipUsuario, macUsuario);
			
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> autocompletarUsuarioPersona() {
		
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "select per_id, per_curp, concat(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) "
				+ "from sn_persona "
				+ "where concat(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) like '%' "
				+ "or per_apmaterno like '%' or concat(per_appaterno, ' ', per_appaterno) like '%' "
				+ "or per_nombre like '%' or concat (per_appaterno,' ',per_apmaterno )like '%' "
				+ "or per_curp like '%' " + "or per_numempleado is not null";
		
		try {
			logger.info(idUsuario + "|Autompletar datos completado correctamente");
			return entityManager.createNativeQuery(query).getResultList();
		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en autocompletar persona. UsuarioDaoImp.autocompletarUsuarioPersona. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
					"Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario.", 
					ipUsuario, macUsuario);
			
		    return new ArrayList<>();
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<sg_usuario> autocompletarUsuario() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "SELECT sg_usuario.usu_id, sg_usuario.usu_idpersona, sg_usuario.usu_usuario, "
				+ "sn_persona.per_id, sn_persona.per_nombre, sn_persona.per_appaterno, "
				+ "sn_persona.per_apmaterno "
				+ "FROM sg_usuario "
				+ "LEFT JOIN sn_persona ON sg_usuario.usu_idpersona = sn_persona.per_id "
				+ "order by sg_usuario.usu_id";
		
		try {
			logger.info(idUsuario + "|Autompletar datos completado correctamente.");
			
			return entityManager.createNativeQuery(query).getResultList();
		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error en autocompletar usuario. UsuarioDaoImp.autocompletarUsuario. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
					"Error en autocompletar usuario. UsuarioDaoImp.autocompletarUsuario.", 
					ipUsuario, macUsuario);
			
		    return new ArrayList<>();
		}
	}

	@SuppressWarnings("unchecked")
	@Override 
	public Object[] ObtenerNavbar(sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "WITH RECURSIVE ModuleHierarchy AS (\n"
				+ "  SELECT m.mod_id, m.mod_descripcion, m.mod_idpadre, m.mod_url\n"
				+ "  FROM sg_modulo m\n"
				+ "  INNER JOIN sg_privilegio p ON m.mod_id = p.priv_idmodulo\n"
				+ "  WHERE p.priv_idusuario = :usu_id \n"
				+ "  AND (p.priv_fechatermino <= current_date OR p.priv_fechatermino IS NULL)\n"
				+ "  AND priv_situacion = 1 \n"
				+ "  UNION ALL \n"
				+ "  SELECT m.mod_id, m.mod_descripcion, m.mod_idpadre, m.mod_url\n"
				+ "  FROM sg_modulo m\n"
				+ "  INNER JOIN ModuleHierarchy mh ON m.mod_id = mh.mod_idpadre\n"
				+ ")\n"
				+ "SELECT DISTINCT * FROM ModuleHierarchy order by mod_id;";
		
		try {
			logger.info(idUsuario + "|Autompletar navbar completado correctamente");
			List<Object[]> modulos = entityManager.createNativeQuery(query)
					.setParameter("usu_id", usuario.getUsu_id())
					.getResultList();
			
			Object[] firstElementsArray = extractFirstElements(modulos);
			
			return firstElementsArray;
			
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al obtener navbar. UsuarioDaoImp.ObtenerNavbar. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
					"Error al obtener navbar. UsuarioDaoImp.ObtenerNavbar.", 
					ipUsuario, macUsuario);
			
		    return new Object[0];
		}
	}
	
	//Auxiliar en crear el navbar
	public static Object[] extractFirstElements(List<Object[]> objectArrayList) {
		List<Object> firstElementsList = new ArrayList<>();

		for (Object[] objArray : objectArrayList) {
			if (objArray.length > 0) {
				firstElementsList.add(objArray[0]);
			}
		}

		// Convert the list to an array
		Object[] firstElementsArray = firstElementsList.toArray(new Object[0]);
		return firstElementsArray;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> buscarUsuario(buscar_persona persona) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "SELECT * FROM ( "
				+ "	SELECT per_id, per_curp, CONCAT(per_appaterno, ' ', per_apmaterno, ' ', per_nombre) "
				+ "	AS nombre_completo FROM sn_persona "
				+ " ) subquery "
				+ " WHERE per_curp = :curp AND nombre_completo = :nombre";
		
		try {
			logger.info(idUsuario + "|Realizando búsqueda de usuario");
			
			List<Object[]> idPersona = entityManager.createNativeQuery(query)
					.setParameter("curp", persona.getCurp())
					.setParameter("nombre", persona.getNombre())
					.getResultList();
			
			if(!idPersona.isEmpty()) {
				logger.info(idUsuario + "|Búsqueda de usuario exitosa");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 2, 
						"Búsqueda de usuario exitosa. " +
						"Datos de búsqueda. CURP: " + persona.getCurp() + 
						"|Nombre: " + persona.getNombre(),  
						ipUsuario, macUsuario);
				
				return idPersona;
			}
			
			logger.info(idUsuario + "|Búsqueda de usuario exitosa. Usuario no encontrado.");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 2, 
					"Búsqueda de usuario exitosa. Usuario no encontrado." +
					"Datos de búsqueda. CURP: " + persona.getCurp() + 
					"|Nombre: " + persona.getNombre(),  
					ipUsuario, macUsuario);
			
			return idPersona;
		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al buscar usuario. UsuarioDaoImp.buscarUsuario. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
					"Error al buscar usuario. UsuarioDaoImp.buscarUsuario.", 
					ipUsuario, macUsuario);
			
		    return new ArrayList<>();
		}
	}

	@Override
	public boolean registrarUsuario(sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "";
		String password = "";
		String passOriginal = "";

		try {
			// Fecha de término no esta vacía
			if (usuario.getUsu_fechatermino() != null) {
				logger.info(idUsuario + "|La fecha de término no está vacía");

				query = "INSERT INTO sg_usuario( "
						+ " usu_idpersona, usu_alias, usu_usuario, usu_passoriginal, usu_password, "
						+ " usu_reset, usu_administrador, usu_fechainicio, usu_fechatermino, "
						+ " usu_usucapturo, usu_fechamod, usu_usumodifico, usu_situacion) "
						+ " VALUES (:idpersona, :alias, :usuario, :passoriginal, :password, "
						+ " 1, :administrador, :fechainicio, :fechatermino, :usucapturo, "
						+ " current_date, :usumodifico, 1)";

				password = EncriptarPassword(usuario);
				passOriginal = EncriptarPassword(usuario);

				if (password != "error" && passOriginal != "error") {
					int update = entityManager.createNativeQuery(query)
							.setParameter("idpersona", usuario.getUsu_idpersona())
							.setParameter("alias", usuario.getUsu_alias())
							.setParameter("usuario", usuario.getUsu_usuario())
							.setParameter("passoriginal", passOriginal).setParameter("password", password)
							.setParameter("administrador", usuario.getUsu_administrador())
							.setParameter("fechainicio", usuario.getUsu_fechainicio())
							.setParameter("fechatermino", usuario.getUsu_fechatermino())
							.setParameter("usucapturo", usuario.getUsu_usucapturo())
							.setParameter("usumodifico", usuario.getUsu_usumodifico()).executeUpdate();

					if (update > 0) {
						logger.info(idUsuario + "|El usuario se ha registrado correctamente");
						
						auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 1, 
								"El usuario se ha registrado correctamente." +
								"Datos registrados. IdPersona: " + usuario.getUsu_idpersona() + 
								"|alias: " + usuario.getUsu_alias() + 
								"|usuario: " + usuario.getUsu_usuario() +
								"|administrador: " + usuario.getUsu_administrador() +
								"|fecha inicio: " + usuario.getUsu_fechainicio() +
								"|fecha termino: " + usuario.getUsu_fechatermino(),  
								ipUsuario, macUsuario);
						
						return true;
					}
					logger.error(idUsuario + "|Error al registrar usuario - UsuarioDaoImp.registrarUsuario");
					
					auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 8, 
							"Error al registrar usuario - UsuarioDaoImp.registrarUsuario.", 
							ipUsuario, macUsuario);
					
					return false;
				}
				logger.error(idUsuario + "|Error al encriptar la contraseña - UsuarioDaoImp.registrarUsuario");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 8, 
						"Error al encriptar la contraseña - UsuarioDaoImp.registrarUsuario.", 
						ipUsuario, macUsuario);
				
				return false;
			}

			// Fecha de término vacía
			logger.info(idUsuario + "|La fecha de término está vacía");

			query = "INSERT INTO sg_usuario( "
					+ " usu_idpersona, usu_alias, usu_usuario, usu_passoriginal, usu_password, "
					+ " usu_reset, usu_administrador, usu_fechainicio, "
					+ " usu_usucapturo, usu_fechamod, usu_usumodifico, usu_situacion) "
					+ " VALUES (:idpersona, :alias, :usuario, :passoriginal, :password, "
					+ " 1, :administrador, :fechainicio, :usucapturo, " + " current_date, :usumodifico, 1)";

			password = EncriptarPassword(usuario);
			passOriginal = EncriptarPassword(usuario);

			if (password != "error" && passOriginal != "error") {
				int update = entityManager.createNativeQuery(query)
						.setParameter("idpersona", usuario.getUsu_idpersona())
						.setParameter("alias", usuario.getUsu_alias()).setParameter("usuario", usuario.getUsu_usuario())
						.setParameter("passoriginal", passOriginal).setParameter("password", password)
						.setParameter("administrador", usuario.getUsu_administrador())
						.setParameter("fechainicio", usuario.getUsu_fechainicio())
						.setParameter("usucapturo", usuario.getUsu_usucapturo())
						.setParameter("usumodifico", usuario.getUsu_usumodifico()).executeUpdate();

				if (update > 0) {
					logger.info(idUsuario + "|El usuario se ha registrado correctamente");
					
					auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 1, 
							"El usuario se ha registrado correctamente." +
							"Datos registrados. IdPersona: " + usuario.getUsu_idpersona() + 
							"|alias: " + usuario.getUsu_alias() + 
							"|usuario: " + usuario.getUsu_usuario() +
							"|administrador: " + usuario.getUsu_administrador() +
							"|fecha inicio: " + usuario.getUsu_fechainicio() +
							"|fecha termino: N/A",  
							ipUsuario, macUsuario);
					
					return true;
				}
				logger.error(idUsuario + "|Error al registrar usuario - UsuarioDaoImp.registrarUsuario");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 8, 
						"Error al registrar usuario - UsuarioDaoImp.registrarUsuario.", 
						ipUsuario, macUsuario);
				
				return false;
			}
			logger.error(idUsuario + "|Error al encriptar la contraseña - UsuarioDaoImp.registrarUsuario");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 8, 
					"Error al encriptar la contraseña - UsuarioDaoImp.registrarUsuario.", 
					ipUsuario, macUsuario);
			
			return false;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al registrar usuario. UsuarioDaoImp.registrarUsuario. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 8, 
					"Error al registrar usuario. UsuarioDaoImp.registrarUsuario.", 
					ipUsuario, macUsuario);
			
			return false;
		}
	}
	
	public String EncriptarPassword(sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		try {
			
			Argon2PasswordEncoder arg2SpringSecurity = new Argon2PasswordEncoder(16, 32, 1, 10000, 3);
		    String passwordHash = arg2SpringSecurity.encode(usuario.getUsu_password());
		    
		    if(arg2SpringSecurity.matches(usuario.getUsu_password(), passwordHash)) {
		    	logger.info(idUsuario + "|Contraseña encriptada con éxito");
		    	
		    	auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 6, 
						"Contraseña encriptada con éxito.", 
						ipUsuario, macUsuario);
		    	
		    	return passwordHash;
		    }
		    
		    logger.error(idUsuario + "|Error al encriptar la contraseña - UsuarioDaoImp.EncriptarPassword");
		    
		    auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 8, 
					"Error al encriptar la contraseña - UsuarioDaoImp.EncriptarPassword.", 
					ipUsuario, macUsuario);
		    
		    return "error";
		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al encriptar la contraseña - UsuarioDaoImp.EncriptarPassword. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 8, 
					"Error al encriptar la contraseña - UsuarioDaoImp.EncriptarPassword.", 
					ipUsuario, macUsuario);
		    
		    return "error";
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public String verificarUsuario(sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "FROM sg_usuario WHERE usu_idpersona = :usu_idpersona";
		
		try {
			List<sg_usuario> lista = (List<sg_usuario>) entityManager.createQuery(query)
					.setParameter("usu_idpersona", usuario.getUsu_idpersona())
					.getResultList();
			
			if(!lista.isEmpty()) {
				logger.info(idUsuario + "|El empleado ya esta registrado en el sistema");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 6, 
						"El empleado ya esta registrado en el sistema. " + 
						"Datos. idPersona: " + usuario.getUsu_idpersona(), 
						ipUsuario, macUsuario);
				
				return "registrado";
			}
			
			logger.info(idUsuario + "|El empleado no esta registrado en el sistema");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 6, 
					"El empleado no esta registrado en el sistema. " + 
					"Datos. idPersona: " + usuario.getUsu_idpersona(), 
					ipUsuario, macUsuario);
			
			return "no_registrado";
		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al verificar usuario. UsuarioDaoImp.verificarUsuario. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 4, 8, 
					"Error al verificar usuario. UsuarioDaoImp.verificarUsuario.", 
					ipUsuario, macUsuario);
			
		    return "error";
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<sg_usuario> consultarUsuario(sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "SELECT u1.usu_id, u1.usu_alias, u1.usu_usuario, u1.usu_administrador, \n"
				+ "CASE \n"
				+ "WHEN u1.usu_administrador = 1 THEN 'ADMINISTRADOR' \n"
				+ "WHEN u1.usu_administrador = 2 THEN 'USUARIO' \n"
				+ "END AS desc_administrador,\n"
				+ "u1.usu_fechainicio, u1.usu_fechatermino, \n"
				+ "u1.usu_usucapturo, u2.usu_alias AS alias_usu_capturo, \n"
				+ "u1.usu_fechamod, u1.usu_usumodifico, u3.usu_alias AS alias_usu_modifico, \n"
				+ "u1.usu_situacion, \n"
				+ "CASE \n"
				+ "WHEN u1.usu_situacion = 1 THEN 'ACTIVO' \n"
				+ "WHEN u1.usu_situacion = 0 THEN 'INACTIVO' \n"
				+ "END AS desc_situacion \n"
				+ "FROM sg_usuario u1 \n"
				+ "LEFT JOIN sg_usuario u2 ON u1.usu_usucapturo = u2.usu_id \n"
				+ "LEFT JOIN sg_usuario u3 ON u1.usu_usumodifico = u3.usu_id \n"
				+ "WHERE u1.usu_usuario = :usu_usuario";
		
		try {
			List<sg_usuario> lista = (List<sg_usuario>) entityManager.createNativeQuery(query)
					.setParameter("usu_usuario", usuario.getUsu_usuario())
					.getResultList();
			
			if(!lista.isEmpty()) {
				logger.info(idUsuario + "|Datos del usuario obtenidos correctamente");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 5, 2, 
						"Datos del usuario obtenidos correctamente." + 
						"Datos de búsqueda. Usuario: " + usuario.getUsu_usuario(), 
						ipUsuario, macUsuario);
				
				return lista;
			}
			
			logger.error(idUsuario + "|Error al obtener datos de usuario. UsuarioDaoImp.consultarUsuario");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 5, 8, 
					"Error al obtener datos de usuario. UsuarioDaoImp.consultarUsuario.", 
					ipUsuario, macUsuario);
			
			return lista;
		
		} catch (Exception e) {
			logger.error(idUsuario + "|Error al consultar usuario. UsuarioDaoImp.consultarUsuario. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 5, 8, 
					"Error al consultar usuario. UsuarioDaoImp.consultarUsuario.", 
					ipUsuario, macUsuario);
			
		    return new ArrayList<>();
		}
	}

	@Override
	public boolean CambiarContrasena(sg_usuario usuario) {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "";
		String password = "";
		
		try {
			query = "UPDATE sg_usuario SET " 
					+ "	usu_password = :usu_password, usu_reset = :usu_reset "
					+ "	WHERE usu_id = :usu_id";

			password = EncriptarPassword(usuario);

			if (password != "error") {
				int update = entityManager.createNativeQuery(query)
						.setParameter("usu_password", password)
						.setParameter("usu_reset", 2)
						.setParameter("usu_id", usuario.getUsu_id()).executeUpdate();

				if (update > 0) {
					logger.info(idUsuario + "|Cambio de contraseña exitoso");
					
					auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 3, 
							"El usuario cambió su contraseña.",  
							ipUsuario, macUsuario);
					
					return true;
				}
				
				logger.error(idUsuario + "|Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario");
				
				auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
						"Error en actualizar usuario. UsuarioDaoImp.actualizarUsuario", 
						ipUsuario, macUsuario);
				
				return false;
			}
			
			logger.error(idUsuario + "|Error al encriptar contraseñas. UsuarioDaoImp.CambiarContrasena");
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
					"Error al encriptar contraseñas. UsuarioDaoImp.CambiarContrasena", 
					ipUsuario, macUsuario);
			
			return false;

		} catch (Exception e) {
			logger.error(idUsuario + "|Error al cambiar contraseña. UsuarioDaoImp.CambiarContrasena. " + e.getMessage(), e);
			
			auditoria.InsertAuditoria(Integer.parseInt(idUsuario), 6, 8, 
					"Error al cambiar contraseña. UsuarioDaoImp.CambiarContrasena.", 
					ipUsuario, macUsuario);
			
		    return false;
		}
	}
}