package com.app.nomina.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.nomina.dao.PruebacsvDao;

@RestController

public class PruebacsvController {
	@Autowired
	private PruebacsvDao pruebacsvDao;

	@PostMapping("/uploadCSV")
	public ResponseEntity<String> uploadCSV(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			// VERIFICA SI EL ARCHIVO NO ESTA VACIO SI NO ES ASI RETORNA A DICHO MENSAJE.
			return new ResponseEntity<>("Por favor, seleccione un archivo CSV.", HttpStatus.BAD_REQUEST);
		}

		try {
			// LLAMA A NUESTRO METODO CREADO EN PRUEBACSVIMP.
			boolean result = pruebacsvDao.registrarPersonaconCSV(file);

			if (result) {
				return new ResponseEntity<>("Archivo CSV procesado con éxito.", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Error al procesar el archivo CSV.", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Error al procesar el archivo CSV: " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
