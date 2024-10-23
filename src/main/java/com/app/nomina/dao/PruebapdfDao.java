package com.app.nomina.dao;

import java.util.List;

import com.app.nomina.models.pruebapdf;

public interface PruebapdfDao {

	boolean registrarPDF(String nombrePDF, byte[] documento, int situacion);

	List<pruebapdf> obtenerDatosXpdf();

//   byte[] hexStringToByteArray(String s);
//    List<byte[]> obtenerDocumentosPorSituacionYNombre();
//	byte[] construirDocumentoPDF(List<byte[]> documentosBinarios);
//	List<byte[]> obtenerDocumentosXPDF();
	byte[] obtenerDocumentoXPDFPorId(Long pruId);

}
