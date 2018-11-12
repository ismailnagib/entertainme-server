const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql')
const dataType = require('./dataType')
const Movies = require('../controllers/movies')
const TVS = require('../controllers/tvs')

const GQLSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Root',
        fields: {
            movies: {
                type: new GraphQLList(dataType),
                args: {
                    'id': {
                        type: GraphQLID
                    }
                },
                resolve(obj, { id }) {
                    let data
                    if (id) {
                        data = Movies.showOne(id)
                    } else {
                        data = Movies.showAll()
                    }
                    return data
                }
            },
            tvs: {
                type: new GraphQLList(dataType),
                args: {
                    'id': {
                        type: GraphQLID
                    }
                },
                resolve(obj, { id }) {
                    let data
                    if (id) {
                        data = TVS.showOne(id)
                    } else {
                        data = TVS.showAll()
                    }
                    return data
                }
            }
        }
    })
})

module.exports = GQLSchema