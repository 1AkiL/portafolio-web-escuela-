const contdatos = document.getElementById('datospokemon');
async function ObtenerPokemon(){
    try{
        //Se recuperan los datos de los pokémon, se llega hasta 12 para alcanzar a mostrar 4 lineas evolutivas completas
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
        const datos = await respuesta.json();
        console.log(datos.results);
        dibujarCajas(datos.results);
    }
    catch (error){
        console.error("Hubo un error al conectar con la API: ",error);
    }
}
async function dibujarCajas(poke){
    contdatos.innerHTML = "";

    //Se hace de esta forma debido a que si se usa forEach, se tiene que hacer asincrona, lo que hace que los datos
    //puedan llegar revueltos.
    for (const pokemon of poke) {

        //Esto se hace para recuperar los datos completos de cada Pokémon, como lo es la imagen.
        const infoExtra = await fetch(pokemon.url);
        const datosCompletos = await infoExtra.json();
        //Va a dibujar el contenido de las cajas que contienen los datos de los Pokémon. 
        //Por algun motivo la PokeAPI almacena los pesos en hectogramos, asi que se convierten a kilogramos
        //Al convertirlo, el peso de Caterpie salia medio mal, por eso se usa .toFixed()
        //Todos los nombres estan en minúsculas, por lo que se hace que la primera letra sea mayúscula 
        let name=datosCompletos.name;
        let fLetterUpName=name.charAt(0).toUpperCase() + name.slice(1);
        //La habilidad también esta en minúscula
        let abiName=datosCompletos.abilities[0].ability.name;
        let fLetterUpAName=abiName.charAt(0).toUpperCase()+abiName.slice(1);
        const cajaHTML = `
            <section class="pokemon" data-id="${datosCompletos.id}">
                <section class="basicInfo">
                    <h3>Entrada de Pokedex: ${datosCompletos.id}</h3>
                    <h2>Nombre: ${fLetterUpName}</h2>
                    <figure>
                        <img class="picture" src="${datosCompletos.sprites.other.home.front_default}" alt=${datosCompletos.name}>
                    </figure>
                </section>
                <section class="specificInfo">
                    <section class="stats">
                        <h3>Estadisticas base</h3>
                        <h3>Puntos de Salud: ${datosCompletos.stats[0].base_stat}</h3>
                        <h3>Ataque: ${datosCompletos.stats[1].base_stat}</h3>
                        <h3>Defensa: ${datosCompletos.stats[2].base_stat}</h3>
                        <h3>Ataque especial: ${datosCompletos.stats[3].base_stat}</h3>
                        <h3>Defensa especial: ${datosCompletos.stats[4].base_stat}</h3>
                        <h3> Velocidad: ${datosCompletos.stats[5].base_stat}</h3>
                    </section>
                    <section class="habilidades">
                        <h3> Habilidad: ${fLetterUpAName}</h3>
                    </section>
                    <h3>Peso: ${(datosCompletos.weight*0.1).toFixed(1)}kg</h3> 
                </section>
            </section>
        `;
        contdatos.innerHTML += cajaHTML;
    }
}
ObtenerPokemon();
