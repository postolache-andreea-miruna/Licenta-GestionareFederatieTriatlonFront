export class Register{
    public email: string | undefined;
    public parola: string | undefined;
    public codRol: string | undefined;
    public nume:string | undefined;
    public prenume:string | undefined;
    public abonareStiri:boolean | undefined;
    public urlPozaProfil:string | undefined;
    public emailAntrenor:string | undefined;
    public codClub:number | undefined;
    public numarLegitimatie:number | undefined;
    public dataNastere:Date | undefined;
    public gen:string | undefined;
    public gradPregatire:string | undefined;
    //constructor pt datele din formular
    public constructor(init: Register) //pot s aii dau un ob doar cu o parte din proprietati
    {
        Object.assign(this, init);
    }
}