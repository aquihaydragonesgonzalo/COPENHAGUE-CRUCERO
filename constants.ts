import { Coordinate, ItineraryItem, AudioTrack, WalkingPOI, DanishWord } from './types';

export const SHIP_DEPARTURE_TIME = "18:00";
export const SHIP_ONBOARD_TIME = "17:30";
export const STORAGE_KEY = 'cph_guide_final_v21_shuttle_fix'; 

export const COORDS: Record<string, Coordinate> = {
    OCEANKAJ: { lat: 55.7161, lng: 12.6015 },
    OSTERPORT: { lat: 55.6924, lng: 12.5873 },
    SIRENITA: { lat: 55.69286, lng: 12.59928 },
    KASTELLET: { lat: 55.69116, lng: 12.59422 },
    NYHAVN: { lat: 55.67954, lng: 12.59103 },
    AMALIENBORG: { lat: 55.68406, lng: 12.59303 },
    STROGET_CENTER: { lat: 55.6793, lng: 12.5760 },
    RUNDETAARN: { lat: 55.68136, lng: 12.57572 },
    ROSENBORG: { lat: 55.68598, lng: 12.57748 },
    NORREPORT: { lat: 55.6833, lng: 12.5715 },
    METRO_GAMMEL_STRAND: { lat: 55.677595, lng: 12.578928 },
    NYHAVN_ANCHOR: { lat: 55.680386, lng: 12.589195 },
    ROSENBORG_CASTLE: { lat: 55.685716, lng: 12.57741 },
    METRO_ORIENTKAJ: { lat: 55.711837, lng: 12.595177 },
    METRO_OSTERPORT: { lat: 55.692879, lng: 12.58592 },
    METRO_NORREPORT: { lat: 55.683847, lng: 12.572762 },
    METRO_MARMORKIRKEN: { lat: 55.685127, lng: 12.58903 },
    SALIDA_JARDINES: { lat: 55.684887, lng: 12.582509 },
    ENTRADA_JARDINES: { lat: 55.686845, lng: 12.577232 }
};

