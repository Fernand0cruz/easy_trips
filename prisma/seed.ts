const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

interface CategorySeed {
    name: string
    slug: string
    image: string
    highlights: string[]
    photoPool: string[]
    entries: {
        location: string
        pricePerDay: number
        maxGuests: number
        description: string
    }[]
}

const AVAILABILITY_START = new Date('2024-01-01')
const AVAILABILITY_END = new Date('2026-12-31')

// Cada foto abaixo é um ID verificado do CDN da Unsplash (images.unsplash.com),
// checado individualmente antes de entrar aqui para garantir que carrega.
const unsplash = (id: string, width = 960) => `https://images.unsplash.com/${id}?w=${width}&q=80`

const categories: CategorySeed[] = [
    {
        name: 'Hotel',
        slug: 'hotel',
        image: '/hotel.png',
        highlights: [
            'Café da manhã incluso', 'Piscina', 'Academia', 'Estacionamento',
            'Wi-fi', 'Ar condicionado', 'TV a cabo', 'Cama king size', 'Banheiro privativo',
        ],
        photoPool: [
            'photo-1566073771259-6a8506099945', 'photo-1611892440504-42a792e24d32',
            'photo-1618773928121-c32242e63f39', 'photo-1582719478250-c89cae4dc85b',
            'photo-1590490360182-c33d57733427', 'photo-1551882547-ff40c63fe5fa',
            'photo-1445019980597-93fa8acb246c', 'photo-1571896349842-33c89424de2d',
        ],
        entries: [
            { location: 'Copacabana, Rio de Janeiro', pricePerDay: 420, maxGuests: 4, description: 'Hotel a poucos passos da praia de Copacabana, com serviço de quarto 24h e vista para o mar.' },
            { location: 'Jurerê Internacional, Florianópolis', pricePerDay: 380, maxGuests: 3, description: 'Hospedagem sofisticada em Jurerê, próxima à badalada orla e aos melhores restaurantes da região.' },
            { location: 'Vila Madalena, São Paulo', pricePerDay: 290, maxGuests: 2, description: 'Hotel boutique no coração da Vila Madalena, cercado por bares, galerias de arte e vida noturna.' },
            { location: 'Ouro Preto, Minas Gerais', pricePerDay: 260, maxGuests: 4, description: 'Hotel histórico no centro de Ouro Preto, com arquitetura colonial preservada e vista para as igrejas barrocas.' },
            { location: 'Ipanema, Rio de Janeiro', pricePerDay: 450, maxGuests: 4, description: 'Hotel a uma quadra da praia de Ipanema, com rooftop e vista para o Morro Dois Irmãos.' },
            { location: 'Pampulha, Belo Horizonte', pricePerDay: 270, maxGuests: 3, description: 'Hotel à beira da Lagoa da Pampulha, próximo ao conjunto arquitetônico de Niemeyer.' },
            { location: 'Centro Histórico, Salvador', pricePerDay: 300, maxGuests: 4, description: 'Hotel em casarão colonial no Pelourinho, cercado de música e cultura baiana.' },
            { location: 'Vila Olímpia, São Paulo', pricePerDay: 340, maxGuests: 2, description: 'Hotel executivo na Vila Olímpia, a poucos minutos dos principais centros empresariais.' },
        ],
    },
    {
        name: 'Chalé',
        slug: 'chale',
        image: '/chale.png',
        highlights: [
            'Vista para o horizonte da cidade', 'Vista para o pátio', 'Cozinha', 'Wi-Fi',
            'Estacionamento incluído', 'Piscina compartilhada', 'Permitido animais', 'TV', 'Pátio ou varanda',
        ],
        photoPool: [
            'photo-1449158743715-0a90ebb6d2d8', 'photo-1449824913935-59a10b8d2000',
            'photo-1518602164578-cd0074062767', 'photo-1587061949409-02df41d5e562',
            'photo-1518733057094-95b53143d2a7', 'photo-1483086431886-3590a88317fe',
            'photo-1601918774946-25832a4be0d6', 'photo-1544984243-ec57ea16fe25',
        ],
        entries: [
            { location: 'Vale do Quilombo, Gramado', pricePerDay: 540, maxGuests: 4, description: 'Chalé aconchegante cercado por araucárias, a poucos minutos do centro de Gramado.' },
            { location: 'Monte Verde, Camanducaia', pricePerDay: 460, maxGuests: 2, description: 'Refúgio na montanha com lareira, ideal para dias frios e caminhadas entre pinheiros.' },
            { location: 'Visconde de Mauá, Resende', pricePerDay: 410, maxGuests: 3, description: 'Chalé de madeira à beira de um rio, cercado por cachoeiras e trilhas na Serra da Mantiqueira.' },
            { location: 'Itaipava, Petrópolis', pricePerDay: 470, maxGuests: 2, description: 'Chalé rústico com varanda privativa e vista para o vale, a poucos minutos do centro de Petrópolis.' },
            { location: 'São Francisco de Paula, Rio Grande do Sul', pricePerDay: 430, maxGuests: 4, description: 'Chalé entre araucárias centenárias, próximo à Floresta Nacional de São Francisco de Paula.' },
            { location: 'Delfim Moreira, Minas Gerais', pricePerDay: 390, maxGuests: 3, description: 'Chalé de altitude na Serra da Mantiqueira, com vista para o Pico dos Marins.' },
            { location: 'Urubici, Santa Catarina', pricePerDay: 450, maxGuests: 2, description: 'Chalé no ponto mais frio do Brasil, a poucos minutos do Morro da Igreja.' },
            { location: 'Cambará do Sul, Rio Grande do Sul', pricePerDay: 480, maxGuests: 4, description: 'Chalé rústico próximo aos cânions do Aparados da Serra e Fortaleza.' },
        ],
    },
    {
        name: 'Fazenda',
        slug: 'fazenda',
        image: '/fazenda.png',
        highlights: [
            'Vista para as montanhas', 'Vista para o vale', 'Cozinha', 'Wi-Fi rápido (94 Mbps)',
            'Espaço de trabalho exclusivo', 'Estacionamento incluído', 'Jacuzzi privativa', 'Permitido animais',
        ],
        photoPool: [
            'photo-1500382017468-9049fed747ef', 'photo-1500595046743-cd271d694d30',
            'photo-1500076656116-558758c991c1', 'photo-1500534623283-312aade485b7',
            'photo-1516467508483-a7212febe31a', 'photo-1495107334309-fcf20504a5ab',
            'photo-1500759285222-a95626b934cb', 'photo-1523348837708-15d4a09cfac2',
            'photo-1601758228041-f3b2795255f1',
        ],
        entries: [
            { location: 'Fazenda Boa Vista, Serra da Mantiqueira', pricePerDay: 650, maxGuests: 6, description: 'Fazenda histórica com cavalos, pomar e casarão colonial cercado de montanhas.' },
            { location: 'Recanto do Cerrado, Pirenópolis', pricePerDay: 480, maxGuests: 5, description: 'Fazenda com cachoeiras próprias e trilhas ecológicas no coração de Goiás.' },
            { location: 'Estância São Miguel, Bento Gonçalves', pricePerDay: 590, maxGuests: 4, description: 'Estância entre vinícolas na Serra Gaúcha, com café colonial servido na varanda.' },
            { location: 'Refúgio da Serra, Cunha', pricePerDay: 520, maxGuests: 3, description: 'Fazenda de altitude cercada de mata atlântica, com clima ameno o ano todo.' },
            { location: 'Fazenda Santa Clara, Socorro', pricePerDay: 460, maxGuests: 5, description: 'Fazenda com trilhas de arvorismo e rapel, próxima à capital brasileira dos esportes radicais.' },
            { location: 'Sítio da Serra, Ibiúna', pricePerDay: 380, maxGuests: 4, description: 'Sítio cercado de mata, com horta orgânica e nascente própria a menos de 1h de São Paulo.' },
            { location: 'Recanto Verde, São Roque', pricePerDay: 340, maxGuests: 3, description: 'Fazenda entre vinícolas paulistas, com colheita sazonal de uvas e passeios de charrete.' },
            { location: 'Fazenda Águas Claras, Analândia', pricePerDay: 400, maxGuests: 6, description: 'Fazenda com cachoeiras e piscinas naturais na Serra de São Pedro.' },
        ],
    },
    {
        name: 'Resort',
        slug: 'resort',
        image: '/resort.png',
        highlights: [
            'Vista para o horizonte da cidade', 'Cozinha', 'Wi-Fi', 'Estacionamento incluído',
            'Piscina compartilhada', 'Jacuzzi compartilhada', 'Sauna Compartilhada', 'TV de alta definição', 'Elevador',
        ],
        photoPool: [
            'photo-1571003123894-1f0594d2b5d9', 'photo-1520250497591-112f2f40a3f4',
            'photo-1519449556851-5720b33024e7', 'photo-1540202404-1b927e27fa8b',
            'photo-1584132967334-10e028bd69f7', 'photo-1573052905904-34ad8c27f0cc',
            'photo-1554366347-897a5113f6ab', 'photo-1610641818989-c2051b5e2cfd',
        ],
        entries: [
            { location: 'Costa do Sauípe, Bahia', pricePerDay: 690, maxGuests: 6, description: 'Resort all-inclusive à beira-mar, com parques aquáticos e programação para toda a família.' },
            { location: 'Beto Carrero Resort, Penha', pricePerDay: 520, maxGuests: 5, description: 'Resort ao lado do maior parque temático da América Latina, com acesso facilitado às atrações.' },
            { location: 'Thermas dos Laranjais, Olímpia', pricePerDay: 340, maxGuests: 4, description: 'Resort com águas termais e acesso gratuito ao parque aquático mais visitado do Brasil.' },
            { location: 'Privé Kalifórnia, Caldas Novas', pricePerDay: 310, maxGuests: 4, description: 'Resort com piscinas termais e área de lazer completa no maior polo de águas quentes do mundo.' },
            { location: 'Iberostar Praia do Forte, Bahia', pricePerDay: 720, maxGuests: 6, description: 'Resort all-inclusive à beira-mar na Costa dos Coqueiros, com projeto de proteção às tartarugas marinhas.' },
            { location: 'Vila Galé Eco Resort, Alagoas', pricePerDay: 580, maxGuests: 5, description: 'Resort ecológico cercado de coqueiros, a poucos passos das piscinas naturais de Maragogi.' },
            { location: 'Enotel Resort, Porto de Galinhas', pricePerDay: 640, maxGuests: 4, description: 'Resort à beira-mar com acesso às piscinas naturais mais famosas do Nordeste.' },
            { location: 'Malai Manso Resort, Chapada dos Guimarães', pricePerDay: 450, maxGuests: 6, description: 'Resort às margens da represa de Manso, com esportes aquáticos e trilhas na chapada.' },
        ],
    },
    {
        name: 'Apartamento',
        slug: 'apartamento',
        image: '/apartamento.png',
        highlights: [
            'Vista para as montanhas', 'Cozinha', 'Wi-Fi', 'Estacionamento incluído',
            'Piscina compartilhada', 'Vista para o mar', 'Sauna Compartilhada', 'Elevador',
        ],
        photoPool: [
            'photo-1502672260266-1c1ef2d93688', 'photo-1522708323590-d24dbb6b0267',
            'photo-1493809842364-78817add7ffb', 'photo-1560448204-e02f11c3d0e2',
            'photo-1484154218962-a197022b5858', 'photo-1560184897-ae75f418493e',
            'photo-1502005229762-cf1b2da7c5d6', 'photo-1567767292278-a4f21aa2d36e',
        ],
        entries: [
            { location: 'Moema, São Paulo', pricePerDay: 240, maxGuests: 3, description: 'Apartamento moderno próximo ao Parque Ibirapuera, com fácil acesso ao metrô.' },
            { location: 'Boa Viagem, Recife', pricePerDay: 210, maxGuests: 4, description: 'Apartamento com vista para a praia de Boa Viagem, a poucos passos da orla.' },
            { location: 'Asa Sul, Brasília', pricePerDay: 190, maxGuests: 2, description: 'Apartamento bem localizado na Asa Sul, próximo a restaurantes e parques da capital.' },
            { location: 'Batel, Curitiba', pricePerDay: 220, maxGuests: 3, description: 'Apartamento no bairro Batel, região mais charmosa e arborizada de Curitiba.' },
            { location: 'Leblon, Rio de Janeiro', pricePerDay: 380, maxGuests: 4, description: 'Apartamento a poucos metros da praia do Leblon, no bairro mais valorizado do Rio.' },
            { location: 'Setor Bueno, Goiânia', pricePerDay: 180, maxGuests: 3, description: 'Apartamento moderno no Setor Bueno, cercado de restaurantes e vida noturna.' },
            { location: 'Meireles, Fortaleza', pricePerDay: 230, maxGuests: 4, description: 'Apartamento na orla de Fortaleza, a poucos passos da praia de Iracema.' },
            { location: 'Cidade Baixa, Porto Alegre', pricePerDay: 170, maxGuests: 2, description: 'Apartamento no boêmio bairro Cidade Baixa, cercado de bares e casas de shows.' },
        ],
    },
    {
        name: 'Motel',
        slug: 'motel',
        image: '/motel.png',
        highlights: [
            'Ar-Condicionado', 'Canais Eróticos', 'CD Player', 'Estacionamento', 'Wi-fi', 'Frigobar',
        ],
        photoPool: [
            'photo-1595576508898-0ad5c879a061', 'photo-1522798514-97ceb8c4f1c8',
            'photo-1560185893-a55cbc8c57e8', 'photo-1631049307264-da0ec9d70304',
            'photo-1611048267451-e6ed903d4a38', 'photo-1595846519845-68e298c2edd8',
            'photo-1618219944342-824e40a13285', 'photo-1600566752355-35792bedcfea',
        ],
        entries: [
            { location: 'Sonho Meu, São Paulo', pricePerDay: 130, maxGuests: 2, description: 'Suíte temática com hidromassagem e menu de conveniência 24h.' },
            { location: 'Status, Curitiba', pricePerDay: 160, maxGuests: 2, description: 'Suíte climatizada com garagem privativa e check-in discreto.' },
            { location: 'Sensacional, Porto Alegre', pricePerDay: 140, maxGuests: 2, description: 'Suíte com decoração especial e closet espelhado.' },
            { location: 'Paradiso, Salvador', pricePerDay: 155, maxGuests: 2, description: 'Suíte com piscina privativa e vista panorâmica da cidade.' },
            { location: 'Prazer, Rio de Janeiro', pricePerDay: 145, maxGuests: 2, description: 'Suíte com hidromassagem e garagem individual com acesso direto ao quarto.' },
            { location: 'Class, Fortaleza', pricePerDay: 135, maxGuests: 2, description: 'Suíte climatizada com cardápio de conveniência e som ambiente.' },
            { location: 'Ilusion, Recife', pricePerDay: 150, maxGuests: 2, description: 'Suíte temática com banheira de hidromassagem e iluminação especial.' },
            { location: 'Elegance, Brasília', pricePerDay: 165, maxGuests: 2, description: 'Suíte sofisticada com closet espelhado e sistema de som próprio.' },
        ],
    },
    {
        name: 'Flat',
        slug: 'flat',
        image: '/flat.png',
        highlights: [
            'Tranca na porta do quarto', 'Cozinha', 'Wi-Fi', 'Espaço de trabalho exclusivo',
            'Estacionamento incluído', 'TV de 46 polegadas', 'Máquina de lavar', 'Secadora',
        ],
        photoPool: [
            'photo-1502672023488-70e25813eb80', 'photo-1512918728675-ed5a9ecdebfd',
            'photo-1493663284031-b7e3aefcae8e', 'photo-1554995207-c18c203602cb',
            'photo-1616486338812-3dadae4b4ace', 'photo-1522771739844-6a9f6d5f14af',
            'photo-1600607687920-4e2a09cf159d', 'photo-1591088398332-8a7791972843',
        ],
        entries: [
            { location: 'Studio Pinheiros, São Paulo', pricePerDay: 180, maxGuests: 1, description: 'Studio compacto e funcional, a poucos metros do metrô Faria Lima.' },
            { location: 'Flat Frei Caneca, São Paulo', pricePerDay: 210, maxGuests: 2, description: 'Flat completo próximo ao shopping Frei Caneca, com portaria 24h.' },
            { location: 'Studio Savassi, Belo Horizonte', pricePerDay: 170, maxGuests: 1, description: 'Studio no coração da Savassi, cercado de bares e restaurantes.' },
            { location: 'Loft Setor Sul, Goiânia', pricePerDay: 160, maxGuests: 2, description: 'Loft moderno no Setor Sul, próximo aos principais parques da cidade.' },
            { location: 'Flat Jardins, São Paulo', pricePerDay: 230, maxGuests: 2, description: 'Flat completo nos Jardins, cercado de grifes e restaurantes renomados.' },
            { location: 'Studio Meireles, Fortaleza', pricePerDay: 175, maxGuests: 1, description: 'Studio a poucos passos da orla de Fortaleza, com portaria 24h.' },
            { location: 'Flat Copacabana, Rio de Janeiro', pricePerDay: 250, maxGuests: 2, description: 'Flat com vista parcial para o mar, a uma quadra da praia de Copacabana.' },
            { location: 'Loft Água Verde, Curitiba', pricePerDay: 165, maxGuests: 2, description: 'Loft moderno no bairro Água Verde, próximo ao Parque Barigui.' },
        ],
    },
    {
        name: 'Pousada',
        slug: 'pousada',
        image: '/pousada.png',
        highlights: [
            'Vista para o jardim', 'Wi-Fi', 'Estacionamento incluído', 'TV',
            'Pátio ou varanda', 'Quintal', 'É permitido deixar as malas',
        ],
        photoPool: [
            'photo-1505692952047-1a78307da8f2', 'photo-1521783988139-89397d761dce',
            'photo-1595877244574-e90ce41ce089', 'photo-1600585154340-be6161a56a0c',
            'photo-1568495248636-6432b97bd949', 'photo-1615529182904-14819c35db37',
            'photo-1499696010180-025ef6e1a8f9', 'photo-1522156373667-4c7234bbd804',
            'photo-1544161515-4ab6ce6db874',
        ],
        entries: [
            { location: 'Pousada do Rosário, Ouro Preto', pricePerDay: 175, maxGuests: 3, description: 'Pousada colonial no centro histórico, a poucos passos das principais igrejas.' },
            { location: 'Recanto da Serra, Monte Verde', pricePerDay: 165, maxGuests: 2, description: 'Pousada aconchegante com lareira e café da manhã caseiro na Serra da Mantiqueira.' },
            { location: 'Vila do Mar, Búzios', pricePerDay: 220, maxGuests: 4, description: 'Pousada charmosa a poucos metros da Rua das Pedras, no coração de Búzios.' },
            { location: 'Chão de Estrelas, Lençóis', pricePerDay: 190, maxGuests: 3, description: 'Pousada rústica na porta de entrada da Chapada Diamantina, cercada de trilhas.' },
            { location: 'Pousada Arraial d\'Ajuda, Bahia', pricePerDay: 210, maxGuests: 3, description: 'Pousada em meio à vegetação nativa, a poucos minutos das falésias de Arraial d\'Ajuda.' },
            { location: 'Recanto das Águas, Bonito', pricePerDay: 195, maxGuests: 4, description: 'Pousada próxima aos rios de águas cristalinas, base ideal para o ecoturismo em Bonito.' },
            { location: 'Pousada Vila Serrana, São Bento do Sapucaí', pricePerDay: 180, maxGuests: 2, description: 'Pousada de montanha com vista para o Pico do Itapeva, na Serra da Mantiqueira.' },
            { location: 'Refúgio do Sol, Jericoacoara', pricePerDay: 240, maxGuests: 3, description: 'Pousada rústica-chique entre dunas, a poucos passos da Praia de Jericoacoara.' },
        ],
    },
]

