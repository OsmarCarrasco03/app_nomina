package com.app.nomina.controllers;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.app.nomina.dao.ConsultaPuestoDAO;
import com.app.nomina.dao.LstPuestoDAO;
import com.app.nomina.dao.PuestosDao;
import com.app.nomina.dao.UsuarioDao;

import com.app.nomina.dao.lstPuestoDosDAO;
import com.app.nomina.dao.lst_agrupamientoDAO;
import com.app.nomina.dao.lst_ctg_unidadDAO;
import com.app.nomina.dao.lst_ctglstplazaDAO;
import com.app.nomina.dao.lst_grupfunyxrespDAO;
import com.app.nomina.dao.lst_nivelesDAO;
import com.app.nomina.models.ctg_lstpuesto;
import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.ctg_agrupamiento;
import com.app.nomina.models.ctg_grupfunyxresp;
import com.app.nomina.models.ctg_lstplaza;
import com.app.nomina.models.sg_usuario;
import com.app.nomina.models.sn_cfgpuesto;

import com.app.nomina.models.ctg_puesto;
import com.app.nomina.models.ctg_unidad;

@RestController
public class LoginController {

	@Autowired
    private UsuarioDao usuarioDao;
    
    @Autowired
    private PuestosDao puestosDao;

    @Autowired
    private lst_grupfunyxrespDAO grupfunyxresp;
    
    @Autowired
    private lst_agrupamientoDAO agrupamiento;

    @Autowired
    private LstPuestoDAO pDetalle; 
      
    @Autowired
    private lstPuestoDosDAO pDetalle1;
    
    @Autowired
    private lst_nivelesDAO nDetalle;
  
    @Autowired
    private ConsultaPuestoDAO puestoDetaalle; 
    
    @Autowired
    private lst_ctglstplazaDAO detalleplaza; 
    
    @Autowired
    private lst_ctg_unidadDAO detalleUnidad; 

	@Autowired
	private ConsultaPuestoDAO detallePuestos;

	
   
    Logger logger = LoggerFactory.getLogger(LoginController.class);


	@GetMapping("api/puestos/detallespuestos/")
    public List<ctg_lstpuesto> listarPuestos(){ 
		return detallePuestos.obtenerDatosctg_lstpuesto();	
	}
    
    @PostMapping("api/login")
	public List<Object[]> login(@RequestBody sg_usuario usuario) {
		logger.info("Request a la API login");
		
		return usuarioDao.iniciarSesion(usuario);	
	}
	
	@PostMapping("api/login/cambiarContrasena")
	public boolean CambiarContrasena(@RequestBody sg_usuario usuario) {
		logger.info("Request a la API login");
		
		return usuarioDao.CambiarContrasena(usuario);	
	}
    
    @GetMapping("api/unidad/detallesUnidad/")
    public List<ctg_unidad> listarUnidades(){ 
		return detalleUnidad.obtenerDatosUnidad();	
	}
    
    
    @GetMapping("api/plaza/detallesPlaza/")
    public List<ctg_lstplaza> listarPlaza(){
		return detalleplaza.listarPlaza();	
	}
    
    
    @GetMapping("api/puestos/puestosX_detallesX/")
    public List<sn_cfgpuesto> obtenerDatosPuesto(){
		return puestoDetaalle.obtenerDatosPuesto();	
	}
    
    @GetMapping("api/puestos/puestosX_detallesX2/")
    public List<ctg_puesto> obtenerDatosCtgPuesto(){
		return puestoDetaalle.obtenerDatosCtgPuesto();
	}
	
	@GetMapping("api/puestos/consulta/")
	public List<ctg_puesto> consultaPuestos() {
		return puestosDao.listarPuestos();
	}
	
	@PostMapping("api/puestos/consulta/datosXcodigo")
	public List<ctg_puesto> consultaDatosXCodigo(@RequestBody ctg_puesto codigo) {
		return puestosDao.obtenerDatosXCodigo(codigo);
	}
	
	@GetMapping("api/lstpuesto/consulta/puesto_detalle")
	public List<ctg_lstpuesto> puesto_detalle() {
		

		return pDetalle.obtenerDatos();
	}

	@GetMapping("api/lstgrupfunyxresp/consulta/datos")
	public List<ctg_grupfunyxresp> datos_grupfunyxresp() {	  	
		return grupfunyxresp.obtenerDatos();
	}
	
	@GetMapping("api/lstagrupamiento/consulta/datos")
	public List<ctg_agrupamiento> datos_agrupamiento() {	  	
		return agrupamiento.obtenerDatos();
	}
	
	@GetMapping("api/ctg_lstpuestoDos/datos")
	public List<ctg_lstpuesto> datos_lstpuesto2() {	  	
		return pDetalle1.lstPuestoDAO();
	}
	
	@GetMapping("api/lst_niveles/datos")
	public List<ctg_niveles> datos_lstniveles() {	  	
		return nDetalle.obtenerDatos();
	}

	

	
	 

}