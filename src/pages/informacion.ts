//commit CreacionPgAndModels
/*de crearon las paginas "guardados","mapa"y "tabs" , se configuro el "app.component.ts" y "app.module.ts"
se agrego una variable de color en "variables.scss", ademas, se creo la carpeta "models" y dentro se creo el
el archivo "scan-data.model.ts" creando un constructor y dos variables dentro del archivo*/

/*commit importPlugins
en este commit se implemento el plugin de cordova "Barcode Scanner" para implementar es escaneo de un codigo
qr con la camara del celular, se realizaron varios cambios incluyendo en la carpeta "app.module.ts" (revisar 
bien cual fue el cambio), se implemento tambien el mostrar aplicaciones en pantalla con "Toast" implementando 
desde ionicframework*/

/*commit guardando el scan en un array
se crea la el provider "historial" con el comando "ionic g provider historial" y se implementa el modulo 
"Platform" de 'ionic-angular' */

/*commit configurando pagina guardados 
en este commit de modifica el historial.ts, guardados.ts, guardados.html y se importa el 
{ InAppBrowser } from '@ionic-native/in-app-browser'*/

/*commit agregando google maps
se agrego el componente de google maps, para eso se ingresa a la pagina 
https://angular-maps.com/guides/getting-started/ y se siguen los pasos, pero ya al tener todo el proyecto
y el npm instalados empezamos desde esta linea de codigo npm install @agm/core --save
con ella importaremosla libreria para utilizar google maps
despues de eso, nos pide que creemos una api-key para nuestra app, la generaremos en 
https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
creamos la asociacion con nuestra app y aceptamos los terminos y condiciones */