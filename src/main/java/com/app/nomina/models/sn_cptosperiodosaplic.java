package com.app.nomina.models;



import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;




import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity 
@Table(name = "sn_cptosperiodosaplic")
@ToString @EqualsAndHashCode
public class sn_cptosperiodosaplic {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Getter @Setter
	private int cpa_id;
    

	@Column(name = "cpa_ejercicio", precision = 4, scale = 0)
	@Getter @Setter
	private BigDecimal cpa_ejercicio;
    
	@Getter @Setter
    private String cpa_concepto; 


	@Column(name = "cpa_tipocon", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal cpa_tipocon; 
    

	@Column(name = "cpa_periodo", precision = 2, scale = 0)
	@Getter @Setter
    private BigDecimal cpa_periodo; 
    
  
	

	
}