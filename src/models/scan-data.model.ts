export class ScanData{
    info:string;
    tipo:string;
    //el constructor recibe un parametro, por eso cuando se instancia esta clase se debe mandar un parametro tipo string
    constructor(texto:string){
        this.tipo = "no definido";
        this.info = texto;
        
        if(texto.startsWith("http")){
            this.tipo = "http";
        }else if( texto.startsWith("geo")){//se coloca la condicional para determinar si es un mapa
            //cuando se escanea con el dispositivo manda la informacion con la palabra reservada "geo" ese sera el identificador
            this.tipo = "mapa";
        }else if(texto.startsWith("BEGIN:VCARD")){
            this.tipo = "contacto"
        }
    }
}