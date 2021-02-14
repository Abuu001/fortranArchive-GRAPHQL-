const graphql= require('graphql')
const  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
}  = graphql
const _=require('loadsh')

//dummy data 
let books   =[
    {name : "Inspection",id : '1', authorId:"1"},
    {name : "Variant" ,id : '2' , authorId:"2"},
    {name : "Tlm" ,id : '2' , authorId:"2"},
    {name : "Readyyy" ,id : '2' , authorId:"2"},
    {name : "Helper " ,id : '3', authorId:'3'},  
]

let author   =[
    {name : "Leonard",id : '1',age:21},
    {name : "Jane" ,id : '2' ,age:13},
    {name : "Linet" ,id : '2' ,age:25},
    {name : "Mercy" ,id : '2' ,age:18},
    {name : "Peter " ,id : '3' ,age:27},
]

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
                return _.filter(books,{authorId : parent.id})
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
              return   _.find(books,{id : args.id  })
            }
        },
        author:{
            type : AuthorType,
            args:{id :{type :GraphQLID}},
            resolve(parent,args){
                return _.find(author,{id :args.id})
            }
        },
        books:{
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors:{
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                return author
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query : RootQuery
})
//1:29