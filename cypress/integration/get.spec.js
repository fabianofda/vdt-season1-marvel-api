

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Charles Xavier',
            alias: 'Professor X',
            team: ['x-man'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['x-man'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homen Arranha',
            team: ['novos vingadores'],
            active: true
        }
    ]

    before(function () {
       // cy.back2ThePast()
        // cy.setToken()
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', function () {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve buscar personagem por nome', function () {
        cy.searchCharacters('Logan').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Wolverine')
            expect(response.body[0].team).to.eql(['x-man'])
            expect(response.body[0].active).to.eql(true)
        })
    })
})

describe('GET /characters/id', function () {

    // before(function () {
    //   //  cy.back2ThePast()
    //     cy.setToken()
    // })

    const tonyStark =
    {
        name: 'Tony Stark',
        alias: 'Home de Ferro',
        team: ['vingadores'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(tonyStark).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve buscar personagem por id', function () {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Home de Ferro')
                expect(response.body.team).to.eql(['vingadores'])
                expect(response.body.active).to.eql(true)
            })
        })
    })

    context('quando busco por um id não cadastrado', function () {
        it('deve retornar 404 ', function () {
            const id = '62bf971275fba2047704a225'
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })

})