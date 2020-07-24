class Track {
    id: number;
    name: string;
    air_density: number;
    type: boolean; // open=1 or closed=0
    lap_time: number;
    sectors: Sector[];
  
    constructor(name: string) {
      this.name = name;
    }
  
    greet() {
      return "Hello, welcome to " + this.name;
    }
  }