export const AUDIO_PLAYLISTS: Record<string, AudioTrack[]> = {
    '3': [
        {
            title: "Intro: Bienvenidos a København",
            text: "¡Velkommen! Soy tu guía virtual. Hoy vamos a caminar por la historia de la monarquía danesa, cuentos de hadas y arquitectura renacentista. Prepárate para descubrir por qué los daneses son considerados una de las sociedades más felices del mundo. ¡Empezamos!"
        },
        {
            title: "Pista 1: Den Lille Havfrue (La Sirenita)",
            text: "Caminamos por el muelle de Langelinie, un largo paseo marítimo que es la puerta de entrada al puerto de Copenhague. Al final, encontrarán la escultura de bronce más famosa de Dinamarca, aunque a menudo sorprende a los visitantes por su tamaño modesto.\n\nHistoria y Datos Curiosos:\n\nInspiración Literaria: La estatua fue creada por el escultor danés Edvard Eriksen e inaugurada el 23 de agosto de 1913. Está inspirada en el cuento de hadas de Hans Christian Andersen de 1837 sobre una sirena que renuncia a su vida en el mar por amor.\n\nEl Mecenas: La obra fue un regalo a la ciudad de Copenhague de parte de Carl Jacobsen, el hijo del fundador de la cervecería Carlsberg, quien quedó profundamente conmovido por una adaptación de ballet del cuento en el Teatro Real Danés.\n\nLos Modelos: La cabeza de la estatua fue modelada a partir de la famosa bailarina danesa Ellen Price, pero debido a que ella se negó a posar desnuda, el cuerpo fue modelado a partir de la esposa de Eriksen, Eline Eriksen.\n\nTamaño: Prepárense: la estatua es sorprendentemente pequeña. Mide solo 1.25 metros de altura y pesa 175 kg. Su modestia es parte de su encanto y su fama mundial.\n\nUna Vida Turbulentísima:\nA pesar de su apariencia serena, La Sirenita ha tenido una vida muy agitada y se ha convertido en un blanco frecuente de vandalismo y protestas políticas a lo largo de los años. Ha sido:\n- Decapitada dos veces (en 1964 y 1998).\n- Arrojada al agua de su roca base en 2003 usando explosivos.\n- Cubierta de pintura en múltiples ocasiones.\n\nConsejo: La mejor hora para visitarla es temprano por la mañana o al final de la tarde para evitar multitudes."
        },
        {
            title: "Pista 2: Kastellet (La Ciudadela)",
            text: "Justo detrás de La Sirenita y al entrar en el Churchillparken, nos encontramos con la magnífica y aún operativa fortificación de Kastellet. Es una de las fortalezas mejor conservadas del norte de Europa.\n\nUn Diseño de Estrella:\nKastellet fue construido en el siglo XVII y tiene la inconfundible forma de una estrella de cinco puntas o pentágono, rodeada de un foso. Fue una extensión de la muralla defensiva iniciada por el rey Cristián IV.\n\nUso Actual:\nAunque hoy es un hermoso parque público, Kastellet sigue siendo una base militar activa. Aún se puede ver a los militares en servicio.\n\nPuntos Destacados:\n\n1. Las Puertas: La Puerta del Rey y la Puerta de Noruega son ejemplos del barroco holandés.\n2. El Molino de Viento: De 1847, utilizado para moler grano para la guarnición.\n3. La Iglesia de la Ciudadela: Construida en 1703, solía tener aberturas de sonido a la cárcel contigua para los prisioneros.\n4. El Foso: Un lugar maravilloso para un paseo tranquilo.\n\nEn Churchillparken también encontrarán la Iglesia Anglicana de St. Alban y la impresionante Fuente de Gefion."
        }
    ],
    '4': [
        {
            title: "Nyhavn: El Puerto Nuevo",
            text: "Probablemente, esta es la imagen que tienes en tu cabeza cuando piensas en Copenhague. Casas de colores brillantes, barcos de madera y mucho ambiente.\n\nHistoria canalla:\nAunque hoy es \"chic\" y caro, históricamente era el barrio de los marineros, lleno de tabernas, prostitución y peleas.\n\nEl vecino famoso:\nBusca las casas número 18, 20 y 67. Hans Christian Andersen vivió en todas ellas en diferentes momentos de su vida. Fue aquí donde escribió sus primeros cuentos.\n\nConsejo de guía:\nEs el lugar perfecto para una pausa, pero los restaurantes aquí son \"trampas para turistas\". Mejor compra una cerveza o un helado en un kiosco y siéntate en el borde del canal con los pies colgando, como hacen los locales. ¡Eso es Hygge!"
        }
    ],
    '5': [
        {
            title: "1. Contrastes de la Bahía",
            text: "¡Bienvenido a bordo! Estás a punto de ver Copenhague desde su mejor ángulo. Dicen que esta ciudad se construyó para ser vista desde el agua.\n\nAl salir del canal estrecho al puerto principal, el espacio se abre. A tu izquierda (normalmente) verás el contraste brutal entre lo antiguo y lo ultra-moderno.\n\nLa Ópera:\nEse edificio enorme con un techo voladizo gigantesco es la Ópera de Copenhague. Es una de las más caras del mundo, forrada con piedra caliza del sur de Alemania y un vestíbulo decorado con pan de oro.\n\nSkuespilhuset (El Teatro Real):\nUn edificio de ladrillo oscuro y cristal que parece flotar sobre el agua. Por la noche, sus luces verdes bajo el muelle atraen a los peces."
        },
        {
            title: "2. Christianshavn: La Pequeña Ámsterdam",
            text: "El barco cruzará hacia la otra orilla, entrando en los canales de Christianshavn. Aquí la atmósfera cambia. Verás casas flotantes donde la gente vive todo el año (fíjate en sus macetas y bicicletas).\n\nBusca la Espiral:\nMira hacia arriba e intenta localizar una torre con una escalera de caracol dorada por fuera. Es la Iglesia de Nuestro Salvador (Vor Frelsers Kirke). Si te fijas bien, ¡verás gente pequeña subiendo por fuera de la torre!"
        },
        {
            title: "3. ¡Cuidado con la cabeza!",
            text: "Esta es la parte divertida. Entraremos en canales estrechos con puentes muy, muy bajos.\n\nEl desafío:\nEl guía te gritará \"¡Agachen la cabeza!\". No es broma. Algunos puentes son tan bajos que si estás de pie, no lo cuentas. Tocar el techo de los puentes trae buena suerte (o eso dicen los turistas), pero hazlo con cuidado."
        },
        {
            title: "4. El Diamante Negro",
            text: "De vuelta al puerto principal, verás un edificio negro, inclinado y brillante hecho de granito de Zimbabue y cristal ahumado. Es la Biblioteca Real.\n\nEl detalle:\nSe llama \"Diamante Negro\" porque, cuando el sol golpea el agua y se refleja en la fachada inclinada, el edificio brilla como una joya oscura. Es una obra maestra de la arquitectura danesa moderna."
        },
        {
            title: "5. Leyendas y Consejos",
            text: "Pasarás cerca del Parlamento (Christiansborg). Fíjate en la estatua bajo el agua de un hombre y sus hijos (Agnete y el Tritón), una leyenda danesa más triste y menos conocida que la Sirenita, que a veces se ve si el agua está tranquila cerca del puente Højbro.\n\nConsejo de tu guía:\nSi tienes opción, intenta sentarte en el lado derecho del barco para tener las mejores vistas al salir, o en la parte trasera descubierta si no llueve, para sacar fotos sin el reflejo de los cristales. ¡Disfruta del paseo!"
        }
    ],
    '6': [
        {
            title: "Pista 1: El Hogar de la Familia Real",
            text: "Miren a su alrededor: no estamos frente a un solo palacio, sino frente a cuatro palacios idénticos que rodean un patio octogonal central.\n\nAmalienborg es la residencia de invierno de la Familia Real danesa, aunque en la práctica, es su hogar la mayor parte del año. Cada uno de estos edificios fue diseñado originalmente para familias nobles de alto rango.\n\nEl giro del destino: En 1794, el Palacio de Christiansborg (la antigua residencia real) se quemó. La familia real, sin un lugar donde vivir, compró rápidamente estos cuatro palacios para convertirlos en su nuevo hogar, y así fue como Amalienborg se convirtió en el centro del poder danés.\n\nEl Centro: Federico V\nEn el centro del patio se alza la imponente estatua ecuestre de Federico V, el rey que ordenó la construcción de todo este distrito. La estatua, realizada por el famoso escultor francés J. F. J. Saly, es considerada una de las mejores del mundo. Fíjense en el equilibrio y la elegancia que transmite."
        },
        {
            title: "Pista 2: El Relevo de la Guardia",
            text: "Amalienborg es mundialmente famoso por su ceremonia diaria del Cambio de la Guardia Real (Vagtparaden).\n\nLa Marcha:\nLos Guardias Reales, conocidos como Den Kongelige Livgarde, salen marchando desde su cuartel cerca del Castillo de Rosenborg (nuestra primera parada) a las 11:30 de la mañana.\n\nLa Ceremonia:\nLlegan a la plaza de Amalienborg exactamente a las 12:00 del mediodía para realizar la ceremonia oficial del relevo.\n\nAviso Musical:\nSi ven la bandera del Monarca ondeando sobre uno de los palacios, significa que el Rey o la Reina están en casa. Y si están en casa, la ceremonia es la más grande y viene acompañada por la banda de música de la Guardia Real, ¡un espectáculo que no se pueden perder!"
        },
        {
            title: "Pista 3: Marmorkirken (Iglesia de Mármol)",
            text: "Ahora, den la espalda a la plaza de Amalienborg y miren por la calle Frederiksgade. La vista está perfectamente alineada con una maravilla arquitectónica: la Marmorkirken (La Iglesia de Mármol).\n\nSu nombre oficial es la Iglesia de Federico (Frederiks Kirke), y fue concebida para ser la majestuosa culminación de todo el barrio de Frederiksstaden.\n\nUn Proyecto Gigante:\nLa iglesia se empezó a construir in 1749, pero el proyecto original era tan ambicioso, y requería tanto mármol noruego costoso, que el dinero se agotó. Tras años de parón, la obra quedó abandonada y en ruinas durante más de un siglo.\n\nEl Milagro Financiero:\nFinalmente, un adinerado banquero danés, C.F. Tietgen, compró la ruina en 1874 y financió su finalización. La iglesia se inauguró en 1894, ¡145 años después de que se pusiera la primera piedra!\n\nEl Mayor Domo de Escandinavia:\nAl entrar, levanten la vista. Están bajo el domo de iglesia más grande de Escandinavia, con un diámetro de 31 metros. Está inspirado en la Basílica de San Pedro en Roma.\n\nConsejo: En verano, a menudo se puede subir a la cúpula para disfrutar de una vista espectacular."
        }
    ],
    '7': [
        {
            title: "Pista 1: Kongens Nytorv",
            text: "Llegamos al final de nuestra caminata y el espacio se abre de repente. Estamos en Kongens Nytorv, que irónicamente significa \"La Nueva Plaza del Rey\", aunque fue construida en 1670. Es la plaza más grande de la ciudad.\n\n\"Hesten\" (El Caballo):\nAsí llaman los locales a la estatua del Rey Christian V en el centro. Si se fijan bien, el rey está vestido como un emperador romano, pisoteando a una figura que representa la envidia.\n\nTradición estudiantil:\nSi visitan la ciudad en junio, verán camiones llenos de estudiantes recién graduados con gorras blancas dando vueltas alrededor de esta estatua, gritando y celebrando. ¡Es un rito de paso danés!\n\nEl Lujo:\nA un lado, el Hotel D'Angleterre, donde se alojó Michael Jackson. Al otro, Magasin du Nord, la tienda por departamentos más famosa. Dato curioso: Hans Christian Andersen vivió allí en una pequeña habitación en el ático antes de ser famoso."
        },
        {
            title: "Pista 2: Strøget, la arteria",
            text: "Desde la plaza, entramos directamente en Strøget. No es \"una calle\", sino una colección de cinco calles conectadas (1,1 km).\n\nHistoria:\nCuando se hizo peatonal en 1962, la gente protestó: \"¡No somos italianos! ¡Los daneses no nos quedamos parados en la calle!\". Hoy es el lugar más vivo de la ciudad.\n\nEstructura:\nEmpezamos por la parte \"cara\" (marcas de lujo como Prada) y, a medida que avanzamos hacia el Ayuntamiento, las tiendas se vuelven más accesibles (H&M, Zara, souvenirs)."
        },
        {
            title: "Pista 3: La Fuente de las Cigüeñas",
            text: "Caminemos hasta la plaza Amagertorv. Aquí está el punto de encuentro número uno: la Fuente de las Cigüeñas (Storkespringvandet).\n\nEl debate de las aves:\nDurante años se debatió si eran garzas o cigüeñas. Al final, se confirmó: son cigüeñas.\n\nEl baile de las comadronas:\nCuando las estudiantes de partería se gradúan, vienen aquí a bailar alrededor de la fuente cogidas de la mano.\n\nDiseño Danés:\nAquí tienen Illums Bolighus y Royal Copenhagen. Es como un museo donde todo está a la venta."
        },
        {
            title: "Pista 4: Despedida y Recomendación",
            text: "Aquí termina nuestro recorrido guiado.\n\nRecomendación:\nEstán en el lugar perfecto para perderse. Cómprense un hot dog rojo (pølse) en uno de los puestos callejeros de la plaza, siéntense en el borde de la Fuente de las Cigüeñas y simplemente observen pasar la vida de Copenhague.\n\n¡Ha sido un placer ser su guía! Nyd din dag! (¡Disfruten su día!)"
        }
    ],
    '8': [
        {
            title: "La Torre Redonda y su Enigma",
            text: "Ese edificio cilíndrico de ladrillo que ves es el observatorio en funcionamiento más antiguo de Europa, construido por el rey Christian IV en el siglo XVII. Nos adentramos en el bullicioso Barrio Latino de Copenhague.\n\nAntes de entrar, miren la fachada. ¿Ven esas letras doradas y símbolos extraños en la parte superior? Es un jeroglífico (rebus) diseñado por el propio rey. Básicamente dice: \"Que Dios guíe la justicia en el corazón del Rey Christian IV\". ¡Al rey le encantaba dejar su firma en todas partes!"
        },
        {
            title: "El Secreto de la Rampa",
            text: "Si decides entrar (necesitas ticket), no encontrarás escaleras. Tiene una rampa en espiral de 209 metros.\n\n¿Por qué una rampa? La leyenda dice que era para que el Rey pudiera subir en su carruaje, o para mover equipamiento astronómico pesado con caballos hasta la cima. Desde arriba, las vistas de los tejados naranjas de Copenhague son preciosas."
        },
        {
            title: "La Cima: Copenhague a sus pies",
            text: "Al final de la rampa, tenemos que subir una escalera de caracol muy estrecha y de madera para salir a la plataforma de observación.\n\nDesde aquí tenemos una vista de 360 grados de los tejados rojos de Copenhague.\n\nMiren hacia el este: Verán el puente de Øresund conectando con Suecia.\nMiren abajo: Las calles medievales serpentean como un laberinto.\n\nEsta no es la vista más alta de la ciudad, pero es, sin duda, la más encantadora. Es el mejor lugar para entender por qué a esta ciudad se la llama la \"ciudad de las agujas\"."
        }
    ],
    '9': [
        {
            title: "El Castillo y el Jardín",
            text: "Tu ruta te lleva ahora hacia un pulmón verde: Kongens Have (El Jardín del Rey). Al fondo, verás un castillo que parece sacado de una película de Disney, con ladrillo rojo y torres verdes de cobre.\n\nEs el Castillo de Rosenborg. Originalmente era la \"casa de verano\" de Christian IV (¡aunque está a solo 15 minutos andando de su palacio principal!)."
        },
        {
            title: "Joyas y Huertos",
            text: "El Tesoro:\nEn el sótano de este castillo se guardan, bajo fuertes medidas de seguridad, las Joyas de la Corona Danesa.\n\nDato curioso:\nChristian IV no diseñó este jardín solo para pasear, sino para cultivar frutas y verduras para la corte. ¡Literalmente era el huerto del rey!"
        },
        {
            title: "Vida Local en el Parque",
            text: "El Parque:\nEste es el jardín real más antiguo de Dinamarca. En verano, verás a cientos de daneses haciendo picnic aquí. Si hace sol, ¡únete a ellos!"
        }
    ]
};

