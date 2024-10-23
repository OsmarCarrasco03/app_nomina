package com.app.nomina.dao;
import java.util.List;
import com.app.nomina.models.ctg_niveles;




public interface AltaNivelDao {
	
	List<ctg_niveles> obtenerDosDatos();
	
	boolean registroAlta(ctg_niveles alta);

	List<ctg_niveles> autocompletarNivel(String input);

	List<ctg_niveles> usuarioCapturo();

	boolean actualizarNivel(ctg_niveles alta);

}