async function main() {
    try {
        for (const category of categories) {
            let tripCategory = await prisma.tripCategory.findFirst({
                where: { slug: category.slug },
            })

            if (!tripCategory) {
                tripCategory = await prisma.tripCategory.create({
                    data: {
                        name: category.name,
                        slug: category.slug,
                        image: category.image,
                    },
                })
            }

            const existing = await prisma.trip.findMany({
                where: { categoryId: tripCategory.id },
                select: { location: true },
            })
            const existingLocations = new Set(existing.map((t: any) => t.location))

            const newEntries = category.entries
                .map((entry, index) => ({ entry, index }))
                .filter(({ entry }) => !existingLocations.has(entry.location))

            if (newEntries.length > 0) {
                await prisma.trip.createMany({
                    data: newEntries.map(({ entry, index }) => {
                        const coverId = category.photoPool[index % category.photoPool.length]
                        const gallery = category.photoPool
                            .filter((id) => id !== coverId)
                            .slice(0, 4)

                        return {
                            categoryId: tripCategory.id,
                            location: entry.location,
                            slug: category.slug + '_' + entry.location.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            startDate: AVAILABILITY_START,
                            endDate: AVAILABILITY_END,
                            pricePerDay: entry.pricePerDay,
                            description: entry.description,
                            coverImage: unsplash(coverId, 960),
                            imagesUrl: gallery.map((id) => unsplash(id, 720)),
                            highlights: category.highlights,
                            maxGuests: entry.maxGuests,
                        }
                    }),
                })
            }

            console.log(`Seeded ${newEntries.length} new trips for category "${category.name}" (${category.entries.length - newEntries.length} already existed)`)
        }

        console.log('Seeding finished.')
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
