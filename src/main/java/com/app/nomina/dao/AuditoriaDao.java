package com.app.nomina.dao;

public interface AuditoriaDao {

	int InsertAuditoria(int idUsuario, int idModulo, int idOperacion, String detalle, String ip, String mac);

}
