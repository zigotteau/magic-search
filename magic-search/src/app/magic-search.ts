
import { JaroDistance } from './algo/jaro-distance.js';

import * as levenshtien from '../../node_modules/damerau-levenshtein';

interface LevenshteinResponse {
    steps: number;
    relative: number;
    similarity: number;
}

export class MagicSearch {

    public static TooCommonWords = /^(l|le|la|les|du|de|des|d|a|à)$/; // (french)
    private cleanDictionary: string[] = null;

    public static cleanString(stringToClean: string): string {
        // - toLower()
        // - remove special chars or replace them with space
        // - remove diacritics (french)
        // - merge stapces
        // - add space at begin and end (for keywords search)
        return (' ' + stringToClean.toLowerCase()
            .replace(/\-|[−':"\+\/]/g, ' ')
            .replace(/[\(\)\.]/g, '') + '')
            .replace(/[éèêë]/g, 'e')
            .replace(/[àâ]/g, 'a')
            .replace(/[îï]/g, 'i')
            .replace(/[ô]/g, 'o')
            .replace(/[ûù]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/\s\s+/g, ' ')
            + ' ';
    }

    public setDictionary(dictionary: string[]) {
        const dictionaryLen = dictionary.length;

        // clearn dictionary (diacritics, ...)
        this.cleanDictionary = new Array<string>(dictionaryLen);
        for (let index = 0; index < dictionary.length; index++) {
            this.cleanDictionary[index] = MagicSearch.cleanString(dictionary[index]);
        }
    }

    public doSearch(search: string): { scores: number[], scoreMax: number, nbMatches: number } {

        if (!this.cleanDictionary) {
            console.error('MagicSearch: dictionary not set!');
            return null;
        }

        if (!search) {
            console.error('MagicSearch: search cannot be null!');
            return null;
        }

        // init results
        let maxScore = 0;
        let nbMatches = 0;
        const dictionaryLen = this.cleanDictionary.length;
        let scores = new Array<number>(dictionaryLen);
        let matches = new Array<boolean>(dictionaryLen);
        for (let index = 0; index < dictionaryLen; index++) {
            scores[index] = 0;
            matches[index] = false;
        }

        // clearn search (diacritics, ...)
        search = MagicSearch.cleanString(search);

        // tokenize search
        const searchTokens = search.trim().split(' ');

        // browse search tokens
        for (const searchToken of searchTokens) {
            // remove most common plural: 's' and 'x'
            const searchTokenWithoutS = (searchToken.endsWith('s') || searchToken.endsWith('x')) ? searchToken.slice(0, searchToken.length - 1) : searchToken;
            for (let entryIndex = 0; entryIndex < dictionaryLen; entryIndex++) {

                let jaroToDelete = JaroDistance.jaro(searchToken, this.cleanDictionary[entryIndex]);

                // token found in entry
                if (this.cleanDictionary[entryIndex].includes(searchTokenWithoutS)) {

                    if (!searchToken.match(MagicSearch.TooCommonWords)) {
                        // token matches entire word
                        if (this.cleanDictionary[entryIndex].includes(' ' + searchToken + ' ')) {
                            scores[entryIndex] += 6;
                            // token matches begin of word
                        } else if (this.cleanDictionary[entryIndex].includes(' ' + searchToken)) {
                            scores[entryIndex] += 4;
                            // token matches center part of word
                        } else {
                            scores[entryIndex] += 2;
                        }
                    }
                    // search for similar word
                } else {
                    // let jaroSimilarity = JaroDistance.jaro(searchToken, this.cleanDictionary[entryIndex]);
                    // console.log('jaro for (', searchToken, ',', this.cleanDictionary[entryIndex], ') :', jaroSimilarity);
                    let lev: LevenshteinResponse = levenshtien('searchToken', this.cleanDictionary[entryIndex]);
                    console.log('Levenshtein for (', searchToken, ',', this.cleanDictionary[entryIndex], ') :', lev.similarity);

                    if (lev.similarity >= 0.75) {
                        scores[entryIndex] += 2;
                    }
                }
            }
        }
        return { scores, scoreMax: maxScore, nbMatches };
    }

}

