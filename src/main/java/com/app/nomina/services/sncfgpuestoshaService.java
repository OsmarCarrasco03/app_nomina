package com.app.nomina.services;

import org.springframework.stereotype.Service;
import com.app.nomina.models.*;

@Service
public class sncfgpuestoshaService {

    private final sn_cfgpuestoshaRepository sn_CfgpuestoshaRepository;

    
    public sncfgpuestoshaService (sn_cfgpuestoshaRepository sn_CfgpuestoshaRepository){

        this.sn_CfgpuestoshaRepository = sn_CfgpuestoshaRepository;
    }

    public sn_cfgpuestosha guardaInfo(sn_cfgpuestosha info){

        return sn_CfgpuestoshaRepository.save(info);
    }

}