export const WALKING_ROUTE_POIS: WalkingPOI[] = [
    { name: "CANAL TOURS", lat: 55.680537, lng: 12.58791 },
    { name: "LA SIRENITA", lat: 55.692863, lng: 12.599281 },
    { name: "Palacio Amalienborg", lat: 55.684, lng: 12.593211 },
    { name: "Palacio de Christiansborg", lat: 55.676193, lng: 12.580384 },
    { name: "Rundetårn", lat: 55.681384, lng: 12.575787 },
    { name: "Fuente Stork", lat: 55.678833, lng: 12.57958 },
    { name: "METRO Gammel Strand", lat: 55.677595, lng: 12.578928 },
    { name: "Nyhavn", lat: 55.680386, lng: 12.589195 },
    { name: "Castillo de Rosenborg", lat: 55.685716, lng: 12.57741 },
    { name: "METRO ORIENTKAJ", lat: 55.711837, lng: 12.595177 },
    { name: "METRO OSTERPORT", lat: 55.692879, lng: 12.58592 },
    { name: "METRO Norreport", lat: 55.683847, lng: 12.572762 },
    { name: "METRO Marmorkirken", lat: 55.685127, lng: 12.58903 },
    { name: "SALIDA JARDINES", lat: 55.684887, lng: 12.582509 },
    { name: "ENTRADA JARDINES", lat: 55.686845, lng: 12.577232 }
];

