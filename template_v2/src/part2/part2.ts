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
    return (SArr.length === 0 ||(SArr.length %2 === 0 && isPaired2(SArr,0,SArr.length-1)))
    
};

const isPaired1 = (s: string): string[]=>{
    return stringToArray(s).filter(char => allBrac.has(char));
};


const isPaired2 = (sArr:string[],left:number,right:number):boolean=>{
    if (left > right) return true;
    if (!openBrac.has(sArr[left]))return false
    
    const findMatch = (i:number):number=>{
        return i>right ? -1 : sArr[i] === pearBrac[sArr[left]] ? i : findMatch(i+1)
    }

    const match = findMatch(left + 1)
    if (match === -1) return false
    return (isPaired2(sArr,left+1,match-1) && isPaired2(sArr,match+1,right));
};


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

