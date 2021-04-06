export class User {
    Devices: any;
    Favorites: Array<number>;

    constructor(){
        this.Devices = {Tv: Array<any>()};
        this.Favorites = Array<number>();
    }
}