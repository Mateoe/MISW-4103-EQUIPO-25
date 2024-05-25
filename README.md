# MISW-4103-EQUIPO-25

## Integrantes

|Nombre|Correo|
|---|---|
|Mateo Espinal Londoño|m.espinall@uniandes.edu.co|
|Julián Esteban Oliveros Forero|je.oliverosf@uniandes.edu.co|
|Andres Esteban Silva Sanchez|ae.silva10@uniandes.edu.co|

<hr/>

### Pagina web despliegue ghost

#### Versión 5.80.0

https://ghost-b3tr.onrender.com/ghost/#/signin

https://ghost-b3tr.onrender.com

#### Versión 3.42.9

**Actualmente no disponible, se bajó luego de la ultima entrega para evitar sobrecostos**

<hr/>

## Semana 8

### Ejecución de pruebas de accesibilidad

1. Descargar la extensión AXE para el navegador Chrome desde el [enlace oficial](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd).
2. Ingresar a la instancia desplegada de ghost haciendo click en el enlace: [ghost](https://ghost-b3tr.onrender.com/ghost/#/signin)
3. Ingresar el correo "test@test.com" y la contraseña "Test@test25" (notar que la primera T es mayuscula).
4. Ingresar a la página que desea explorar y abrir las herramientas de desarrollador, por ejemplo para la página de miembros:
   ![image](https://github.com/Mateoe/MISW-4103-EQUIPO-25/assets/26661339/10110d7c-6c3f-4a4f-a20f-193cda6c742e)
5. Buscar y presionar sobre la tab de Axe DevTools:
   ![image](https://github.com/Mateoe/MISW-4103-EQUIPO-25/assets/26661339/6c728807-234c-43a8-8bca-7ab780806ae0)
6. Presionar sobre el botón "Scan ALL of my page":
   ![image](https://github.com/Mateoe/MISW-4103-EQUIPO-25/assets/26661339/e7d625cd-43cf-4bb0-bdbc-043eae22f7e3)
7. Revisar los issues encontrados:
   ![image](https://github.com/Mateoe/MISW-4103-EQUIPO-25/assets/26661339/55469df4-7735-4d9f-87b2-88d5490200fb)
8. Adicionalmente el archivo presente en la ruta `.\accesibilidad\pruebas.html` y `.\accesibilidad\pruebas.md` presenta el inventario de las 20 pruebas ejecutadas.

    **Nota**: Adicional a lo anterior el pdf con el resultado de las pruebas puede ser consultado en el enlace: [reporte accesibilidad](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/accesibilidad/pruebas.html)


### Ejecución de pruebas bajo diferentes resoluciones

Con el objetivo de observar el comportamiento de la ABP bajo diferentes tamaño de pantalla, se crearon pruebas con datos aleatorios que permitan validar bajo 3 escenarios diferentes:

1. Tamaño de pantalla pequeño 850x480
2. Tamaño de pantalla mediano 1600x900
3. Tamaño de pantalla grande 3840x2160

Se acalara que, durante esta semana se realiza la creación de las pruebas y guardado de las evidencias en formato de imagen, las cuales se espera que a futuro sean usadas para pruebas de regresión visual o análisis manual de las imagenes para validar el comportamiento esperado.

#### Instrucciones de ejecución

1. Ingresar a la carpeta donde se encuentran las pruebas de resolución `cd .\pruebas_resolucion\`.
2. Ingresar el comando `npm i` para instalar los modulos
3. Ejecutar las pruebas con resolucion 850x480 `node .\runTests850x480.js`

   * Se destaca que en la ejecución de estas pruebas se observa que si bien la mayor parte de las pruebas son exitosas, al estar los elementos de la pantalla tan colapsados, se genera incomodidad visual, lo cual puede reducir la usabilidad por parte del usuario.

4. Ejecutar las pruebas con resolucion 1600x900 `node .\runTests1600x900.js`

   * Se desataca que este rango de pantalla es ideal, dado que todos los elementos de la pantallatienen una adecuada visualización, sin generar incomodidad o errores.
  
5. Ejecutar las pruebas con resolucion 3840x2160 `node .\runTests3840x2160.js`.

   * Se destaca que, si bien en este rango de pantalla las pruebas se ejecutan con normalidad, la interfaz no está preparada para el uso de pantallas grandes, lo cual se aprecia porque queda mucho espacio entre las margenes y los elementos, lo cual en la mayoría de ocasiones se ve reflejado en que se desperdicia gran parte de la pantalla.
  
6. Los resultados de cada ejecución pueden ser consultados en la carpeta `results`, en la cual se encuentan las carpetas para cada resolucion y dentro de ellas las imagenes contenidas en su respectiva carpeta.

   **Nota**: si desea consultar previo a las ejecuciones, la carpeta results ya contiene capturas de las pruebas desarrolladas antes de realizar la entrega.


<hr/>

## Semana 7

### Ejecución de los tests con las diferentes estrategias de generación de datos (A priori, pseudo aleatorio, aleatorio),

#### Instrucciones de ejecución

1. Ingresar a la carpeta donde se encuentran las pruebas aleatorias `cd .\pruebas_generacion_datos\puppeteer\`.
2. Ingresar el comando `npm i` para instalar los modulos
3. Ejecutar las pruebas con pool de datos a priori `node .\runTestsPriori.js`

   * El pool de datos a priori fue generado mediante la herramienta mockaroo en formato json, el cual se puede encontrar en la carpeta `.\data`

4. Ejecutar las pruebas con pool de datos pseudo aleatorios `node .\runTestsPseudoAleatorios.js`

   * El pool de datos pseudo aleatorios fue generado mediante el uso e invocación de apis de mockaroo, las cuales pueden ser consultadas en la definición del archivo ejecutado en este paso.
  
5. Ejecutar las pruebas con el pool de datos aleatorios `node .\runTestsAleatorios.js`.

   * El pool de datos aleatorios fue implementado mediante invocaciones a la librería fakerjs, lo cual puede ser consultado en la definición del archivo ejecutado en este paso.
  
6. Los resultados de cada ejecución pueden ser consultados en la carpeta `results`, en la cual se encuentan las capturas de cada test bajo cada pool de datos.

   **Nota**: si desea consultar previo a las ejecuciones, la carpeta results ya contiene capturas de las pruebas desarrolladas antes de realizar la entrega.

**Anotación importante**: dado que somo 3 personas, se entiende que la calificación es sobre 90 pruebas, sin embargo, se realizaron 96 para tener un mejor margen en la busqueda de issues.

<hr/>

## Semana 6

### Ejecución de los tests en Resemble


**Nota**: En la carpeta `resemble/reports` ya se encuentra la ultima versión de los reportes:
1. [Crear un Post](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/resemble/reports/newPost/report.html)
1. [Crear un post con Un tag](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/resemble/reports/newPostWithTag/report.html)
1. [Editar el nombre de perfil](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/resemble/reports/EditProfileName/report.html)
1. [Editar la locacion de perfil](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/resemble/reports/EditProfileLocation/report.html)



#### Instrucciones de ejecución
1. Ingresar a la carpeta `cd resemble/`.
2. Instalar dependencias `npm i`.
3. Ejecutar el código `node runTestVRT.js`.
4. En la carpeta de reports se crean las distintas carpetas con los html y css correspondientes a cada escenario.


### Ejecución de los test en backstop

**Nota**: En la carpeta `reports` ya se encuentra la ultima versión de los reportes mencionados en los puntos 7, 8 y 9 de las isntrucciones de ejecución, por lo que si deseaconsultarlos antes de realizar las ejecuciones se recomienda seguir dichos puntos o acceder a los siguientes enlaces:

1. [Agregar tag](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/backstop/reports/report_agregar_tag/index.html)
1. [Editar tag](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/backstop/reports/report_editar_tag/index.html)
1. [Eliminar tag](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/backstop/reports/report_eliminar_tag/index.html)
1. [Agregar página](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/backstop/reports/report_agregar_pagina/index.html)
1. [Eliminar página](https://html-preview.github.io/?url=https://github.com/Mateoe/MISW-4103-EQUIPO-25/blob/main/backstop/reports/report_eliminar_pagina/index.html)

#### Instrucciones de ejecución

1. Instalar las liberías correspondientes, se sugiere que se haga de forma global para que el escenario de ejecución sea similar: `npm install -g http-server`, `npm install -g backstopjs`.
2. Ingresar a la carpeta backstop `cd .\backstop\`.
3. Ingresar a la carpeta tests_results `cd .\tests_results\`.
4. Iniciar el servidor en tests_results con el comando `http-server`. se debe garantizar que se expuso el puerto 8080 para el correcto funcionamiento de las pruebas, dado que las imágenes tienen el formato de `http://127.0.0.1:8080/carpeta_de_la_prueba/imagen_de_la_prueba.png`.
5. Retornar a la carpeta principal de backstop `cd ..`.
6. Correr cada escenario de tests, para ello se deben correr los siguientes comando, donde para el ejemplo se usa la funcionalidad de eliminar_pagina, sin embargo, basta con reemplazar el nombre del archivo `.json` por el de la prueba que desea correr.
    
    a. `backstop reference --config eliminar_pagina.json` para establecer la imagen de referencia.
    
    b. `backstop test --config eliminar_pagina.json` para correr la prueba y generar el reporte.

7. Observar el reporte generado por la regresión visual en la carpetar reports `cd .\reports\`.
8. Ingresar a la carpeta del test, por ejemplo ` cd .\report_eliminar_pagina\`.
9. Abrir el archivo `index.html` generado, donde podrá observar todos los detalles del reporte.

<hr/>

## Semana 5

### Ejecución de los tests en puppeteer
Para la creación de las pruebas se usó un ambiente con las siguientes características
* **SO**: Windows 11 Pro 22631.3527
* **Navegador**: chrome
* **Version de None**: 22.0.0

#### Pasos para ejecutar las pruebas
1. Ingresar a la carpeta pupeteer
2. Ingresar el comando `npm i` para instalar los modulos
3. Ingresar el comando `node runTests.js` para correr las pruebas
4. Revisar los resultados en la carpeta "results"
5. Para los tests 11-14 (test_create_pag, test_delete_pag, test_edit_pag, test_edit_perfil, test_edit_perfil) se debe correr individualmente node `node tests/test_create_pag.js`

### Ejecución de los tests en kraken
Para la creación de las pruebas se usó un ambiente con las siguientes características
* **SO**: Windows 11 Pro 22631.3527
* **Navegador**: chrome
* **Version de None**: 22.0.0

#### Pasos para ejecutar las pruebas
1. Ingresar a la carpeta kraken
2. Ingresar el comando `npm i` para instalar los modulos
3. Dentro de la ruta `./features/web/tests` se encuentran las pruebas elaboradas con extensión .feature"
4. Para ejecutar una prueba arrastrarla a la carpeta "./features" y ejecutar el comando `npx kraken-node run`

**Por ejemplo**: Copiar el archivo de la ruta "kraken\features\web\tests\crear_miembro.feature" y pegarlo en la carpeta "kraken\features" y luego ejecutar el comando "npx kraken-node run", repitiendo lo mismo en cada caso, teniendo presente que en "kraken\features" solo debe haber un archivo ".feature" a la vez.

**Nota:** esto se realiza así dado que en windows no encontramos una manera de correr multiples archivos ".feature" de kraken.

**sugerencia:** ejecutar las pruebas en el siguiente orden:

1. crear_tag.feature
2. editar_tag.feature
3. eliminar_tag.feature
4. crear_miembro.feature
5. eliminar_miembro.feature

Esto para que existan los insumos necesarios para correr cada prueba y los escenarios se comporten adecuadamente.


<hr/>

