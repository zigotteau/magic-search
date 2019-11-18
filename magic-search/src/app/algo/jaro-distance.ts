// src: https://rosettacode.org/wiki/Jaro_distance#Java

export class JaroDistance {

    /**
     * @return similarity [0-1];
     */
    public static jaro(s1: string, s2: string) {
        const s1Len = s1.length;
        const s2Len = s2.length;

        if (s1Len === 0 && s2Len === 0) {
            return 1;
        }

        const matchDistance = Math.max(s1Len, s2Len) / 2 - 1;

        let s1Matches = new Array<boolean>(s1Len);
        for (let index = 0; index < s1Matches.length; index++) {
            s1Matches[index] = false;
        }
        let s2Matches = new Array<boolean>(s2Len);
        for (let index = 0; index < s2Matches.length; index++) {
            s2Matches[index] = false;
        }

        let matches = 0;
        let transpositions = 0;
        // matches
        for (let i = 0; i < s1Len; i++) {
            const start = Math.max(0, i - matchDistance);
            const end = Math.min(i + matchDistance, s2Len);

            for (let j = start; j < end; j++) {
                if (s2Matches[j]) {
                    continue;
                }
                if (s1.charAt(i) !== s2.charAt(j)) {
                    continue;
                }
                s1Matches[i] = true;
                s2Matches[j] = true;
                matches++;
                break;
            }
        }

        if (matches === 0) {
            return 0;
        }

        // transpositions
        let k = 0;
        for (let i = 0; i < s1Len; i++) {
            if (!s1Matches[i]) { continue; }
            while (!s2Matches[k]) {
                k++;
            }
            if (s1.charAt(i) !== s2.charAt(k)) {
                transpositions++;
            }
        }

        let retVal = (
            (matches / s1Len)
            + (matches / s2Len)
            + ((matches - transpositions / 2.0) / matches))
            / 3.0;

        console.log(s1, 'vs', s2, '=', retVal);


        return retVal;

    }
}