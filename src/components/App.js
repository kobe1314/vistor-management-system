import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodoContainer'
import VisibleTodoList from '../containers/VisibleTodoList'

const goToAboutPage = (props) => {
  props.history.push('/about');
}
const App = (props) => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <button onClick={() => goToAboutPage(props)}>Go to about page</button>
  </div>
)



export default App;