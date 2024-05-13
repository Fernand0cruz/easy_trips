const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    try {


        const hotelCategory = await prisma.tripCategory.create({
            data: {
                name: 'Hotel',
                slug: 'hotel',
                image: "/hotel.png"
            }
        })
        const hotel = [
            {
                categoryId: hotelCategory.id,
                location: "Barra da Tijuca, Rio de Janeiro",
                slug: hotelCategory.slug + '_barra-da-tijuca-rio-de-janeiro',
                pricePerDay: 350,
                description: "O hotel é um dos mais luxuosos da região, com uma vista incrível para a praia da Barra da Tijuca.",
                coverImage: "https://a0.muscache.com/im/pictures/213f32bf-d4a3-4f21-8705-ee7a12a39ac0.jpg?im_w=960",
                imagesUrl: [
                    "https://a0.muscache.com/im/pictures/70da20ac-66c7-428f-8770-3ba2bb5f6230.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/6dcd8885-12a8-4ed8-946e-6f88df3395eb.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/77a0ba62-031e-4834-8cf4-0afa177d7f74.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/9de84213-9e24-47b5-b7f9-7012432044c5.jpg?im_w=720",
                ],
                highlights: [
                    "Café da manhã incluso",
                    "Piscina",
                    "Academia",
                    "Estacionamento",
                    "Wi-fi",
                    "Ar condicionado",
                    "TV a cabo",
                    "Cama king size",
                    "Banheiro privativo",
                ],
                maxGuests: 4,
            }
        ]
        await prisma.trip.createMany({
            data: hotel,
        })



        const chaleCategory = await prisma.tripCategory.create({
            data: {
                name: 'Chalé',
                slug: 'chale',
                image: "/chale.png"
            }
        })
        const chale = [
            {
                categoryId: chaleCategory.id,
                location: "Rancho da Lua, Petrópolis ",
                slug: chaleCategory.slug + '_rancho-da-lua-petrololis',
                pricePerDay: 490,
                description: "O Chalé do artista  fica em condomínio com segurança 24 horas, com mata, pomar e linda vista, especialmente para a Pedra do Cantagalo. Possui banheiro, 1 cama de casal , cooktop de duas bocas , cafeteira elétrica,sanduicheira, forninho elétrico, filtro de barro e frigobar .TV Sky  e wi-fi. Uma varandinha com rede e pit fire.",
                coverImage: "https://a0.muscache.com/im/pictures/b6593d81-46cf-4463-9ee0-bd805aec10a2.jpg?im_w=960",
                imagesUrl: [
                    "https://a0.muscache.com/im/pictures/92e30a4b-1909-40bc-8a4a-b721012ef01e.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/9d550d5d-e60c-4508-8809-9c26ef1f4b08.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/miso/Hosting-858706085482905941/original/be5c8015-9f89-4de9-9cb7-b85c5c3ad2ac.jpeg?im_w=720",
                    "https://a0.muscache.com/im/pictures/85478bce-fb72-44a7-ba1a-868d0f875ec8.jpg?im_w=1200",
                ],
                highlights: [
                    "Vista para o horizonte da cidade",
                    "Vista para o pátio",
                    "Cozinha",
                    'Wi-Fi',
                    "Estacionamento incluído",
                    "Piscina compartilhada",
                    "Permitido animais",
                    "TV",
                    "Pátio ou varanda",
                    "Indisponível: Alarme de monóxido de carbonoAlarme de monóxido de carbono"
                ],
                maxGuests: 2,
            }
        ]
        await prisma.trip.createMany({
            data: chale,
        })



        const fazendaCategory = await prisma.tripCategory.create({
            data: {
                name: 'Fazenda',
                slug: 'fazenda',
                image: "/fazenda.png"
            }
        })
        const fazenda = [
            {
                categoryId: fazendaCategory.id,
                location: "Paraiso nas montanhas, Campos do Jordão ",
                slug: fazendaCategory.slug + '_paraiso-nas-montanhas-campos-dos-jordao',
                pricePerDay: 610,
                description: "Estamos em zona rural, nossa fazendinha possui um total de 4 Casas e 4 Chalés construídos para locação à 1580mts de altitude, cercados de muitas araucárias e mata virgem em belíssimo vale na Mantiqueira à 14,2km do Capivari para aqueles que queiram o agito de Campos, mas nossa proposta é para se desconectar da cidade e se conectar com a natureza, descansar com toda a privacidade e tranquilidade do local. Oferecemos wi-fi para que possam estar conectados quando sentirem necessidade.",
                coverImage: "https://a0.muscache.com/im/pictures/c506e947-a97c-49f6-9e6f-a30dd5d63c8d.jpg?im_w=1200",
                imagesUrl: [
                    "https://a0.muscache.com/im/pictures/6004945c-bb78-4f9b-8780-11dd924da115.jpg?im_w=1200",
                    "https://a0.muscache.com/im/pictures/a1382a3e-54ed-447d-93b9-ac49d19a87fd.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/2a24000a-f721-4925-a71a-4e9a3218402c.jpg?im_w=1200",
                    "https://a0.muscache.com/im/pictures/32696897-c682-453c-a991-c983edb60e65.jpg?im_w=1200",
                ],
                highlights: [
                    "Vista para as montanhas",
                    "Vista para o vale",
                    "Cozinha",
                    "Wi-Fi rápido (94 Mbps)",
                    "Espaço de trabalho exclusivo",
                    "Estacionamento incluído",
                    "Jacuzzi privativa: disponível o ano todo, disponível 24 horas",
                    "Permitido animais",
                    "Indisponível: Alarme de monóxido de carbonoAlarme de monóxido de carbono",
                    "Indisponível: Detector de fumaçaDetector de fumaça",
                ],
                maxGuests: 2,
            }
        ]
        await prisma.trip.createMany({
            data: fazenda,
        })


        const resortCategory = await prisma.tripCategory.create({
            data: {
                name: "Resort",
                slug: "resort",
                image: "/resort.png"
            }
        })
        const resort = [
            {
                categoryId: resortCategory.id,
                location: "Spazzio DiRoma, Caldas Novas ",
                slug: resortCategory.slug + '_spazzio-diroma-caldas-novas',
                pricePerDay: 290,
                description: "Hotel cheio de estilo, conforto, aconchego e segurança. O Apartamento foi pensado no bem estar da sua família, pra que se sintam em casa. Além da área de lazer do hotel, o grande destaque é o o acesso gratuito ao Acqua Park, maior parque aquático de Caldas. As fotos já dizem tudo, é só diversão, pra todos os gostos e idades, incluindo 2 parques Kids pra alegria da criançada, o melhor, fica ao lado do hotel, não precisa de carro, bicicleta, nada, apenas alguns passos. Bora se divertir.",
                coverImage: "https://a0.muscache.com/im/pictures/4a795777-e94d-4207-9d19-950482dfcf2e.jpg?im_w=960",
                imagesUrl: [
                    "https://a0.muscache.com/im/pictures/322877c9-9246-47fd-928d-03397dcbf87b.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/d9470c21-e8d9-4086-b0ea-473b78269e7e.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/25e7ce58-2072-41a4-a377-674c3aa93043.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/ea0ce5e2-9f92-43bd-9f93-daba554b1602.jpg?im_w=720",
                ],
                highlights: [
                    "Vista para o horizonte da cidade",
                    "Cozinha",
                    "Wi-Fi",
                    "Estacionamento incluído",
                    "Piscina compartilhada",
                    "Jacuzzi compartilhada: disponível o ano todo, disponível em horários específicos",
                    "Sauna Compartilhada",
                    "TV de alta definição de 50 polegadas com TV a cabo",
                    "Elevador",
                    "Câmeras de segurança na parte externa da propriedade",
                ],
                maxGuests: 4,
            }
        ]
        await prisma.trip.createMany({
            data: resort
        })


        const apartamentoCategory = await prisma.tripCategory.create({
            data: {
                name: "Apartamento",
                slug: "apartamento",
                image: "/apartamento.png"
            }
        })
        const apartamento = [
            {
                categoryId: apartamentoCategory.id,
                location: "São Conrado, Rio de Janeiro",
                slug: apartamentoCategory.slug + '_sao-conrado-rio-de-janeiro',
                pricePerDay: 200,
                description: "Sejam bem-vindos a esse espaçoso e confortável lugar, cheio de vida para uma estadia maravilhosa. Apartamento bem equipado em prédio familiar com portaria 24h, mini mercado, 1 vaga de garagem, varanda com uma bela vista para as montanhas e a praia de São Conrado, há uma quadra da praia e próximo estação do metrô São Conrado e do Shopping Fashion Mall, com teatros, cinemas e restaurantes. Venha ter uma linda experiência nesse bairro cheio de charme e aventuras.",
                coverImage: "https://a0.muscache.com/im/pictures/miso/Hosting-990521269902088286/original/175f3a8d-3791-40e2-ae6d-41ad00d6fdca.jpeg?im_w=960",
                imagesUrl: [
                    "https://a0.muscache.com/im/pictures/miso/Hosting-990521269902088286/original/c65c8b77-2023-475d-b9b2-7cf6402addb9.jpeg?im_w=720",
                    "https://a0.muscache.com/im/pictures/miso/Hosting-990521269902088286/original/112b1b39-874f-43b7-b430-8bf0bba2508b.jpeg?im_w=720",
                    "https://a0.muscache.com/im/pictures/miso/Hosting-990521269902088286/original/86c308d8-ac9c-4f9b-90f8-8da215626447.jpeg?im_w=720",
                    "https://a0.muscache.com/im/pictures/miso/Hosting-990521269902088286/original/2163a00f-7d0e-4c5a-9ca2-ca5594d258a0.jpeg?im_w=1200",
                ],
                highlights: [
                    "Vista para as montanhas",
                    "Cozinha",
                    "Wi-Fi",
                    "Estacionamento incluído",
                    "Piscina compartilhada",
                    "Vista para o mar",
                    "Sauna Compartilhada",
                    "TV de alta definição de 50 polegadas com TV a cabo",
                    "Elevador",
                    "Câmeras de segurança na parte externa da propriedade",
                ],
                maxGuests: 4,
            }
        ]
        await prisma.trip.createMany({
            data: apartamento
        })



        const motelCategory = await prisma.tripCategory.create({
            data: {
                name: "Motel",
                slug: "motel",
                image: "/motel.png"
            }
        })
        const motel = [
            {
                categoryId: motelCategory.id,
                location: "Le Baron, Belo Horizonte",
                slug: motelCategory.slug + '_le-baron-belo-horizonte',
                pricePerDay: 150,
                description: "Surpreenda quem você gosta com um vale-presente do Motel Le Baron! Você escolhe o valor e quem usar o vale terá R$ 60,00, R$ 100,00 ou R$ 140,00 de desconto no total da diária. Ligue para o Le Baron e adquira seu!",
                coverImage: "https://cdn.guiademoteis.com.br/Images/moteis/110-Motel-Le-Baron/suites/530-Simples/fotos/foto1-suites.jpg",
                imagesUrl: [
                    "https://cdn.guiademoteis.com.br/Images/moteis/110-Motel-Le-Baron/suites/1867-Teto-Solar/fotos/foto1-suites.jpg",
                    "https://cdn.guiademoteis.com.br/imagens/suites/big/110_big_11068_1.jpg",
                    "https://cdn.guiademoteis.com.br/Images/moteis/110-Motel-Le-Baron/suites/1868-Luxo-Luxo/fotos/foto3-suites.jpg",
                    "https://cdn.guiademoteis.com.br/Images/moteis/110-Motel-Le-Baron/suites/11069-Studio-com-Hidro/fotos/foto1-suites.jpg",
                ],
                highlights: [
                    "Ar-Condicionado",
                    "Canais Eróticos",
                    "CD Player",
                    "Estacionamento",
                    "Wi-fi",
                    "Ar condicionado",
                    "Frigobar",
                ],
                maxGuests: 4,
            }
        ]
        await prisma.trip.createMany({
            data: motel
        })
        const flatCategory = await prisma.tripCategory.create({
            data: {
                name: "Flat",
                slug: "flat",
                image: "/flat.png"
            }
        })
        const flat = [
            {
                categoryId: flatCategory.id,
                location: "Charmosa casa, São Paulo",
                slug: flatCategory.slug + '_charmosa-casa-sao-paulo',
                pricePerDay: 200,
                description: "Quarto grande com armário, escrivaninha e uma confortável cama de Casal tamanho Queen Size. Sala com cozinha integrada. Localização privilegiada, 10 minutos a pé do Metrô Faria Lima e Instituto Tomie Ohtake.",
                coverImage: "https://a0.muscache.com/im/pictures/airflow/Hosting-6652768/original/2420e900-c4af-44c7-bc16-3d3290740b9b.jpg?im_w=960",
                imagesUrl: [
                    "https://a0.muscache.com/im/pictures/airflow/Hosting-6652768/original/3498ea79-89eb-4e05-80c8-8ed7f90ba096.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/airflow/Hosting-6652768/original/c1f74222-e9a3-454a-aa42-20fdd3147e42.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/airflow/Hosting-6652768/original/7d44df7a-1787-4f40-9c8d-47d4db3a44fa.jpg?im_w=720",
                    "https://a0.muscache.com/im/pictures/97467120/cc936192_original.jpg?im_w=1200",
                ],
                highlights: [
                    "Tranca na porta do quarto",
                    "Cozinha",
                    "Wi-Fi",
                    "Espaço de trabalho exclusivo",
                    "Estacionamento incluído",
                    "TV de 46 polegadas",
                    "Máquina de lavar na acomodação por Gratuito",
                    "Secadora",
                    "Pátio ou varanda (Compartilhada)",
                    "Quintal privado — totalmente cercado"
                ],
                maxGuests: 1,
            }
        ]
        await prisma.trip.createMany({
            data: flat
        })
        const pousadaCategory = await prisma.tripCategory.create({
            data: {
                name: "Pousada",
                slug: "pousada",
                image: "/pousada.png"
            }
        })
        const pousada = [
            {
                categoryId: pousadaCategory.id,
                location: "Pouso dos Pássaros, Tiradentes",
                slug: pousadaCategory.slug + '_pouso-dos-passaros-tiradentes',
                pricePerDay: 150,
                description: "Suíte recém reformada, com estilo rústico, rodeada por muita área verde, onde prevalece o som dos pássaros. Destinada a quem valoriza o contato com a natureza mas não abre mão de conforto, aconhego e privacidade.",
                coverImage: "https://a0.muscache.com/im/pictures/e3322547-dda1-4985-9df2-937e28399109.jpg?im_w=960",
                imagesUrl: [
                    "https://a0.muscache.com/im/pictures/miso/Hosting-629133243552856341/original/2cbd818b-06b0-4546-8f35-02bfff047e83.jpeg?im_w=720",
                    "https://a0.muscache.com/im/pictures/miso/Hosting-629133243552856341/original/08c64b1b-45f0-41ff-aa43-d45d192970c5.jpeg?im_w=720",
                    "https://a0.muscache.com/im/pictures/miso/Hosting-629133243552856341/original/308158cf-d816-4314-bf13-624026e0ec50.jpeg?im_w=720",
                    "https://a0.muscache.com/im/pictures/miso/Hosting-629133243552856341/original/a2971e63-3b26-4898-89e5-59fdfb60546b.jpeg?im_w=720",
                ],
                highlights: [
                    " Vista para o jardim",
                    "Wi-Fi",
                    "Estacionamento incluído",
                    "TV",
                    "Pátio ou varanda (Compartilhada)",
                    "Quintal",
                    "É permitido deixar as malas",
                    "Câmeras de segurança na parte externa da propriedade",
                    "Indisponível: Alarme de monóxido de carbonoAlarme de monóxido de carbono",
                    "Indisponível: Detector de fumaçaDetector de fumaça",
                ],
                maxGuests: 3,
            }
        ]
        await prisma.trip.createMany({
            data: pousada
        })
        console.log('Start seeding...')
    }
    catch (error) {
        console.error('Error seeding: ', error)
    }
    finally {
        await prisma.$disconnect()
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });