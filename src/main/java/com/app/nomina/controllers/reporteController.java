package com.app.nomina.controllers;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.app.nomina.dao.reportePuestoDao;
import com.app.nomina.models.ctg_lstpuesto;
import com.app.nomina.models.ctg_niveles;
import com.app.nomina.models.sn_cfgpuesto;


					   @RestController
					   public class reporteController {
								
					   @Autowired
					   reportePuestoDao reportepuestoDao;
					   Logger logger = LoggerFactory.getLogger(LoginController.class);
					    
					   @GetMapping("api/persona/ObtenerTipo")
					    public List<ctg_lstpuesto> obtenerDatosXbase() {
					           return reportepuestoDao.obtenerDatosXbase(); 
					    }
					    
			
					   @GetMapping("api/persona/ObtenerIndice")
					    public List<ctg_lstpuesto> obtenerDatosXindice() {
					        return reportepuestoDao.obtenerDatosXindice(); 
					    }
					    
					    @GetMapping("api/persona/ObtenerNivel")
					    public List<ctg_niveles> obtenerDatosXnivel() {
					        return reportepuestoDao.obtenerDatosXnivel(); 
					    }
					    
					    @GetMapping("api/persona/ObtenerCategoria")
					    public List<ctg_lstpuesto> obtenerDatosXcategoria() {
					        return reportepuestoDao.obtenerDatosXcategoria();
					    }
					    
					    
					    @GetMapping("api/persona/ObtenerSubCategoria")
					    public List<ctg_lstpuesto> obtenerDatosXsubcategoria() {
					        return reportepuestoDao.obtenerDatosXsubcategoria(); 
					    }
					    
					    
					    @GetMapping("api/persona/ObtenerInterna")
					    public List<ctg_lstpuesto> obtenerDatosXinterna() {
					        return reportepuestoDao.obtenerDatosXinterna(); 
					    }
					    
					    @GetMapping("api/persona/Obtenercontratacion")
					    public List<ctg_lstpuesto> obtenerDatosXcontratacion() {
					        return reportepuestoDao.obtenerDatosXcontratacion(); 
					    }
					    
					    @GetMapping("api/persona/Obtenerdeclaracion")
					    public List<ctg_lstpuesto> obtenerDatosXdeclaracion() {
					        return reportepuestoDao.obtenerDatosXdeclaracion(); 
					    }
					    
					    
					    @PostMapping("api/puestos/consulta/datosXelecciondepuesto")
						public List<sn_cfgpuesto> obtenerDatosXeleccion(@RequestBody sn_cfgpuesto eleccion) {
							return reportepuestoDao.obtenerDatosXeleccion(eleccion);
						}
						
				}