export const WALKING_TRACK_COORDS: [number, number][] = [
    [55.692725, 12.585948], [55.692601, 12.586188], [55.692398, 12.586597], [55.692104, 12.587243], [55.692136, 12.587297], 
    [55.692167, 12.587349], [55.69218, 12.587369], [55.692194, 12.587392], [55.692206, 12.587402], [55.691857, 12.588066], 
    [55.691737, 12.588173], [55.691747, 12.588187], [55.691767, 12.588215], [55.691715, 12.588273], [55.691657, 12.588353], 
    [55.691622, 12.588402], [55.691607, 12.588423], [55.691586, 12.588451], [55.691543, 12.588511], [55.691533, 12.588525], 
    [55.691589, 12.588595], [55.693317, 12.591436], [55.693578, 12.59186], [55.69399, 12.592451], [55.693984, 12.592463], 
    [55.693972, 12.592493], [55.694041, 12.592587], [55.694105, 12.592731], [55.694142, 12.592905], [55.694164, 12.5931], 
    [55.69415, 12.593277], [55.694102, 12.593453], [55.693894, 12.593959], [55.693689, 12.594422], [55.693537, 12.594792], 
    [55.693404, 12.595151], [55.693353, 12.595384], [55.693503, 12.595615], [55.693553, 12.595686], [55.693521, 12.595791], 
    [55.693517, 12.596472], [55.693566, 12.59669], [55.693583, 12.59684], [55.693609, 12.597019], [55.693625, 12.59722], 
    [55.693642, 12.597746], [55.69363, 12.597938], [55.693601, 12.598153], [55.693435, 12.598957], [55.693393, 12.599064], 
    [55.693358, 12.599092], [55.693317, 12.5991], [55.693262, 12.599086], [55.693212, 12.599042], [55.693179, 12.59894], 
    [55.693155, 12.59892], [55.692997, 12.598936], [55.692828, 12.598912], [55.692656, 12.598866], [55.692553, 12.598837], 
    [55.692365, 12.598792], [55.691929, 12.598688], [55.691809, 12.598668], [55.691738, 12.598686], [55.691736, 12.598652], 
    [55.691734, 12.5986], [55.691734, 12.598552], [55.691573, 12.59854], [55.691234, 12.598551], [55.691117, 12.598557], 
    [55.69103, 12.59856], [55.690486, 12.59857], [55.690383, 12.598566], [55.690241, 12.598518], [55.689621, 12.598196], 
    [55.689579, 12.598192], [55.689405, 12.598265], [55.689383, 12.598156], [55.689192, 12.597956], [55.689095, 12.597862], 
    [55.689055, 12.597843], [55.689036, 12.597618], [55.688962, 12.597625], [55.688916, 12.597359], [55.688877, 12.597276], 
    [55.688457, 12.596911], [55.688135, 12.596633], [55.68805, 12.596559], [55.687968, 12.596492], [55.687206, 12.595864], 
    [55.686484, 12.595274], [55.686391, 12.595195], [55.686015, 12.594877], [55.685805, 12.5947], [55.685642, 12.594562], 
    [55.68488, 12.593944], [55.684816, 12.593892], [55.684453, 12.593591], [55.684189, 12.593373], [55.684101, 12.593707], 
    [55.683907, 12.593546], [55.683721, 12.593391], [55.68381, 12.593055], [55.683491, 12.592791], [55.683409, 12.592719], 
    [55.683166, 12.592519], [55.683116, 12.59248], [55.682965, 12.592355], [55.68293, 12.592326], [55.682822, 12.592238], 
    [55.682726, 12.592159], [55.682606, 12.59206], [55.682464, 12.591943], [55.682387, 12.59188], [55.681714, 12.591313], 
    [55.681644, 12.591253], [55.681584, 12.591201], [55.681524, 12.591149], [55.681524, 12.591149], [55.681722, 12.590406], 
    [55.681631, 12.590421], [55.681509, 12.590308], [55.681387, 12.590196], [55.681159, 12.59], [55.681058, 12.589914], 
    [55.680613, 12.589457], [55.680386, 12.58917], [55.680694, 12.587999], [55.680707, 12.587946], [55.680742, 12.587815], 
    [55.680866, 12.587344], [55.6809, 12.587212], [55.680839, 12.587144], [55.680795, 12.586999], [55.680709, 12.586452], 
    [55.680751, 12.586425], [55.680824, 12.586332], [55.680856, 12.586252], [55.680873, 12.586178], [55.68088, 12.586098], 
    [55.680877, 12.586015], [55.680866, 12.585941], [55.680809, 12.585756], [55.680777, 12.585686], [55.680685, 12.585555], 
    [55.680631, 12.585503], [55.680584, 12.585471], [55.680483, 12.585429], [55.680379, 12.585431], [55.680339, 12.585159], 
    [55.680327, 12.585105], [55.680313, 12.585006], [55.68031, 12.584981], [55.680307, 12.584963], [55.680301, 12.584928], 
    [55.680288, 12.584852], [55.680281, 12.584814], [55.680156, 12.584153], [55.679977, 12.583471], [55.679859, 12.583115], 
    [55.679764, 12.582834], [55.679718, 12.58272], [55.679707, 12.582685], [55.679676, 12.582588], [55.679638, 12.582482], 
    [55.679594, 12.582366], [55.679423, 12.581872], [55.679265, 12.581259], [55.679142, 12.580618], [55.678977, 12.579699], 
    [55.678819, 12.579812], [55.678775, 12.579619], [55.678773, 12.579548], [55.67877, 12.579394], [55.678768, 12.579297], 
    [55.67876, 12.578887], [55.678829, 12.57877], [55.678734, 12.578089], [55.678662, 12.577629], [55.678649, 12.577286], 
    [55.678641, 12.576683], [55.67864, 12.576652], [55.678638, 12.576562], [55.678615, 12.576136], [55.678638, 12.576101], 
    [55.678672, 12.576053], [55.679381, 12.575033], [55.679668, 12.574588], [55.679935, 12.574869], [55.680325, 12.574406], 
    [55.680928, 12.575427], [55.681206, 12.575837], [55.681245, 12.575895], [55.681296, 12.575676], [55.681318, 12.575585], 
    [55.68137, 12.575374], [55.681411, 12.575233], [55.681622, 12.574884], [55.681706, 12.574794], [55.682183, 12.574496], 
    [55.682242, 12.574441], [55.682566, 12.574342], [55.682624, 12.574374], [55.682748, 12.574441], [55.6834, 12.57417], 
    [55.683476, 12.574093], [55.6837, 12.574412], [55.684097, 12.573517], [55.684297, 12.573801], [55.684409, 12.573703], 
    [55.684513, 12.573828], [55.684584, 12.57355], [55.684644, 12.573744], [55.684668, 12.573781], [55.684717, 12.573944], 
    [55.684743, 12.573999], [55.684789, 12.57421], [55.684804, 12.574254], [55.684834, 12.574307], [55.686001, 12.575955], 
    [55.686363, 12.576366], [55.686545, 12.576681], [55.686637, 12.576756], [55.686808, 12.577078], [55.686868, 12.577191], 
    [55.686663, 12.577523], [55.686589, 12.577788], [55.686436, 12.578157], [55.686078, 12.579019], [55.686028, 12.579139], 
    [55.685754, 12.579787], [55.685665, 12.579998], [55.685487, 12.580438], [55.685298, 12.580899], [55.685233, 12.581098], 
    [55.685177, 12.581229], [55.685094, 12.581609], [55.685029, 12.581962], [55.684958, 12.582229], [55.684887, 12.582506], 
    [55.684882, 12.582525], [55.684763, 12.582424], [55.68476, 12.582433], [55.684745, 12.582492], [55.684868, 12.5826], 
    [55.68486, 12.582626], [55.684515, 12.583866], [55.684456, 12.584082], [55.684223, 12.58492], [55.684108, 12.585314], 
    [55.684075, 12.585433], [55.684054, 12.585508], [55.683887, 12.586115], [55.683639, 12.587019], [55.683605, 12.587144], 
    [55.683668, 12.587197], [55.685246, 12.58854], [55.685215, 12.588669], [55.685168, 12.58863], [55.685115, 12.588835], 
    [55.68508, 12.588981], [55.685114, 12.589009]
];

