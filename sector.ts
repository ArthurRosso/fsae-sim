class Sector {
    id: number;
    name: string;
    initial_speed: number;
    final_speed: number;
    time: number;
    next: Sector;
  
    constructor(name: string) {
      this.name = name;
    }
  
    greet() {
      return "Hello, welcome to " + this.name;
    }
  }