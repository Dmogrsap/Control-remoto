export class User {
    Devices: any;
    Favorites: any;

    constructor(){
        this.Devices = {Tv: Array<any>()};
        this.Favorites = Array<number>();
    }
}