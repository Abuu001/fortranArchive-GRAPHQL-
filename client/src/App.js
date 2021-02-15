import './App.css';
import BookList from './components/BookList/BookList';
import Apolloclient from "apollo-boost"
import {ApolloProvider} from "react-apollo" 

//apollo client setup
const client = new Apolloclient({
  uri: "http://localhost:3004/book-archive"
})


function App() {  
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
