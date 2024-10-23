package com.app.nomina.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.app.nomina.controllers.SessionController;
import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.ctg_nominas;
import com.app.nomina.models.sn_nominasoperando;
import com.app.nomina.models.sn_periodosdepago;

@Repository
@Transactional
public class RegistrarNominaDaoImp implements RegistrarNominaDao {

    @Autowired
    private SessionController sesion;
  
    @PersistenceContext

    EntityManager entityManager;

    Logger logger = LoggerFactory.getLogger(RegistrarNominaDaoImp.class);

    @SuppressWarnings("unchecked")
    @Override
    public List<ctg_nominas> autocompletarNomina() {

        // Corregimos la consulta SQL para obtener solo la columna nom_nombre de
        // ctg_nominas, por medio de la consulta nom_ejercicio
        try {
            String query = "SELECT * \n" +
                    "FROM ctg_nominas \n" +
                    "WHERE nom_ejercicio = 2024 \n" +
                    "AND nom_situacion = 1  \n" +
                    "AND nom_clave NOT IN ( \n" +
                    "SELECT nop_numnomina \n" +
                    "FROM sn_nominasoperando\n" +
                    "WHERE nop_ejercicio = 2024 \n" +
                    "AND nop_periodo IN (SELECT DISTINCT nop_periodo FROM sn_nominasoperando WHERE nop_ejercicio = 2024))";
            logger.info("query: " + entityManager.createNativeQuery(query).getResultList());
            return entityManager.createNativeQuery(query).getResultList();

        } catch (Exception e) {
            // Manejar cualquier excepción que pueda ocurrir
            logger.error("Error al ejecutar la consulta de datos por lpto_clase: " + e.getMessage(), e);
            throw new RuntimeException("Error al ejecutar la consulta", e);

        }
    }

