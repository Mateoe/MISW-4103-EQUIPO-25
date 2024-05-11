# MISW-4103-EQUIPO-25

## Integrantes

|Nombre|Correo|
|---|---|
|Mateo Espinal Londoño|m.espinall@uniandes.edu.co|
|Julián Esteban Oliveros Forero|je.oliverosf@uniandes.edu.co|
|Andres Esteban Silva Sanchez|ae.silva10@uniandes.edu.co|


### Pagina web despliegue ghost

https://ghost-5ehz.onrender.com/ghost/#/signin

https://ghost-5ehz.onrender.com

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


### Ejecución de los tests en Resemble
1. Ingresar a la carpeta `cd resemble/`.
2. Instalar dependencias `npm i`.
3. Ejecutar el código `node runTestVRT.js`.
4. En la carpeta de reports se crean las distintas carpetas con los html y css correspondientes a cada escenario.

