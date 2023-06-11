type Transform<F,T> = (source: F) => T;

export default abstract class TokenMapper{

    private transforms: {[key:string]: (source: unknown)=>unknown} = {};

    public Resolve<T, F>(fromToken: string, toToken: string, source: T): F{
        const transform = this.transforms[this.GetKey(fromToken, toToken)];
        const result = transform(source) as F;
        return result;
    }

    protected Register<F,T>(fromtToken: string, toToken: string, transform:  Transform<F,T>){
        this.transforms[this.GetKey(fromtToken, toToken)] = transform as (source: unknown)=>unknown;
    }

    private GetKey(from:string, to: string){
        const key =  `${from}-${to}`;
        return key;
    }
}