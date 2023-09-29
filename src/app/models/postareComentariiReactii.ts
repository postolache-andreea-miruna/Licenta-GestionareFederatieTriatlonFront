import { ComentariiModel } from "./comentariiModel";
export interface PostareComentariiReactii{
    urlPoza:string;
    numarReactiiFericire: number;
    numarReactiiTristete: number;
    dataPostare: Date;
    descriere: string;
    nume:string;
    prenume:string;
    urlPozaProfil:string;
    email:string;
    codAntrenor:string;
    codPostare:number;
    comentarii: ComentariiModel[];
}
