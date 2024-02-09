// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in' , pageSize: 8 ,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string ,
    pageSize: PropTypes.number ,
    category: PropTypes.string
  }
  


   capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  constructor(props)
  {
      super(props);
      console.log("i am a constructor from news component")

      this.state = {
          articles : [] ,
          loading : true ,
          page: 1 ,
          totalResults: 0
      }

      document.title = `${this.capitalizeFirstLetter(this.props.category)} - news updates`;
  }


  async updateNews(pageNo)
  {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=$40c11b5caf6f4f2880eaf1bfa1ce55ad&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState( {loading: true} );
    let data = await fetch(url); // return a promise
    let parseddata = await data.json();

    console.log(parseddata);

    this.setState( {articles: parseddata.articles , totalResults: parseddata.totalResults , loading: false} )

    this.props.setProgress(100);
  }

  async componentDidMount()
  {
    this.updateNews();
  }


   handleprevclick = async () => {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40c11b5caf6f4f2880eaf1bfa1ce55ad&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState( {loading: true} );
    // let data = await fetch(url); // return a promise
    // let parseddata = await data.json();

    // console.log(parseddata);

    //   this.setState({
    //      page: this.state.page - 1 ,
    //      articles: parseddata.articles ,
    //      loading: false
    //   })

    this.setState({page: this.state.page - 1});
    this.updateNews();

  }

   handlenextclick = async () => {

    // if( this.state.page + 1 >  Math.ceil( this.state.totalresults / this.props.pageSize ))
    // {
      
    // }

    // else
    // {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40c11b5caf6f4f2880eaf1bfa1ce55ad&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState( {loading: true} );
    //   let data = await fetch(url); // return a promise
    //   let parseddata = await data.json();

    //   // this.setState( {loading: false} );

    //   console.log(parseddata);

    //     this.setState({
    //       page: this.state.page + 1 ,
    //       articles: parseddata.articles ,
    //       loading: false
    //     })
    // }

      this.setState({page: this.state.page + 1});
      this.updateNews();

  }


  fetchMoreData = async() => {
    
      this.setState({page: this.state.page + 1})
     
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=40c11b5caf6f4f2880eaf1bfa1ce55ad&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState( {loading: true} );
      let data = await fetch(url); // return a promise
      let parseddata = await data.json();
  
      console.log(parseddata);
  
      this.setState( {
        articles: this.state.articles.concat(parseddata.articles) ,
         totalResults: parseddata.totalResults ,
          loading: false} )
  };


  render() {
    return (
      <>
                <h2 className="text-center" style={{margin: '35px 1px'}}> News Updates - Read our top &nbsp; 
                 {this.capitalizeFirstLetter(this.props.category)} headlines </h2>


                 <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

            <div className="container">

                <div className="row">

                        { this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url} >
                            <Newsitem  title = {element.title?element.title.slice(0 , 18): "Spassky plays the King's Gambit! "} 
                            description = {element.description?element.description.slice(0 , 60):" Boris Spassky, world champion from 1969 to 1972, celebrates his 87th birthday on 30 January. Spassky is regarded as a universal player and played nu..."} 
                            imageurl = {element.urlToImage ? element.urlToImage :"https://www.google.com/search?q=chess+image+spassky&tbm=isch&ved=2ahUKEwjV57Lj0IWEAxXxu2MGHetYDKIQ2-cCegQIABAA&oq=chess+image+spassky&gs_lcp=CgNpbWcQAzoECCMQJzoFCAAQgAQ6BAgAEB46BggAEAUQHjoGCAAQCBAeOgcIABCABBAYUIIlWNE5YIQ7aABwAHgAgAGvAYgBnAqSAQQwLjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=CDG5ZdXDEfH3juMP67GxkAo&bih=575&biw=1242#imgrc=E88c4_20YLKTKM"} 
                            newsurl = {element.url ? element.url: "https://www.google.com/search?q=chess+image+spassky&tbm=isch&ved=2ahUKEwjV57Lj0IWEAxXxu2MGHetYDKIQ2-cCegQIABAA&oq=chess+image+spassky&gs_lcp=CgNpbWcQAzoECCMQJzoFCAAQgAQ6BAgAEB46BggAEAUQHjoGCAAQCBAeOgcIABCABBAYUIIlWNE5YIQ7aABwAHgAgAGvAYgBnAqSAQQwLjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=CDG5ZdXDEfH3juMP67GxkAo&bih=575&biw=1242#imgrc=E88c4_20YLKTKM"}
                            author = {element.author} date = {element.publishedAt} source = {element.source.name} />
                     </div>
                        })}

                </div>
                </div>
                </InfiniteScroll>

                  
               

      </>
    )
  }
}

export default News