import { ComentariiModel } from "./comentariiModel";

export interface PostareByEmailUtilizModel{
    reactieFericireUtilizator: boolean;
    reactiiTristeteUtilizator: boolean;
    urlPoza: string;
    numarReactiiFericire:number;
    numarReactiiTristete:number;
    dataPostare:Date;
    descriere:string;
    nume:string;
    prenume:string;
    urlPozaProfil:string;
    email:string;
    codPostare:number;
    comentarii: ComentariiModel[];
}