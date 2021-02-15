import React from 'react'
import {gql} from "apollo-boost"
import {graphql} from "react-apollo"

const getBooksQuery=gql`
    {
        books {
            name
            id
          }
    }
  
`

function BookList(props) {
    console.log(props);

    // const displayBooks=()=>{
        let data = props.data.books
    //     if (data.loading) {
    //         return (<div>Loading Books</div>)
    //     }else{
    //         return
    // console.log(data);
       const displayBooks=()=>{
            if (props.loading===false){
                return data.map(book=>{
                    return(
                        <li >{book.name}</li>
                    )
                })
            }else{  
                return (<div>Loading books ...</div>)
            }
        } 
    // else{
    //     displayBooks =     <div>Loading Books</div> 
    // }
        
    
    return (
        <div>
              <ul id="book-list">
                  {displayBooks()}
              </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
