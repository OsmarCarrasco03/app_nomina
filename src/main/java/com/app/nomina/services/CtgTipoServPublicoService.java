package com.app.nomina.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.app.nomina.models.ctg_tiposervpublico;

@Service
public class CtgTipoServPublicoService {

    private final CtgTipoServPublicoRepository ctgTipoServPublicoRepository;

    public CtgTipoServPublicoService(CtgTipoServPublicoRepository ctgTipoServPublicoRepository) {
        this.ctgTipoServPublicoRepository = ctgTipoServPublicoRepository;
    }

    public List<String> getAllTspCodigoData() {
        List<ctg_tiposervpublico> allTspCodigoData = ctgTipoServPublicoRepository.findAll();
        return allTspCodigoData.stream()
                .map(ctg_tiposervpublico::getTsp_codigo)
                .collect(Collectors.toList());
    }

}
