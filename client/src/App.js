import {useQuery, gql} from "@apollo/client";
import "./App.css";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      user {
        name
        email
        phone
      }
    }
  }
`;

function App() {
  const {loading, error, data} = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Title</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data?.getTodos?.map((todo, index) => (
              <tr key={todo.id}>
                <td>{index + 1}</td>
                <td>{todo.title}</td>
                <td>{todo?.user?.name}</td>
                <td>{todo?.user?.phone}</td>
                <td>{todo?.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
