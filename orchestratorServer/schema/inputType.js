const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql')

const inputType = new GraphQLObjectType({
    name: 'inputType',
    fields: {
        _id: {
            type: GraphQLID
        },
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
    }
})

module.exports = inputType