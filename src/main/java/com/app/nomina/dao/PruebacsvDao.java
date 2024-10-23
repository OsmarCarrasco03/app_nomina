package com.app.nomina.dao;

import org.springframework.web.multipart.MultipartFile;

public interface PruebacsvDao {
	boolean registrarPersonaconCSV(MultipartFile archivoCSV);// MultipartFile es una interfaz en Spring Framework
																// utilizada para manejar archivos subidos desde
																// formularios HTML

}
