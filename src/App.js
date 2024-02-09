import './App.css';

import React, { Component } from 'react'
import Navbar from './componants/Navbar';
import News from './componants/News';
import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  
  Route
} from "react-router-dom";


import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 15;

  state = {
    progress: 10
  }

  setProgress = (progress) =>
  {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
            <Router>
                  <Navbar/>

                  <LoadingBar
                      color='#f11946'
                      progress={this.state.progress}
                     
                   />

                  {/* <News setProgress={this.setProgress}  setProgress={this.setProgress}  pageSize={this.pageSize} country="in" category="science"/> */}

                <Routes>
                      <Route exact path="/" element={<News setProgress={this.setProgress}  apikey = {this.apiKey}  key="general" pageSize={this.pageSize} country="in" category="general" />} />
                      <Route exact path="/business" element={<News setProgress={this.setProgress} apikey = {this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/>}/>
                      <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apikey = {this.apiKey}  key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} />
                      <Route exact path="/health" element={<News setProgress={this.setProgress} apikey = {this.apiKey}  key="health" pageSize={this.pageSize} country="in" category="health"/> } />
                      <Route exact path="/science" element={<News setProgress={this.setProgress} apikey = {this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/> } />
                      <Route exact path="/sports" element={<News setProgress={this.setProgress}  apikey = {this.apiKey}  key="sports" pageSize={this.pageSize} country="in" category="sports"/> } />
                </Routes>
            </Router>
            

      </div>
    )
  }
}
