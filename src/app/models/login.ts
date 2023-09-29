export class Login{
    public email : string | undefined;
    public parola : string | undefined;

    //constructor pt datele din formular
    public constructor(init: Login) //pot s aii dau un ob doar cu o parte din proprietati
    {
        Object.assign(this, init);
    }
}