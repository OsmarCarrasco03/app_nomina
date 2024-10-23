package com.app.nomina.controllers;

import java.io.IOException;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.app.nomina.dao.PruebapdfDao;

import com.app.nomina.models.pruebapdf;

@RestController
public class PruebapdfController {
	@Autowired
	private PruebapdfDao pruebapdfDao;

	@PostMapping("/api/rfc/registro")
	public ResponseEntity<String> registrarPDF(@RequestParam("nombrePDF") String nombrePDF,
			@RequestParam("documento") MultipartFile documento, @RequestParam("situacion") int situacion) {
		try {
			byte[] documentoBytes = documento.getBytes();
			boolean registrado = pruebapdfDao.registrarPDF(nombrePDF, documentoBytes, situacion);

			if (registrado) {
				return ResponseEntity.ok("PDF registrado exitosamente");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el PDF");
			}
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al obtener los datos del documento");
		}
	}

	@GetMapping("api/pdf")
	public List<pruebapdf> obtenerDatosXpdf() {
		return pruebapdfDao.obtenerDatosXpdf();
	}

	@GetMapping("pdf/{pru_id}")
	public ResponseEntity<byte[]> obtenerDocumentoPorId(@PathVariable("pru_id") Long pruId) {
		try {
			byte[] datosPdf = pruebapdfDao.obtenerDocumentoXPDFPorId(pruId);

			if (datosPdf == null) {
				return ResponseEntity.notFound().build();
			}

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_PDF);
			headers.setContentDispositionFormData("attachment", "documento.pdf");

			return new ResponseEntity<>(datosPdf, headers, HttpStatus.OK);
		} catch (Exception ex) {
			return ResponseEntity.notFound().build();
		}
	}

}
