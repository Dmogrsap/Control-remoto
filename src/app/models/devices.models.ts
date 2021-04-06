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

export class PowerOnDate extends Tv {
    Channel: number = 0;
    Date: string = "";

    constructor(data: Tv, date: string, channel: number) {
        super();
        this.Protocol = data.Protocol;
        this.Addres = data.Addres;
        this.OnOff = data.OnOff;

        if (channel != 0) {
            this.Channel = channel;
            this.Numbers = data.Numbers;
        }
        
        this.Date = date;
    }
}

export class Fav extends Tv {
    Channel: number;

    constructor(data: Tv, chann: number) {
        super();
        this.Numbers = data.Numbers;
        this.Addres = data.Addres;
        this.Protocol = data.Protocol;
        this.Channel = chann;
    }
}