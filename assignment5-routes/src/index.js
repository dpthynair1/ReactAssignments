import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { useRouteMatch,useParams } from 'react-router';


const users = [
  {
    name: 'John Mayer',
    id: "1",
    
    posts: [
      {
        name: 'A day in the park',
        id: "3",
        description: "There was quite a buzz on social media and we were happy so many participated in the European Day of Parks in one way or another. To get an overview of all that was happening in the media, have a look at our Media and Outreach report: ",
     
      },
      {
        name: 'Street Food',
        id: "4",
        description: "It's cheaper than restaurant food · The cost of street food encourages you to try new foods · The food is often very tasty and good quality.",
        
      }
    ]
  },
  {
    name: 'Greg Walker',
    id: "2",
    
    posts: [
      {
        name: 'Walking in the rain',
        id: "5",
        description: "Phil Spector co-wrote this song with the husband-and-wife songwriting team of Barry Mann and Cynthia Weil. ·",
        
      },
      {
        name: 'Enjoy Summer',
        id: "6",
        description: "Whether you're itching to beat the heat or racing to embrace the sunshine and warmer water, these summertime quotes will definitely get you in the mood for fun in the sun—",
       
      }
    ]
  },
 
]

const Home = () => {
  return <div>
  <h1>Home</h1>
  </div>
}

const Post = () => {
const {userId, subId} = useParams()

const user = users.find(({id}) => id === userId)
.posts.find(({id}) => id === subId)

  return (
    <div>
    <h3>{user.name}</h3>
    <p>{user.description}</p>
    </div>
  )
}

const User = () => {
  const {userId} = useParams()
  const {url,path} = useRouteMatch()

  const user = users.find(({ id }) => id  === userId) 
return <div>
<h2>{user.name}</h2>
<ul>
{
  user.posts.map((sub) => (
    <li key={sub.id}>
    <Link to={`${url}/${sub.id}`}>{sub.name}</Link>
    </li>
  ))
}
</ul>
<hr />
<Route path={`${path}/:subId`}>
<Post />
</Route>

</div>

}
const Users = () => {

  const {url, path} = useRouteMatch()
  return <div>
  <h1>Users</h1>
  <ul>
  {
    users.map(({name,id}) => (
    <li key={id}>
    <Link to={`${url}/${id}`}> {name}</Link>
    </li>

    ))
  }
  </ul>
  <hr />
  <Route path={`${path}/:userId`}>
  <User />
  </Route>
  </div>
}



const App = () => {
  return <div>
  <Router>
  <div style={{width: 1000, margin: '0 auto'}}>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/users'>Users</Link></li>
    </ul>

    <hr />

    <Route exact path='/'>
      <Home />
    </Route>
    <Route path='/users'>
      <Users />
    </Route>
  </div>
</Router>
  </div>
}

ReactDOM.render(
<App />,
  document.getElementById('root')
);


