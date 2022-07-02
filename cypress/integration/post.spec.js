

describe('POST /characters', function () {

    context('quando o personagem e novo', function () {

        before(function () {

           // cy.setToken()
            // cy.back2ThePast()
        })

        it('deve cadastrar o personagem', function () {

            const character = {
                name: 'Wanda Maximoff',
                alias: 'Feiticeira Escarlate',
                team: ['vingadores'],
                active: true
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                    expect(response.body.character_id.length).to.eql(24)
                })
        })

    })

    context('quando o personagem ja existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'vingadores da costa oeste',
                'irmandade de mutantes'
            ],
            active: true
        }

        before(function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })
        })

        it('nao deve cadastrar duplicado', function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        })
    })

    context('Com exceção da idade, todos os campos são obrigatórios', function () {
        it('nao cadastrar usuario sem o nome, campo obrogatorio', function () {
            const character = {
                age: 40,
                alias: 'Feiticeira',
                team: ['Vingadores'],
                active: true
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"name\" is required')
                })
        })

        it('nao cadastrar usuario sem o alias, campo obrogatorio', function () {
            const character = {
                name: 'Wanda',
                age: 34,
                team: ['Vingadores'],
                active: true
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"alias\" is required')
                })
        })

        it('nao cadastrar usuario sem o team, campo obrogatorio', function () {
            const character = {
                name: 'Sra Maxinoff',
                age: 37,
                alias: 'Feiticeira Escarlate',
                active: true
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"team\" is required')
                })
        })

        it('nao cadastrar usuario sem o active, campo obrogatorio', function () {
            const character = {
                name: 'Wanda M.',
                age: 20,
                alias: 'F. Escarlate',
                team: ['Vingadores'],
            }

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.validation.body.message).to.eql('\"active\" is required')
                })
        })


        it('nao cadastrar quando somente a idade for preenchida', function () {
            const character = {
                name: '',
                alias: '',
                idade: '50',
                team: [''
                ],
                active: ''
            }
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Bad Request')
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('"name" is not allowed to be empty')

            })
        })

    })


})