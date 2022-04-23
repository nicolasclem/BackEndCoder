class User{
    constructor (name,surname,nameBook,authorBook,pets){
        this.name=name;
        this.surname=surname
        this.books=[{name:nameBook , author:authorBook}];
        this.pets=[pets]


    }

    getFullName() {
        const fullName=`${this.name} ${this.surname}`
        console.log( `nombre completo  : ${fullName}`);
    }

    addMascota(mascota){
        this.pets.push(mascota);
        console.log("se agrego una mascota!!!");
        console.log(this.pets);
    }

    countMascotas(){
        
        const countPets= this.pets.length
        console.log(`la cantidad de mascotas  es :  ${countPets}`);

    }

    addBooks(nombre,autor){
        const newBook={name:nombre,author:autor}
        this.books.push( newBook)
        console.log(`se agrego  el libro:  ${newBook.name}`  );

    }
    getBooksName(){
        const nameBooks=this.books.map(el=>{
           return el.name
        })
        console.log(nameBooks);

        console.log(`los libros disponibles  : ${nameBooks}`);
    }

}

const usuarioUno= new User('bauti','clem','V de vendetta','Alan Moore','yoda')


usuarioUno.getFullName()
usuarioUno.addMascota('Akira')
usuarioUno.countMascotas()
usuarioUno.addBooks('Metabarons','Alejandro Jodorowsky')
usuarioUno.getBooksName()