    @Override
    public boolean registroNomina(sn_nominasoperando registrar) {
        try {
            String query = "INSERT INTO sn_nominasoperando( nop_ejercicio, nop_periodo, nop_numnomina, nop_etapa, nop_secuenciarad, nop_situacion, nop_fechainicio, nop_usucapturo, nop_fechamod, nop_usumodifico )"
                    + "VALUES ( :nop_ejercicio, :nop_periodo, :nop_numnomina, :nop_etapa, :nop_secuenciarad, :nop_situacion, :nop_fechainicio, :nop_usucapturo, :nop_fechamod, :nop_usumodifico)";
            int filasAfectadas = entityManager.createNativeQuery(query)
                    .setParameter("nop_ejercicio", registrar.getNop_ejercicio())
                    .setParameter("nop_periodo", registrar.getNop_periodo())
                    .setParameter("nop_numnomina", registrar.getNop_numnomina())
                    .setParameter("nop_etapa", registrar.getNop_etapa())
                    .setParameter("nop_secuenciarad", registrar.getNop_secuenciarad())
                    .setParameter("nop_situacion", registrar.getNop_situacion())
                    .setParameter("nop_fechainicio", registrar.getNop_fechainicio())
                    .setParameter("nop_usucapturo", registrar.getNop_usucapturo())
                    .setParameter("nop_fechamod", registrar.getNop_fechamod())
                    .setParameter("nop_usumodifico", registrar.getNop_usumodifico())
                    .executeUpdate();

            return filasAfectadas > 0;
        } catch (Exception e) {
            logger.error("Error al registrar nomina : " + e.getMessage(), e);
            return false;
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<ctg_nominas> buscarNominasOperando() {

        // Corregimos la consulta SQL para obtener solo la columna nom_nombre de
        // ctg_nominas, por medio de la consulta nom_ejercicio
        try {
            String query = "SELECT nop_id, nop_ejercicio, nop_numnomina, nom_nombre, nop_situacion, nop_periodo, nop_fechainicio, nop_fechatermino \n"
                    +
                    "FROM sn_nominasoperando \n" +
                    "INNER JOIN ctg_nominas ON sn_nominasoperando.nop_numnomina = ctg_nominas.nom_clave ORDER BY nop_numnomina ASC";
            logger.info("query: " + entityManager.createNativeQuery(query).getResultList());
            return entityManager.createNativeQuery(query).getResultList();

        } catch (Exception e) {
            // Manejar cualquier excepción que pueda ocurrir
            logger.error("Error al ejecutar la consulta de datos por lpto_clase: " + e.getMessage(), e);
            throw new RuntimeException("Error al ejecutar la consulta", e);

        }
    }

    @Override
    public boolean bajaNomina(sn_nominasoperando baja) {
        try {
            String query = " UPDATE sn_nominasoperando"
                    + " SET nop_situacion=:nop_situacion, "
                    + " nop_fechatermino=:nop_fechatermino, "
                    + " nop_fechamod=:nop_fechamod, "
                    + " nop_usumodifico=:nop_usumodifico "
                    + " WHERE nop_numnomina =:nop_numnomina";

            int filasAfectadas = entityManager.createNativeQuery(query)
                    .setParameter("nop_numnomina", baja.getNop_numnomina())
                    .setParameter("nop_situacion", baja.getNop_situacion())
                    .setParameter("nop_fechatermino", baja.getNop_fechatermino())
                    .setParameter("nop_fechamod", baja.getNop_fechamod())
                    .setParameter("nop_usumodifico", baja.getNop_usumodifico())
                    .executeUpdate();

            return filasAfectadas > 0;
        } catch (Exception e) {
            logger.error("Error al registrar nomina : " + e.getMessage(), e);
            return false;
        }
    }
 
    @SuppressWarnings("unchecked")
	@Override
	public List<sn_periodosdepago> Periodos() {
		HashMap<String, String> sesionUsuario = new HashMap<String, String>();
		
		sesionUsuario = sesion.sesionUsuario();
		
		String idUsuario = sesionUsuario.get("idUsuario");
		String ipUsuario = sesionUsuario.get("ipUsuario");
		String macUsuario = sesionUsuario.get("macUsuario");
		
		String query = "FROM sn_periodosdepago WHERE pp_operando = 1 OR pp_operando = 2 ORDER BY pp_quincena";
		
		try {
			
			logger.info(idUsuario + "|Realizando consulta del periodo actual.");
			
			//BigDecimal pp_operando = new BigDecimal("1");
			
			List<sn_periodosdepago> lista = (List<sn_periodosdepago>) entityManager.createQuery(query)
					//.setParameter("pp_operando", pp_operando)
					.getResultList();
			
			return lista;
			 
		} catch (Exception e) {
			logger.error("Error al consultar el periodo actual. FuncionesGeneralesDaoImp.PeriodoActual " 
					+ e.getMessage(), e);
			
			return new ArrayList<>();
		}
	}

    @SuppressWarnings("unchecked")
	@Override
	public List<sn_nominasoperando> tablaPorPeriodo(Integer input) {

// Corregimos la consulta SQL para obtener solo la columna nvl_nivel

        String query = "SELECT nop_id, nop_ejercicio, nop_numnomina, nom_nombre, nop_situacion, nop_periodo, nop_fechainicio, nop_fechatermino \n" + //
                            "FROM sn_nominasoperando\n" + 
                            "INNER JOIN ctg_nominas ON sn_nominasoperando.nop_numnomina = ctg_nominas.nom_clave \n" + 
                            "where sn_nominasoperando.nop_periodo = :input \n" +
                            "ORDER BY nop_numnomina ASC";
        
        try {
    // Utilizamos createQuery y especificamos el tipo de resultado como String
            return entityManager.createNativeQuery(query)
                    .setParameter("input", input) // Establecer el parámetro correctamente
                    .getResultList();
        } catch (Exception ex) {
    // Manejar cualquier excepción que pueda ocurrir
            ex.printStackTrace();
            return null;
        }
    }

}