export const INITIAL_ITINERARY: ItineraryItem[] = [
    {
        id: '0b', title: 'Desayuno Buffet', startTime: '07:15', endTime: '07:45',
        locationName: 'MSC Euribia', coords: COORDS.OCEANKAJ,
        description: 'Desayuno rápido en Marketplace Buffet.',
        keyDetails: 'Carga energía para el día.',
        priceDKK: 0, priceEUR: 0, type: 'food', completed: false
    },
    {
        id: '0', title: 'Llegada a Puerto', startTime: '08:00', endTime: '08:00',
        locationName: 'Oceankaj', coords: COORDS.OCEANKAJ,
        description: 'Maniobra de atraque completa.',
        keyDetails: 'El barco atraca en Oceankaj (Nordhavn).',
        priceDKK: 0, priceEUR: 0, type: 'logistics', completed: false
    },
    {
        id: '1', title: 'DESEMBARCO Y SHUTTLE', startTime: '08:00', endTime: '08:25',
        locationName: 'Muelle Oceankaj', endLocationName: 'Bus Stop',
        coords: COORDS.OCEANKAJ, endCoords: COORDS.OCEANKAJ,
        description: 'Desembarca y toma el SHUTTLE ELECTRICO o el Bus 164. Hasta la parada de Metro Orientkaj',
        keyDetails: '¡CRUCIAL! Domingo: Frecuencia de bus baja. Sé rápido.',
        priceDKK: 0, priceEUR: 0, type: 'transport', completed: false, notes: 'CRITICAL'
    },
    {
        id: '2', title: 'Metro M4: ORIENTKAJ → ØSTERPORT', startTime: '08:25', endTime: '08:45',
        locationName: 'Estación Orientkaj', endLocationName: 'Estación Østerport',
        coords: COORDS.OCEANKAJ, endCoords: COORDS.OSTERPORT,
        description: 'Toma el Metro M4 (Dirección København Syd). Son 2 paradas. COMPRAR BILLETE SENCILLO 1 ZONA.',
        keyDetails: 'Inicio del itinerario a pie al llegar a las estación de Osterport.',
        priceDKK: 24, priceEUR: 3.2, type: 'transport', completed: false,
        ticketUrl: 'https://www.copenhague.es/transporte/'
    },
    {
        id: '3', title: 'La Sirenita y Kastellet', startTime: '08:45', endTime: '09:45',
        locationName: 'Østerport', endLocationName: 'La Sirenita',
        coords: COORDS.OSTERPORT, endCoords: COORDS.SIRENITA,
        description: 'El icono de Copenhague y la ciudadela militar.',
        keyDetails: 'Foto: No te subas a la roca si está mojada. Cuidado con la multitud.',
        priceDKK: 0, priceEUR: 0, type: 'sightseeing', completed: false,
        googleMapsUrl: 'https://maps.app.goo.gl/6Lg1wpRueLWpruYe7',
        instaTag: 'https://www.instagram.com/explore/tags/denlillehavfrue/'
    },
    {
        id: '4', title: 'Caminata hacia Nyhavn', startTime: '09:45', endTime: '10:00',
        locationName: 'Kastellet', endLocationName: 'Nyhavn',
        coords: COORDS.KASTELLET, endCoords: COORDS.NYHAVN,
        description: 'Paseo escénico bordeando el agua.',
        keyDetails: 'Disfruta de la arquitectura del puerto.',
        priceDKK: 0, priceEUR: 0, type: 'logistics', completed: false,
        googleMapsUrl: 'https://maps.app.goo.gl/Y1SyUi5XBrHapwNTA',
        instaTag: 'https://www.instagram.com/explore/locations/445732214/nyhavn/'
    },
    {
        id: '5', title: 'Paseo por los Canales en Barco', startTime: '10:00', endTime: '11:15',
        locationName: 'Nyhavn', coords: COORDS.NYHAVN,
        description: 'Recorrido en barco por los canales (Stromma o Netto-Bådene).',
        keyDetails: 'Vistas únicas desde el agua. Relax total.',
        priceDKK: 112, priceEUR: 15, type: 'sightseeing', completed: false,
        ticketUrl: 'https://www.stromma.com/en-dk/copenhagen/sightseeing/sightseeing-by-boat/grand-tour/',
        instaTag: 'https://www.instagram.com/explore/tags/nyhavn/'
    },
    {
        id: '6', title: 'Palacio de Amalienborg', startTime: '11:40', endTime: '12:30',
        locationName: 'Amalienborg', coords: COORDS.AMALIENBORG,
        description: 'Residencia real y cambio de guardia.',
        keyDetails: 'Cambio de Guardia a las 12:00 en punto. Llega antes.',
        priceDKK: 0, priceEUR: 0, type: 'sightseeing', completed: false,
        googleMapsUrl: 'https://maps.app.goo.gl/iuBTxmtgXZQQwrdp6',
        instaTag: 'https://www.instagram.com/explore/tags/amalienborg/'
    },
    {
        id: '7', title: 'Strøget / Almuerzo Danés', startTime: '12:30', endTime: '14:00',
        locationName: 'Strøget', coords: COORDS.STROGET_CENTER,
        description: 'Comida típica (Smørrebrød) y paseo por la calle peatonal.',
        keyDetails: 'Prueba un Hot Dog danés si quieres ahorrar.',
        priceDKK: 250, priceEUR: 33, type: 'food', completed: false,
        googleMapsUrl: 'https://maps.app.goo.gl/4CPoQc6Pn9oB1MWZ6',
        instaTag: 'https://www.instagram.com/explore/tags/strøget/'
    },
    {
        id: '8', title: 'Torre Redonda (Rundetaarn)', startTime: '14:00', endTime: '15:30',
        locationName: 'Rundetaarn', coords: COORDS.RUNDETAARN,
        description: 'Torre astronómica del siglo XVII sin escaleras (rampa).',
        keyDetails: 'Vistas panorámicas del centro antiguo.',
        priceDKK: 50, priceEUR: 6.70, type: 'sightseeing', completed: false,
        ticketUrl: 'https://www.rundetaarn.dk/en/',
        googleMapsUrl: 'https://maps.app.goo.gl/NdWSQLeUSjG1eo5Z6',
        instaTag: 'https://www.instagram.com/explore/tags/rundetaarn/'
    },
    {
        id: '9', title: 'Castillo de Rosenborg', startTime: '15:30', endTime: '16:30',
        locationName: 'Rosenborg', coords: COORDS.ROSENBORG,
        description: 'Castillo renacentista y jardines del rey (Kongens Have).',
        keyDetails: 'Vista exterior y paseo por los jardines.',
        priceDKK: 0, priceEUR: 0, type: 'sightseeing', completed: false,
        googleMapsUrl: 'https://maps.app.goo.gl/wLqhiVC88rwhhuD36',
        instaTag: 'https://www.instagram.com/explore/tags/kongenshave/'
    },
    {
        id: '10', title: 'Regreso al Barco desde METRO Marmorkirken', startTime: '16:30', endTime: '17:30',
        locationName: 'METRO MARMORKIRKEN', endLocationName: 'OCEANKAJ',
        coords: COORDS.METRO_MARMORKIRKEN, endCoords: COORDS.OCEANKAJ,
        description: 'Metro M4 hasta Orientkaj + Bus 164.',
        keyDetails: '¡Cuidado con el Bus 164 en domingo! Sal con margen.',
        googleMapsUrl: 'https://maps.app.goo.gl/jU8K6UnsEPJYYtbi8',
        priceDKK: 24, priceEUR: 3.2, type: 'logistics', completed: false, notes: 'CRITICAL'
    },
    {
        id: '11', title: '¡A BORDO! (Límite 17:30)', startTime: '17:30', endTime: '17:30',
        locationName: 'Pasarela Barco', coords: COORDS.OCEANKAJ,
        description: 'Hora límite absoluta. Se retira la pasarela.',
        keyDetails: 'Todos a bordo.',
        priceDKK: 0, priceEUR: 0, type: 'logistics', completed: false, notes: 'CRITICAL'
    },
    {
        id: '12', title: 'Salida del Barco', startTime: '18:00', endTime: '18:00',
        locationName: 'Muelle Oceankaj', coords: COORDS.OCEANKAJ,
        description: 'El MSC Euribia zarpa hacia el siguiente destino.',
        keyDetails: '¡Hasta la próxima!',
        priceDKK: 0, priceEUR: 0, type: 'logistics', completed: false
    }
];

