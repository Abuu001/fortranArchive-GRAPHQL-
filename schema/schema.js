const graphql= require('graphql')
const Book =require('../models/Book')
const Author =require('../models/Author')

const  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
}  = graphql
const _=require('loadsh')

const BookType= new GraphQLObjectType({
    name : 'Book',
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        genre  : {type : GraphQLString},
        author:{
            type : AuthorType,
            resolve(parent,args){ // responsible for fetching data
                return _.find(author,{id : parent.authorId})
            }
        },
    
    })
})

const  AuthorType= new GraphQLObjectType({
    name : 'Author',
    fields : ()=>({
        id : {type : GraphQLID},
        name : {type : GraphQLString},
        age  : {type : GraphQLInt},
        books:{
            type : new GraphQLList(BookType) ,
            resolve(parent,args){
 
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name :'RootQueryType',
    fields:{
        book:{
            type : BookType,
            args :{id : {type : GraphQLID}},
            resolve(parent,args){
                //code to get data from db /other source
          
            }
        },
        author:{
            type : AuthorType,
            args:{id :{type :GraphQLID}},
            resolve(parent,args){
      
            }
        },
        books:{
            type : new GraphQLList(BookType),
            resolve(parent,args){
              
            }
        },
        authors:{
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
             
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query : RootQuery
})
