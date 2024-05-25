import { T } from "ramda";
import { Result, makeFailure, makeOk, bind, either, isFailure } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult  = <T>(pred: (x: T) => boolean, a: T[] ) : Result<T> =>
    {
        return findResultH(pred, a, 0)
    }

const findResultH  = <T>(pred: (x: T) => boolean, a: T[], i:number ) : Result<T> =>
    {
        if(i === a.length)
            return makeFailure("No element found.")
        if(pred(a[i]))
            return makeOk(a[i])
        return findResultH(pred,a,i+1)
    }

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 = (a : number[]) : Result<number> =>{
    const ret:Result<number> = findResult(x => x % 2 === 0, a) 
    return bind(ret,x => makeOk(x*x))
}

export const returnSquaredIfFoundEven_v3 = (a : number[]) : number =>{
    const ret:Result<number> = findResult(x => x % 2 === 0, a)
    return either(ret,x =>x*x,str=> -1)
}