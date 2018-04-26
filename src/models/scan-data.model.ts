export class ScanData{
    info:string;
    tipo:string;
    //el constructor recibe un parametro, por eso cuando se instancia esta clase se debe mandar un parametro tipo string
    constructor(texto:string){
        this.tipo = "no definido";
        this.info = texto;
        
        if(texto.startsWith("http")){
            this.tipo = "http";
        }
    }
}