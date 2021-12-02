import './App.css'
import React from 'react'

//vaid query from the GraphQL site for launches - save to a variable
const LAUNCHES_QUERY = `
{
  launchesPast(limit: 10) {
    id
    mission_name
  }
}
`
const SHIP_QUERY = `
{
  ships {
    image
  }
}
`

//use the fetch API built into the browser - Axios would also work here 

export default function App() {

const [launches, setLaunches] = React.useState([])
const [ships, setShips] = React.useState([])

console.log(setShips)
  
React.useEffect(() => {
    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({query: LAUNCHES_QUERY})
    }).then((response) => response.json())
      .then(data => setLaunches(data.data.launchesPast))
      
  }, [])
 
  React.useEffect(() => {
    
    fetch('https://api.spacex.land/graphql/', {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({query: SHIP_QUERY})
    }).then((response) => response.json())
      .then(data => console.log(data))
    
      
  }, [])
  
  //setShips(data.ships)
  //console.log(data)
  
  return (
    <>
    <div>
      <h1>CloudShelf GraphQL fetch example from SpaceX Graphql api</h1>
    </div>
      <ul>
      {launches.map((launch) => (
        <li key={launch.id}>{launch.mission_name} {ships.image}</li>
      ))}
      </ul>
    </>
  )

}

