package com.app.nomina.dao;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import com.app.nomina.models.ctg_lstcptosdenomina;
import com.app.nomina.models.sn_convar_paso_3;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

@Repository
@Transactional

public class RegistroMasivoVariablesImp implements RegistroMasivoVariablesDao {

    @PersistenceContext
    EntityManager entityManager;
    Logger logger = LoggerFactory.getLogger(RegistroMasivoVariablesImp.class);


    @Override
    public boolean registrarPersonaconCSVmasivo(MultipartFile archivoCSV, String axoproceso, String perproceso,
            Date Fechainicio, int UsuCapturo, Date Fechamod, int UsuModifico, int Situacion, int Estatus) {
        try (Reader lector = new InputStreamReader(archivoCSV.getInputStream());
                CSVReader csvReader = new CSVReader(lector)) {

            String[] fila;
            csvReader.readNext();

            while ((fila = csvReader.readNext()) != null) {

                String query = "INSERT INTO sn_convar_paso_3 (var_curp, var_temporalidad, var_tipoconcepto, var_concepto,  var_cptoanteced, var_pagoanteced, var_idfactor ,var_factor, var_importe, var_contador,"
                        + "var_numnomina, var_axoi, var_periodoi, var_axof, var_periodof, var_fechaocui, var_fechaocuf, var_axoproceso, var_perproceso, var_fechainicio, var_usucapturo, var_fechamod, var_usumodifico, var_situacion,var_estatus, var_forzarimporte, var_importeforzado) "
                        + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?, ?)";

                Query sqlQuery = entityManager.createNativeQuery(query);
                sqlQuery.setParameter(1, fila[0]);
                BigDecimal varTemproalidad = new BigDecimal(fila[1]);
                sqlQuery.setParameter(2, varTemproalidad);
                BigDecimal varTipoconcepto = new BigDecimal(fila[2]);
                sqlQuery.setParameter(3, varTipoconcepto);
                sqlQuery.setParameter(4, fila[3]);
                sqlQuery.setParameter(5, fila[4]);
                sqlQuery.setParameter(6, fila[5]);
                BigDecimal varIdFactor = new BigDecimal(fila[6]);
                sqlQuery.setParameter(7, varIdFactor);
                BigDecimal varFactor = new BigDecimal(fila[7]);
                sqlQuery.setParameter(8, varFactor);
                BigDecimal varImporte = new BigDecimal(fila[8]);
                sqlQuery.setParameter(9, varImporte);
                BigDecimal varContador = new BigDecimal(fila[9]);
                sqlQuery.setParameter(10, varContador);
                BigDecimal varNomina = new BigDecimal(fila[10]);
                sqlQuery.setParameter(11, varNomina);
                BigDecimal varAxoi = new BigDecimal(fila[11]);
                sqlQuery.setParameter(12, varAxoi);
                BigDecimal varPeriodoi = new BigDecimal(fila[12]);
                sqlQuery.setParameter(13, varPeriodoi);
                String valorString = fila[13];
                if (valorString != null && !valorString.isEmpty()) {
                    try {
                        Integer valorInteger = Integer.parseInt(valorString);
                        sqlQuery.setParameter(14, valorInteger);
                    } catch (NumberFormatException e) {

                        logger.error("Error al convertir el valor String a Integer: " + e.getMessage(), e);
                    }
                } else {

                    sqlQuery.setParameter(14, null);
                }
                sqlQuery.setParameter(15, fila[14]);
                sqlQuery.setParameter(16, fila[15]);
                sqlQuery.setParameter(17, fila[16]);
                sqlQuery.setParameter(18, axoproceso); 
                sqlQuery.setParameter(19, perproceso);
                sqlQuery.setParameter(20, Fechainicio);
                sqlQuery.setParameter(21, UsuCapturo);
                sqlQuery.setParameter(22, Fechamod);
                sqlQuery.setParameter(23, UsuModifico);
                sqlQuery.setParameter(24, Situacion);
                sqlQuery.setParameter(25, Estatus);

                BigDecimal varImporteFor = new BigDecimal(fila[17]);
                sqlQuery.setParameter(26, varImporteFor);

                BigDecimal varForImporte = new BigDecimal(fila[18]);
                sqlQuery.setParameter(27, varForImporte);

                
                sqlQuery.executeUpdate();

                logger.info("Registro ingresado a la base de datos: " + Arrays.toString(fila));

            }

            return true;

        } catch (IOException | CsvValidationException e) {
            logger.error("Error al registrar personas desde CSV: " + e.getMessage(), e);
            return false;
        } catch (NumberFormatException e) {
            logger.error("Error al convertir valores a BigDecimal: " + e.getMessage(), e);
            return false;
        } catch (Exception e) {
            logger.error("Error general al registrar personas desde CSV: " + e.getMessage(), e);
            return false;
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Object[]> obtenerDatosXdatosmasivos() {
        try {
            String query = "SELECT var_curp, var_temporalidad, var_tipoconcepto, var_concepto, var_cptoanteced, var_pagoanteced, var_idfactor,"
                    + "var_factor, var_importe, var_contador, var_numnomina, var_axoi, var_periodoi, var_axof, var_periodof, var_fechaocui, var_fechaocuf, var_error "
                    + "FROM sn_convar_paso_3";
    
                    List<Object[]> resultados = entityManager.createQuery(query).getResultList();

// Validar cada registro obtenido por CURP y temporalidad
for (Object[] resultado : resultados) {
    String curp = (String) resultado[0];
    BigDecimal temporalidad = (BigDecimal) resultado[1];
    BigDecimal factor = (BigDecimal) resultado[6];
    BigDecimal tipo = (BigDecimal) resultado[2];
    String concepto  = (String) resultado[3];
    BigDecimal nomina = (BigDecimal) resultado[10];
    String conceptounico  = (String) resultado[4];
    

    boolean curpExists = curpExistecargaMasiva(curp);
    boolean temporalidadExists = temporalidadExistecargaMasiva(temporalidad);
    boolean factorExists = factorExistecargaMasiva(factor);
    boolean conceptoExists = conceptoExistecargaMasiva(concepto , tipo);
    boolean nominaExists = nominaExistecargaMasiva(nomina);
    boolean conceptounicoExists = conceptoUnicoExistecargaMasiva(conceptounico);


    if (!curpExists) {
        logger.error("El CURP no existe en la base de datos: " + curp);
        // Actualizar el estado a 2 si el CURP no existe
        entityManager.createQuery("UPDATE sn_convar_paso_3 SET var_estatus = 2 WHERE var_curp = :curp")
            .setParameter("curp", curp)
            .executeUpdate();
    } else if (!temporalidadExists) {
        logger.error("La temporalidad no existe en la base de datos: " + temporalidad);
        // Actualizar el estado a 2 si la temporalidad no existe
        String updateQuery = "UPDATE sn_convar_paso_3 SET var_estatus = 2 WHERE var_temporalidad = :temporalidad";
        entityManager.createNativeQuery(updateQuery)
            .setParameter("temporalidad", temporalidad.doubleValue()) // Convertir BigDecimal a Double
            .executeUpdate();
    } else if (!factorExists) {
        logger.error("El factor no existe en la base de datos: " + factor);
        // Actualizar el estado a 2 si el factor no existe
        String updateQuery = "UPDATE sn_convar_paso_3 SET var_estatus = 2 WHERE var_idfactor = :factor";
        entityManager.createNativeQuery(updateQuery)
            .setParameter("factor", factor.doubleValue()) // Convertir BigDecimal a Double
            .executeUpdate();
    }   else if (!conceptoExists) {
        logger.error("El concepto y tipo no coinciden en la base de datos: " + concepto  + ", " + tipo);
        // Actualizar el estado a 2 si el concepto y tipo no coinciden
        String updateQuery = "UPDATE sn_convar_paso_3 SET var_estatus = 2 WHERE var_concepto = :concepto  AND var_tipoconcepto = :tipo";
        entityManager.createNativeQuery(updateQuery)
            .setParameter("concepto", concepto )
            .setParameter("tipo", tipo) // Convertir BigDecimal a Integer
            .executeUpdate();
    }

    else if (!nominaExists) {
        logger.error("La nomina no existe en la base :" + nomina);
        // Actualizar el estado a 2 si el concepto y tipo no coinciden
        String updateQuery = "UPDATE sn_convar_paso_3 SET var_estatus = 2 WHERE var_numnomina = :nomina ";
        entityManager.createNativeQuery(updateQuery)
            .setParameter("nomina", nomina)
            .executeUpdate();
    }

    else if (!conceptounicoExists) {
        logger.error("El concepto antecedente no existe en la base :" + conceptounico);
        // Actualizar el estado a 2 si el concepto y tipo no coinciden
        String updateQuery = "UPDATE sn_convar_paso_3 SET var_estatus = 2 WHERE var_cptoanteced = :conceptounico ";
        entityManager.createNativeQuery(updateQuery)
            .setParameter("conceptounico", conceptounico)
            .executeUpdate();
    }
 

  
    
     else {
        // Actualizar el estado a 3 si tanto el CURP, la temporalidad, el factor y el concepto coinciden
        entityManager.createQuery("UPDATE sn_convar_paso_3 SET var_estatus = 3 WHERE var_curp = :curp AND var_temporalidad = :temporalidad AND var_idfactor = :factor AND var_concepto = :concepto AND var_tipoconcepto = :tipo AND var_numnomina = :nomina AND var_cptoanteced = :conceptounico")
            .setParameter("curp", curp)
            .setParameter("temporalidad", temporalidad)
            .setParameter("factor", factor)
            .setParameter("concepto", concepto)
            .setParameter("tipo", tipo)
            .setParameter("nomina", nomina)
            .setParameter("conceptounico", conceptounico)
           
            .executeUpdate();
    }
}
  return resultados;
        } catch (Exception e) {
            logger.error("Error al ejecutar la consulta de datos seleccionados con: " + e.getMessage(), e);
            throw new RuntimeException("Error al ejecutar la consulta", e);
        }
    }
    
    
    

//VALIDACIÓN DE CURP EN BASE DE DATOS  CHECK
    @Override
    public boolean curpExistecargaMasiva(String curp) {
        try {
            String query = "SELECT COUNT(*) FROM sn_persona WHERE per_curp = :curp";
            Long count = entityManager.createQuery(query, Long.class).setParameter("curp", curp).getSingleResult();
    
            return count > 0; // Retorna true si el CURP existe, false si no existe
        } catch (Exception e) {
            logger.error("Error al ejecutar la consulta si el curp existe: " + e.getMessage(), e);
            throw new RuntimeException("Error al ejecutar la consulta", e);
        }
    }




//VALIDACION DE TEMPROLAIDA EN BASE DE DATOS CHECK
    @Override
    public boolean temporalidadExistecargaMasiva(BigDecimal temporalidad) {
        try {
            String query = "SELECT COUNT(*) FROM ctg_lstconvar WHERE lcv_clase = 1 AND lcv_clave IN (1, 2) AND lcv_clave = :temporalidad";
            Long count = entityManager.createQuery(query, Long.class)
                                     .setParameter("temporalidad", temporalidad.intValue()) // Convertir BigDecimal a Integer
                                     .getSingleResult();
    
            return count > 0; // Retorna true si la temporalidad existe, false si no existe
        } catch (Exception e) {
            logger.error("Error al ejecutar la consulta si la temporalidad existe: " + e.getMessage(), e);
            throw new RuntimeException("Error al ejecutar la consulta", e);
        }
    }


    

//VALIDACION DE FACTOR EN BASE DE DATOS CHECK
@Override
public boolean factorExistecargaMasiva(BigDecimal factor) {
    try {
        String query = "SELECT COUNT(*) FROM ctg_lstconvar WHERE lcv_clase = 2 AND lcv_clave IN (1, 2, 3)\n" + //
                        " AND lcv_clave = :factor";
        Long count = entityManager.createQuery(query, Long.class)
                                 .setParameter("factor", factor.intValue()) // Convertir BigDecimal a Integer
                                 .getSingleResult();

        return count > 0; // Retorna true si la temporalidad existe, false si no existe
    } catch (Exception e) {
        logger.error("Error al ejecutar la consulta si la temporalidad existe: " + e.getMessage(), e);
        throw new RuntimeException("Error al ejecutar la consulta", e);
    }
}


//VALIDACION DE CONCEPTOTIPO EN BASE DE DATOS--------------VALDIAR EN EXCEL PENDIENTE
@Override
public boolean conceptoExistecargaMasiva(String concepto, BigDecimal tipo) {
    try {
        String query = "SELECT COUNT(*) FROM ctg_conceptosdenomina WHERE con_ejercicio = 2024 AND con_tabla = 1 AND con_concepto = :concepto AND con_tipo = :tipo";
        Long count = entityManager.createQuery(query, Long.class)
                                 .setParameter("concepto", concepto)
                                 .setParameter("tipo", tipo) // Convertir BigDecimal a Integer
                                 .getSingleResult();

        return count > 0; // Retorna true si el concepto existe, false si no existe
    } catch (Exception e) {
        logger.error("Error al ejecutar la consulta si el concepto existe: " + e.getMessage(), e);
        throw new RuntimeException("Error al ejecutar la consulta", e);
    }
}



@Override
public boolean nominaExistecargaMasiva(BigDecimal nomina) {
    try {
        String query ="SELECT COUNT(*) FROM sn_nominasoperando WHERE nop_ejercicio = 2024 AND nop_periodo = 19 AND nop_numnomina > 0 AND nop_numnomina = :nomina";
        Long count = entityManager.createQuery(query, Long.class)
                                 .setParameter("nomina", nomina.intValue()) // Convertir BigDecimal a Integer
                                 .getSingleResult();

        return count > 0; // Retorna true si la nomina existe, false si no existe
    } catch (Exception e) {
        logger.error("Error al ejecutar la consulta si la nomina existe: " + e.getMessage(), e);
        throw new RuntimeException("Error al ejecutar la consulta", e);
    }
}



@Override
public boolean conceptoUnicoExistecargaMasiva(String conceptounico) {
    try {
        String query = "SELECT COUNT(*) FROM ctg_conceptosdenomina WHERE con_ejercicio = 2024 AND con_tabla = 1 AND con_concepto = :conceptounico";
        Long count = entityManager.createQuery(query, Long.class)
                                 .setParameter("conceptounico", conceptounico)
                                 .getSingleResult();

        return count > 0; // Retorna true si el concepto existe, false si no existe
    } catch (Exception e) {
        logger.error("Error al ejecutar la consulta si el concepto existe: " + e.getMessage(), e);
        throw new RuntimeException("Error al ejecutar la consulta", e);
    }
}



// @Override
// public boolean validarEntradaSoloNumerosYLetras() {
//     try {
//         String query = "SELECT var_pagoanteced FROM sn_convar_paso_3";
//         @SuppressWarnings("unchecked")
//         List<String> resultados = entityManager.createQuery(query).getResultList();
        
//         // Validar cada registro obtenido
//         for (String var_pagoanteced : resultados) {
//             // Verificar si la cadena contiene solo números y letras con un máximo de 18 caracteres
//             boolean esSoloNumerosYLetras = var_pagoanteced.matches("[a-zA-Z0-9]{1,18}");
            
//             if (!esSoloNumerosYLetras) {
//                 return false; // Si se encuentra al menos un registro que no cumple la condición, retornar falso
//             }
//         }
        
//         return true; // Si todos los registros cumplen la condición, retornar true
//     } catch (Exception e) {
//         logger.error("Error al validar la entrada solo con números y letras: " + e.getMessage(), e);
//         throw new RuntimeException("Error al validar la entrada solo con números y letras", e);
//     }
// }













    public boolean NumeroExisteBase(Integer tipoConcepto) {
        try {
            String query = "SELECT COUNT(*) FROM ctg_lstcptosdenomina WHERE lcdm_clase = 2 AND lcdm_clave = :tipoConcepto";
            Long count = entityManager.createQuery(query, Long.class)
                    .setParameter("tipoConcepto", tipoConcepto)
                    .getSingleResult();

            return count > 0; // Retorna true si el tipo de concepto existe, false si no existe
        } catch (Exception e) {
            logger.error("Error al ejecutar la consulta si el tipo de concepto existe: " + e.getMessage(), e);
            throw new RuntimeException("Error al ejecutar la consulta", e);
        }
    }








@Override
public boolean validarConceptosDenomina(BigDecimal tipocon, String concepto) {
    try {
        String query = "SELECT COUNT(*) FROM ctg_conceptosdenomina WHERE con_concepto = :tipocon AND con_tipo = :concepto";
        Long count = entityManager.createQuery(query, Long.class)
                                 .setParameter("tipocon", tipocon)
                                 .setParameter("concepto", concepto)
                                 .getSingleResult();

        return count > 0; // Retorna true si hay coincidencias, false si no hay coincidencias
    } catch (Exception e) {
        logger.error("Error al validar los conceptos en la tabla ctg_conceptosdenomina: " + e.getMessage(), e);
        throw new RuntimeException("Error al ejecutar la consulta", e);
    }
}



    // @SuppressWarnings("unchecked")
    // @Override
    // public List<ctg_lstcptosdenomina> obtenerDatosXtipoMasivo() {
    //     try {
    //         String query = "FROM ctg_lstcptosdenomina where lcdm_clase = 2";

    //         logger.info("registro: " + entityManager.createQuery(query).getResultList());
    //         return entityManager.createQuery(query).getResultList();
    //     } catch (Exception e) {
    //         logger.error("Error al ejecutar la consulta de datos por clasificacion: " + e.getMessage(), e);
    //         throw new RuntimeException("Error al ejecutar la consulta", e);
    //     }
    // }

    public void eliminarDatos(String usuarioCapturo) {
        try {
            // Convertir usuarioCapturo a Integer si es posible
            Integer idUsuario = Integer.parseInt(usuarioCapturo);
    
            String query = "DELETE FROM sn_convar_paso_3 WHERE var_usucapturo = :usuarioCapturo";
    
            int numRegistrosEliminados = entityManager.createQuery(query)
                                                    .setParameter("usuarioCapturo", idUsuario)
                                                    .executeUpdate();
            logger.info("Se han eliminado " + numRegistrosEliminados + " registros de sn_convar_paso_3 para el usuario: " + idUsuario);
        } catch (NumberFormatException e) {
            // Manejar el caso en que usuarioCapturo no pueda ser convertido a Integer
            throw new IllegalArgumentException("El usuarioCapturo no es un número válido: " + usuarioCapturo, e);
        } catch (Exception e) {
            logger.error("Error al eliminar los datos de sn_convar_paso_3 para el usuario " + usuarioCapturo + ": " + e.getMessage(), e);
            throw new RuntimeException("Error al ejecutar la consulta", e);
        }
    }

     

    @Override
    public List<sn_convar_paso_3> insertData() {
        try {
            String nativeQuery = "INSERT INTO sn_conceptosvariables (var_idpersona, var_temporalidad, var_tipoconcepto, var_concepto, var_cptoanteced, var_pagoanteced, var_idfactor, var_factor, var_importe, var_contador, var_numnomina, var_axoi, var_periodoi, var_axof, var_periodof, var_fechaocui, var_fechaocuf, var_axoproceso, var_perproceso, var_fechainicio, var_fechatermino, var_usucapturo, var_fechamod, var_usumodifio, var_situacion) "
                    +
                    "SELECT per_id, var_temporalidad, var_tipoconcepto, var_concepto, " +
                    "CASE WHEN var_cptoanteced = '' THEN NULL ELSE var_cptoanteced END AS var_cptoanteced, " +
                    "CASE WHEN var_pagoanteced = '' THEN NULL ELSE var_pagoanteced END AS var_pagoanteced, " +
                    "var_idfactor, var_factor, var_importe, var_contador, var_numnomina, var_axoi, var_periodoi, " +
                    "CASE WHEN var_axof = '' THEN NULL ELSE CAST(var_axof AS NUMERIC) END AS var_axof, " +
                    "CASE WHEN var_periodof = '' THEN NULL ELSE CAST(var_periodof AS NUMERIC) END AS var_periodof, " +
                    "CASE WHEN var_fechaocui <> '' AND var_fechaocui <> '' THEN TO_DATE(var_fechaocui, 'DD/MM/YYYY') ELSE NULL END AS var_fechaocui, "
                    +
                    "CASE WHEN var_fechaocuf <> '' AND var_fechaocuf <> '' THEN TO_DATE(var_fechaocuf, 'DD/MM/YYYY') ELSE NULL END AS var_fechaocuf, "
                    +
                    "CAST(var_axoproceso AS NUMERIC) AS var_axoproceso, " +
                    "CAST(var_perproceso AS NUMERIC) AS var_perproceso, " +
                    "var_fechainicio, var_fechatermino, var_usucapturo, var_fechamod, var_usumodifico, var_situacion " +
                    "FROM sn_convar_paso_3 " +
                    "JOIN sn_persona ON per_curp = var_curp " +
                    "WHERE var_estatus = 3";

            int rowsAffected = entityManager.createNativeQuery(nativeQuery).executeUpdate();
            logger.info(rowsAffected + " registros insertados correctamente.");
        } catch (Exception e) {
            logger.error("Error al ejecutar la consulta de inserción de datos: " + e.getMessage(), e);
            throw new RuntimeException("Error al ejecutar la consulta de inserción de datos", e);
        }
        return null;
    }


    @Override
    public boolean validarEntradaSoloNumeros() {
        try {
            String query = "SELECT var_cptoanteced FROM sn_convar_paso_3";
            @SuppressWarnings("unchecked")
            List<String> resultados = entityManager.createQuery(query).getResultList();
            
            // Validar cada registro obtenido
            for (String var_cptoanteced : resultados) {
                String regex = "\\d+";
                boolean esSoloNumeros = var_cptoanteced.matches(regex);
                
                if (!esSoloNumeros) {
                    return false; // Si se encuentra al menos un registro que no contiene solo números, retornar falso
                }
            }
            
            return true; // Si todos los registros contienen solo números, retornar true
        } catch (Exception e) {
            logger.error("Error al validar la entrada solo con números: " + e.getMessage(), e);
            throw new RuntimeException("Error al validar la entrada solo con números", e);
        }
    }

    @Override
    public boolean validarEntradaSoloNumerospagoanteced() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'validarEntradaSoloNumerospagoanteced'");
    }


  

    

}
