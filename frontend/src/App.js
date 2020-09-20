
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {HeadingWithList} from './Components';


function App() {
  return(<Router>
    <Switch>
      <Route exact path="/:id" children={<HeadingWithList type="Things To Do" typePlaceholder="Add New Task"/>} />
      <Route path="/" children={<HeadingWithList type="To Do Bucket List" typePlaceholder="Add New BucketList"/>} />
    </Switch>
  </Router>
  )
}

export default App;
