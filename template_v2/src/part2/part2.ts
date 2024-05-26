import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
export const countVowels = ( s :string) : number=>{
    
    const v:Set<string> = new Set(['a','e','o','i','u','A','E','I','O','U'])
    return stringToArray(s).filter(char => v.has(char)).length;
    

}
/* Question 2 */
const openBrac:Set<string> = new Set(['[','{','('])
const pearBrac :  { [key: string]: string } = {')': '(','}': '{',']': '['};
const allBrac:Set<string>=  new Set(['[','{','(',']','}',')'])


export const isPaired = (s: string): boolean=>{
    const SArr:string[] = isPaired1(s)
    return (SArr.length === 0 ||(SArr.length %2 === 0 && isPaired2(SArr,"",0)))
    
};

const isPaired1 = (s: string): string[]=>{
    return stringToArray(s).filter(char => allBrac.has(char));
};


const isPaired2 = (s:string[] , stack : string,i:number):boolean=>{
    if(i === s.length){
        if(stack === "")return true
        return false
    }
    if(openBrac.has(s[i]))return isPaired2(s,stack.concat(s[i]),i+1)
    if(stack[stack.length - 1] !== pearBrac[s[i]])return false
    return isPaired2(s,stack.slice(0,-1),i+1) 
}


/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence = (w:WordTree) : string=>{
    if(R.length(w.children) === 0)
        return w.root
    return w.root + " " + (R.map(treeToSentence,w.children).join(" "));
}

