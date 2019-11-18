// src:
//  Bartolini, Ilaria & Ciaccia, Paolo & Patella, Marco. (2002).
//  String Matching with Metric Trees Using an Approximate Distance.
//  SPIRE Lecture Notes in Computer Science. 2476. 271-283. 10.1007/3-540-45735-6_24.
//
// Bag distance: d(x,y) = max{|x-y|, |y-x|},
// |.| => number of elements in a bag.
// ex: d("hello", "hallo") = max(|{'e'}|, |{'a'}|) = 1

export class BagDistance {

    // public static bagDistance(s1: string, s2: string) {
    //     const l1 = lenSubtract(s1, s2);
    //     const l2 = lenSubtract(s2, s1);
    //     return (l1 > l2 ? l1 : l2);
    // }

    // public static lenSubtract(s1: Array<string>, s2: Array<string>) {
    //     const s1Len = s1.length;
    //     const s2Len = s2.length;
    //     let s1Matches = new Array<boolean>(s1Len);
    //     for (let index = 0; index < s1Matches.length; index++) {
    //         s1Matches[index] = false;
    //     }

    //     for (let i = 0; i < s1Len; i++) {
    //         for (let j = 0; j < s2Len; j++) {
                
    //         }
    //     }
    // }

}

