package com.app.nomina.dao;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.app.nomina.models.ctg_niveles;

@Repository
@Transactional
public class AltaNivelImp implements AltaNivelDao {

	@PersistenceContext
	EntityManager entityManager;
	Logger logger = LoggerFactory.getLogger(AltaNivelImp.class);

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_niveles> obtenerDosDatos() {
		try {
			String query = "select lpto_clave, lpto_descripcion from ctg_lstpuesto where lpto_clase = 2";
			logger.info("query: " + entityManager.createQuery(query).getResultList());
			return entityManager.createQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos por lpto_clase: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	}
	
	@Override
    public boolean registroAlta(ctg_niveles alta) {
		try {
			String query = "INSERT INTO ctg_niveles( nvl_nivel, nvl_zona, nvl_situacion, nvl_fechainicio,nvl_usucapturo, nvl_fechamod, nvl_usumodifico)"
						 + "VALUES (:nvl_nivel, :nvl_zona, :nvl_situacion,  :nvl_fechainicio, :nvl_usucapturo, :nvl_fechamod, :nvl_usumodifico)";
			int filasAfectadas = entityManager.createNativeQuery(query)
					.setParameter("nvl_nivel", alta.getNvl_nivel())	
					.setParameter("nvl_zona", alta.getNvl_zona())
					.setParameter("nvl_situacion", alta.getNvl_situacion())
					.setParameter("nvl_fechainicio", alta.getNvl_fechainicio())
					.setParameter("nvl_usucapturo", alta.getNvl_usucapturo())
					.setParameter("nvl_fechamod", alta.getNvl_fechamod())
					.setParameter("nvl_usumodifico", alta.getNvl_usumodifico())
					.executeUpdate();
	
			return filasAfectadas > 0;
		} catch (Exception e) {
			logger.error("Error al registrar alta : " + e.getMessage(), e);
			return false;
		}
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_niveles> autocompletarNivel(String input) {

// Corregimos la consulta SQL para obtener solo la columna nvl_nivel

        String query = "SELECT n.nvl_id, n.nvl_nivel, n.nvl_zona, n.nvl_situacion, n.nvl_fechainicio, n.nvl_fechamod , n.nvl_usucapturo, n.nvl_usumodifico, n.nvl_fechatermino FROM ctg_niveles n WHERE n.nvl_nivel LIKE CONCAT('%', :input, '%')";
        
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

	@SuppressWarnings("unchecked")
	@Override
	public List<ctg_niveles> usuarioCapturo() {
		// Solo obtenemos las columnas nvl_usucapturo y usu_alias
		try {
			logger.info("Los datos se capturaron correctamente: " );
			String query = "SELECT DISTINCT ON (ctg_niveles.nvl_usucapturo) ctg_niveles.nvl_usucapturo, sg_usuario.usu_alias \n" + //
								"FROM ctg_niveles \n" + //
								"INNER JOIN sg_usuario \n" + //
								"ON ctg_niveles.nvl_usucapturo = sg_usuario.usu_id \n" + //
								"ORDER BY ctg_niveles.nvl_usucapturo";
			return entityManager.createNativeQuery(query).getResultList();
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta de datos de usuario capturo: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}

	
	}

	@Override
    public boolean actualizarNivel(ctg_niveles alta) {
		try {
			
					if(alta.getNvl_situacion() == 2){
						String query = "UPDATE ctg_niveles "
								+ " SET nvl_nivel =:nvl_nivel, nvl_zona =:nvl_zona, "
								+ " nvl_situacion =:nvl_situacion,  "
								+ " nvl_fechatermino =:nvl_fechatermino,"
								+ " nvl_fechamod =:nvl_fechamod,"
								+ " nvl_usumodifico =:nvl_usumodifico"
								+ " WHERE nvl_id =:nvl_id";
   
			   			int filasAfectadas = entityManager.createNativeQuery(query)
   
					   .setParameter("nvl_id", alta.getNvl_id())
					   .setParameter("nvl_nivel", alta.getNvl_nivel())	
					   .setParameter("nvl_zona", alta.getNvl_zona())
					   .setParameter("nvl_situacion", alta.getNvl_situacion())
   					   .setParameter("nvl_fechatermino", alta.getNvl_fechatermino())
					   .setParameter("nvl_fechamod", alta.getNvl_fechamod())
					   .setParameter("nvl_usumodifico", alta.getNvl_usumodifico())
					   .executeUpdate();

					   return filasAfectadas > 0;


					}else{


						String query = "UPDATE ctg_niveles "
						+ " SET nvl_nivel =:nvl_nivel, nvl_zona =:nvl_zona, "
						+ " nvl_situacion =:nvl_situacion,  "
						+ " nvl_fechatermino = NULL,"
						+ " nvl_fechainicio =:nvl_fechainicio,"
						+ " nvl_fechamod =:nvl_fechamod,"
						+ " nvl_usumodifico =:nvl_usumodifico"
						+ " WHERE nvl_id =:nvl_id";

						int filasAfectadas = entityManager.createNativeQuery(query)

						.setParameter("nvl_id", alta.getNvl_id())
						.setParameter("nvl_nivel", alta.getNvl_nivel())	
						.setParameter("nvl_zona", alta.getNvl_zona())
						.setParameter("nvl_situacion", alta.getNvl_situacion())
						.setParameter("nvl_fechainicio", alta.getNvl_fechainicio())
						.setParameter("nvl_fechamod", alta.getNvl_fechamod())
						.setParameter("nvl_usumodifico", alta.getNvl_usumodifico())
						.executeUpdate();

						return filasAfectadas > 0;
					}

			}		
			// return filasAfectadas > 0;
		 catch (Exception e) {
			logger.error("Error al registrar alta : " + e.getMessage(), e);
			return false;
		}
	}
	
}