<title>Pantalla de prueba</title>
<%@ include file="common/header-sesion.jsp" %>
    <%@ include file="common/nav.jsp" %>
        <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

        <body>
            <div class="container rounded div-padding input-color div-separacion-mediana">
                <br>
                <div class="text-center">
                    <div>
                        <h2>Buscar Persona</h2>
                    </div>
                </div>
            </div>

            <div class="text-center justify-content-md-center ui-widget">
                <input id="autocomplete" type="search" dir="ltr" spellcheck="false"
                autocorrect="off" autocapitalize="off" autocomplete="off" class="col-6">
                <button type="button" class="btn btn-info" onclick="buscarPersona()"> Buscar
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>          
            </div>
            <div class="row justify-content-md-center div-separacion-debajo"></div>


            <div class="container">
                <form class="mt-3">
                    <div class="row md">
                        <label class="col-2 col-form-label" for="nombreInput">Nombre de la persona</label>
                        <div class="col-4">
                            <input type="text" class="form-control" id="nombreInput">
                        </div>
                                                
                        <label class="col-2 col-form-label" for="edoCivilInput">Estado Civil</label>
                            <div class="col-4">
                                <input type="text" class="form-control" id="nombreInput">
                            </div>
                    </div> 
                    <br><br>
                    <div class="text-center">
                        <button type="submit" class="btn btn-success">
                            Subir
                        </button>
                        <button type="reset" class="btn btn-warning">
                            Modificar
                        </button>
                        <button type="submit" class="btn btn-danger">
                            Eliminar Datos
                        </button>
                        
                    </div>                           
                </form>
            </div>
            
        </body>



        <script src="js/prueba_osmar.js"></script>
        
        


            


            