const greet = (name) => {
  console.log(`hi ${name}`);
};

const pi = 3.14;

class User {
    constructor(name,email){
        this.name = name;
        this.email=email;
    }
    greet(){
        console.log(`hi ${name}`)
    }
}
module.exports = { greet, pi ,User};
