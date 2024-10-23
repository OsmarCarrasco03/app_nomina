package com.app.nomina.models;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;



import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity 
@Table(name = "ctg_puesto")
@ToString @EqualsAndHashCode
public class ctg_puesto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Getter @Setter
	private int ctgp_id;
    
	@Getter @Setter
	private String ctgp_codigo;
    
	@Getter @Setter
    private String ctgp_descripcion; 
    
	@Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate ctgp_fechainicio;

    @Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate ctgp_fechatermino;

	@Getter @Setter
    private Integer ctgp_usucapturo;
    
    @Getter
	@Setter
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate ctgp_fechamod;	

	@Getter @Setter
    private Integer ctgp_usumodifico;
    
	@Getter @Setter
    private Integer ctgp_situacion;
	
	@Getter @Setter
    private Integer ctgp_tipo;
	
	
}