export const DANISH_WORDS: DanishWord[] = [
    { word: 'Goddag', phonetic: "Gou'-day", simplified: 'Gou-dey', meaning: 'Hola / Buenos días' },
    { word: 'Tak', phonetic: 'Tack', simplified: 'Tak', meaning: 'Gracias' },
    { word: 'Farvel', phonetic: "Fa-vel'", simplified: 'Fa-vel', meaning: 'Adiós' },
    { word: 'Oceankaj', phonetic: "O-shen-kai", simplified: 'O-shen-kay', meaning: 'Muelle de Cruceros' },
    { word: 'Orientkaj', phonetic: "O-rien-kai", simplified: 'O-rien-kay', meaning: 'Muelle Este / Estación Metro' },
    { word: 'Østerport', phonetic: "Oes-ta-po-rt", simplified: 'Os-ta-port', meaning: 'Estación/Puerta Este' },
    { word: 'Amalienborg', phonetic: "A-ma-lien-borg", simplified: 'A-ma-lien-bor', meaning: 'Palacio Real' },
    { word: 'Rundetaarn', phonetic: "Run-de-tarn", simplified: 'Run-de-tarn', meaning: 'Torre Redonda' },
    { word: 'Rosenborg', phonetic: "Ro-sen-borg", simplified: 'Ro-sen-bor', meaning: 'Castillo de la Rosa' },
    { word: 'Krydstogtterminal', phonetic: "Krus-togt-ter-mi-nal", simplified: 'Krus-tog-terminal', meaning: 'Terminal de Cruceros' },
    { word: 'Den Lille Havfrue', phonetic: 'Den Lí-lle Ja-fru-e', simplified: 'Den Lile Jaf-ru', meaning: 'La Sirenita' },
    { word: 'Nyhavn', phonetic: "Níu-jau-n", simplified: 'Niu-yaun', meaning: 'Puerto Nuevo' },
    { word: 'Strøget', phonetic: "Strøget", simplified: 'Stroiet', meaning: 'La calle peatonal' },
    { word: 'Hygge', phonetic: "Hju-ga", simplified: 'Hiu-ga', meaning: 'Acogedor / Bienestar' },
    { word: 'Øl', phonetic: "Oel", simplified: 'Ol', meaning: 'Cerveza' }
];