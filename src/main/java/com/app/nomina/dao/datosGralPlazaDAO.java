package com.app.nomina.dao;

import java.util.List;
import com.app.nomina.models.*;

public interface datosGralPlazaDAO {

    List<sn_plaza> consultaDatos(int num_plaza);
    List<ctg_lstpuesto> consultaPtoAutoriz(int x);
    List<ctg_lstpuesto> consultaPtopagado(int y);

}
