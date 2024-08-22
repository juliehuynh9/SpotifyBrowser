//TODO: install the chroma module
import * as chroma from 'chroma-js';

export class TrackFeature {
    static FeatureTypes = ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence'];

    id: string;
    name:string;
    percent:number;

    constructor(feature:string, percent:number) {
        this.id = "";
        this.name = feature;
        this.percent = percent;
    }

    get percentageString() {
        return (this.percent*100).toFixed() + '%';
    }

    get color() {
        // return "";
        //TODO: uncomment to return custom chroma mix based on percent
        return chroma.mix('red', 'green', this.percent, 'hsl').hex();
    }
}
