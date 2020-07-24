class Tire {
    private id: number;
    private name: string;
    private coe_fri: number;     // coeficiente de fricção
    private ang_esc: number;     // ângulo de escorregamento ou deriva
    private esc_lon: number;     // escorregamento longitudinal
    private coe_rig_lat: number; // coeficiente de rigidez lateral
    private coe_rig_lon: number; // coeficiente de rigidez longitudinal
    private coe_rig_res: number; // coeficiente de rigidez da resistência ao rolamento
    private for_nor: number;     // força normal
    private fat_pic: number;     // fator de pico
    private re: boolean;     // verdadeiro se o pneu gira para trás e falso se o pneu gira para frente
  
    constructor(name: string) {
        this.name = name;
    }
    
    greet() {
        return "Hello, welcome to " + this.name;
    }

    // Força longitudinal no Modelo de Fiala
    forcaLongitudinal(){
        let resp: number; // variavel auxiliar para resposta 
        if (this.esc_lon < Math.abs((this.coe_fri*this.for_nor)/2*this.coe_rig_lon)){
            resp = (-1)*this.coe_rig_lon*this.esc_lon;
        } else {
            if (this.esc_lon>0) {
                resp = (-1)*(this.coe_fri*this.for_nor - Math.abs((this.coe_fri*this.for_nor)**2/4*Math.abs(this.esc_lon)*this.coe_rig_lon));
            } else if (this.esc_lon<0){
                resp = this.coe_fri*this.for_nor - Math.abs((this.coe_fri*this.for_nor)**2/4*Math.abs(this.esc_lon)*this.coe_rig_lon);
            } else {
                resp = 0;
            }
        }
        return resp;
    }

    // Força lateral no Modelo de Fiala
    forcaLateral(){
        let resp: number; // variavel auxiliar para resposta 
        if (this.ang_esc <= Math.atan(3*this.coe_fri*this.for_nor/this.coe_rig_lat)){
            resp = (-1)*this.coe_fri*this.for_nor*(1-this.helper_h()**3);
        } else {
            if (this.ang_esc>0) {
                resp = (-1)*(this.coe_fri*Math.abs(this.for_nor));
            } else if (this.ang_esc<0){
                resp = this.coe_fri*Math.abs(this.for_nor);
            } else {
                resp = 0;
            }
        }
        return resp;
    }

    // Momento autoalinhante no Modelo de Fiala
    momentoAutoalinhante(){
        let resp: number; // variavel auxiliar para resposta 
        if (this.ang_esc <= Math.atan(3*this.coe_fri*this.for_nor/this.coe_rig_lat)){
            if (this.ang_esc>0) {
                resp = this.coe_fri*this.for_nor*this.fat_pic*(1-this.helper_h())*this.helper_h()**3;
            } else if (this.ang_esc<0){
                resp = (-1)*this.coe_fri*this.for_nor*this.fat_pic*(1-this.helper_h())*this.helper_h()**3;
            } else {
                resp = 0;
            }
        } else {
            resp = 0;
        }
        return resp;
    }

    // Momento da resistência ao rolamento no Modelo de Fiala
    momentoResistenciaRolamento(){
        let resp: number; // variavel auxiliar para resposta 
        if (this.re){
            resp = this.coe_rig_res*this.for_nor;
        } else {
            resp = (-1)*this.coe_rig_res*this.for_nor;
        }
    }

    // Função que agrega um pedaço da equação bastante utilizado no modelo Fiala
    helper_h(){
        return 1-(this.coe_rig_lat*Math.abs(this.ang_esc)/3*this.coe_fri*Math.abs(this.for_nor));
    }
  }