class Device {
    Name: string;
    Protocol: number;
    Addres: number;

    constructor(){
        this.Name = "";
        this.Protocol = 0;
        this.Addres = 0;
    }
}

export class Tv extends Device{
    OnOff: number;
	VolUp   : number;
	VolDown : number;
	ChaUp   : number;
	ChaDown : number;
	Numbers : Array<number>;

    constructor() {
        super();
        this.OnOff = 0;
        this.VolUp = 0;
        this.VolDown = 0;
        this.ChaUp = 0;
        this.ChaDown = 0;
        this.Numbers = [];
    }
}

export class MediaPlayer extends Device{
	OnOff: number;
	VolUp: number;
	VolDown: number;
	Play: number;
	Stop: number;
	SkipR: number;
	SkipL: number;
	Eject: number;

    constructor() {
        super();
        this.OnOff = 0;
        this.VolUp = 0;
        this.VolDown = 0;
        this.Play = 0;
        this.Stop = 0;
        this.SkipR = 0;
        this.SkipL = 0;
        this.Eject = 0;
    }
}