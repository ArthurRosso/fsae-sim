class Tire {
    private id: number;
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    greet() {
        return "Hello, welcome to " + this.name;
    }
    
  }