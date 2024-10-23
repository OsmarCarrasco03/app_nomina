package com.app.nomina.dao;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.app.nomina.models.pruebapdf;

@Repository
@Transactional
public class PruebapdfImp implements PruebapdfDao {
	@PersistenceContext
	EntityManager entityManager;

	private static final Logger logger = LoggerFactory.getLogger(PruebapdfImp.class);

	@SuppressWarnings("unused")
	@Override
	public boolean registrarPDF(String nombrePDF, byte[] documento, int situacion) {
		try {

			logger.info("Longitud del archivo en bytes: {}", documento.length);

			String query = "INSERT INTO pruebapdf (pru_nombrepdf, pru_documento, pru_situacion) "
					+ "VALUES (:nombrePDF, :documento, :situacion)";

			int filasAfectadas = entityManager.createNativeQuery(query).setParameter("nombrePDF", nombrePDF)
					.setParameter("documento", documento).setParameter("situacion", situacion).executeUpdate();

			return filasAfectadas > 0;
		} catch (Exception e) {
			logger.error("Error al registrar un PDF: " + e.getMessage(), e);
			return false;
		}
	}

	@SuppressWarnings("rawtypes")
	@Override
	public List<pruebapdf> obtenerDatosXpdf() {
		try {
			String query = "SELECT pru_nombrepdf AS nombre, pru_situacion AS situacion, pru_id AS id\n"
					+ "FROM pruebapdf\n" + "WHERE pru_situacion = 1";

			Query consulta = (Query) entityManager.createQuery(query);

			@SuppressWarnings("unchecked")
			List<Object[]> resultados = consulta.getResultList();

			List<pruebapdf> listaPdfInfo = new ArrayList<>();
			for (Object[] resultado : resultados) {
				String nombrePdf = (String) resultado[0];
				int situacion = (int) resultado[1];
				Long id = (Long) resultado[2];

				pruebapdf pdfInfo = new pruebapdf();
				pdfInfo.setPru_nombrepdf(nombrePdf);
				pdfInfo.setPru_situacion(situacion);
				pdfInfo.setPru_id(id);

				listaPdfInfo.add(pdfInfo);
			}

			return listaPdfInfo;
		} catch (Exception e) {
			logger.error("Error al ejecutar la consulta: " + e.getMessage(), e);
			throw new RuntimeException("Error al ejecutar la consulta", e);
		}
	}

	@Override
	public byte[] obtenerDocumentoXPDFPorId(Long id) {
		String query = "SELECT pru_documento FROM pruebapdf WHERE pru_id = :pru_id";
		logger.info("Ejecutando la consulta: " + query);

		@SuppressWarnings("rawtypes")
		Query nativeQuery = (Query) entityManager.createNativeQuery(query);
		nativeQuery.setParameter("pru_id", id);

		try {
			return (byte[]) nativeQuery.getSingleResult();
		} catch (NoResultException | NonUniqueResultException e) {
			return null;
		}
	}

}
