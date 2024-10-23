package com.app.nomina.dao;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Arrays;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import com.app.nomina.controllers.PruebacsvController;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import org.springframework.web.multipart.MultipartFile;

@Repository
@Transactional
public class PruebacsvImp implements PruebacsvDao {
	@PersistenceContext
	EntityManager entityManager;
	Logger logger = LoggerFactory.getLogger(PruebacsvController.class);

	@Override
	public boolean registrarPersonaconCSV(MultipartFile archivoCSV) {
		try {
			// AQUI ABRE EL LECTOR CON SU DEPENDENCIA Y SU LIBRERIA.
			Reader lector = new InputStreamReader(archivoCSV.getInputStream());
			CSVReader csvReader = new CSVReader(lector);

			String[] fila;
			csvReader.readNext();// OMITE LA PRIMERA FILA QUE ES EN RELACION A LOS ENCABEZADOS DE TUS DATOS.

			// EMPIEZA A LEER CADA FILA DEL CSV PARA QUE INSERTE EN LA BD.
			while ((fila = csvReader.readNext()) != null) {
				String query = "INSERT INTO pruebacsv (prucsv_nombre, prucsv_appaterno, prucsv_apmaterno, prucsv_numero, prucsv_situacion) "
						+ "VALUES (?, ?, ?, ?, ?)";

				// ESTABLECEMOS PARAMETROS DEPENDIENTO EL TIPO DE DATO QUE VA A INGRESAR A LA
				// FILA.
				Query sqlQuery = entityManager.createNativeQuery(query);
				sqlQuery.setParameter(1, fila[0]);
				sqlQuery.setParameter(2, fila[1]);
				sqlQuery.setParameter(3, fila[2]);
				sqlQuery.setParameter(4, Long.parseLong(fila[3]));
				sqlQuery.setParameter(5, Integer.parseInt(fila[4]));

				sqlQuery.executeUpdate();
				logger.info("Registro ingresado a la base de datos: " + Arrays.toString(fila));
			}

			csvReader.close();// TERMINA EL LECTOR DE ARCHIVOS CSV.
			return true;
		} catch (IOException | NumberFormatException e) {
			logger.error("Error al registrar personas desde CSV: " + e.getMessage(), e);
			return false;
		} catch (CsvValidationException e) {
			logger.error("Error de validación CSV: " + e.getMessage(), e);
			return false;
		}
	}

}
