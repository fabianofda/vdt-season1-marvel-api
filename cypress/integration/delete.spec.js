

describe('DELETE /characters/id', function () {

    // before(function () {
    //     //cy.back2ThePast()
    //     cy.setToken()
    // })

    const tochaHumana =
    {
        name: 'Jhonny Storn',
        alias: 'Tocha Humana',
        team: ['quarteto fantastico'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacter(tochaHumana).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve remover o personagem por id', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharactersById(id).then(function (response) {
                expect(response.status).to.eql(204)

            })
        })

        after(function () {
            const id = Cypress.env('characterId')
            cy.getCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })

    context('quando removo por um id não cadastrado', function () {
        it('deve retornar 404 ', function () {
            const id = '62bf971275fba2047704a225'
            cy.deleteCharactersById(id).then(function (response) {
                expect(response.status).to.eql(404)
            })
        })
    })

})