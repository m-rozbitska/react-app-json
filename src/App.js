import './App.css';
import Records from './records.json';

function App() {
  return (
    <div className="App">
      {
        Records && Records.map(record => {
          return(
            <div className="box" key = { record.id }>
              { record.title } 
              { record.content }
              {record.person && record.person.map( data => {
                return(
                  <div key = { record.id }>
                    {data.name}
                    {data.age}
                    {data.email}
                  </div>
                )
              } ) }
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
