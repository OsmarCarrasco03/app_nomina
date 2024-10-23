<title>SISTEMA DE NÓMINA</title>
<%@ include file="common/header-sesion.jsp" %>
    <%@ include file="common/nav.jsp" %>
        <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

            <div class="row justify-content-md-center text-center" id="bienvenidaDiv">
                <div class="col welcome-section" class="md">
                    <br><br>
                    <br>
                    <br>
                    <h1>Bienvenido al Sistema de Nómina</h1>
                    <h2 id="nombre"></h2><br><br>
                    <img src="img/nomina.png">
                </div>
            </div>



            <style>
                .welcome-section {
                    opacity: 0;
                    transform: translateY(100px);
                    animation: fadeInUp 1s ease-in-out forwards;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(100px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>


            <script src="js/bienvenida.js"></script>
            <%@ include file="common/footer.jsp" %>