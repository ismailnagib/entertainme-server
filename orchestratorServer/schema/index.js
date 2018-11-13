const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLFloat } = require('graphql')
const dataType = require('./dataType')
const inputType = require('./inputType')
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
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            addMovie: {
                type: new GraphQLList(inputType),
                args: {
                    title: {
                        type: GraphQLString
                    },
                    overview: {
                        type: GraphQLString
                    },
                    poster_path: {
                        type: GraphQLString
                    },
                    popularity: {
                        type: GraphQLFloat
                    },
                    tag: {
                        type: new GraphQLList(GraphQLString)
                    }
                },
                resolve(obj, args) {
                    let data = Movies.create(args)
                    return data
                }
            },
            addTVS: {
                type: new GraphQLList(inputType),
                args: {
                    title: {
                        type: GraphQLString
                    },
                    overview: {
                        type: GraphQLString
                    },
                    poster_path: {
                        type: GraphQLString
                    },
                    popularity: {
                        type: GraphQLFloat
                    },
                    tag: {
                        type: new GraphQLList(GraphQLString)
                    }
                },
                resolve(obj, args) {
                    let data = TVS.create(args)
                    return data
                }
            },
            editMovie: {
                type: new GraphQLList(inputType),
                args: {
                    title: {
                        type: GraphQLString
                    },
                    overview: {
                        type: GraphQLString
                    },
                    poster_path: {
                        type: GraphQLString
                    },
                    popularity: {
                        type: GraphQLFloat
                    },
                    tag: {
                        type: new GraphQLList(GraphQLString)
                    }
                },
                resolve(obj, args) {
                    let data = Movies.update(args)
                    return data
                }
            },
        }
    })
})

module.exports = GQLSchema