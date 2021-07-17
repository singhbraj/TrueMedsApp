import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Grid, Icon, Table,Image,Loader } from "semantic-ui-react";
import { fetchData } from "../../redux/action/fetchData_action";

class View extends Component {
  state = {
    minutes: 1,
    seconds: 0,
    articleList: [],
    isLoading:true
  };

  componentDidMount() {
    this.countDown();
   
  }

  fetchArticles = () => {
   
    let response = null;
    let data = {};
    this.props.dispatch(fetchData(data)).then(() => {
      response = this.props.FetchDataResponse.response;
      if (!!response && response) {
          
            this.setState({
                articleList: response.result.article,
                isLoading:false,
              },()=>console.log(this.state.articleList));
          
      
      }
    });
  };

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  countDown = () => {
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
            this.fetchArticles()
          
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  handleReset = () => {
    this.setState(
      {
        minutes: 1,
        seconds: 0,
        articleList:[],
        isLoading:true
      },
      () => this.countDown()
    );

    // setTimeout(() => {
    //     this.fetchArticles();
    //   }, 10000);

  };

  signOut = () => {
    console.log("Signed out call hit");
    localStorage.clear();
    this.props.history.push({
      pathname: "/",
    });
  };

  generateLayout = () =>{
      
    let layout = []

    !!this.state.articleList && this.state.articleList.map((item)=>{
        layout.push(
            <Table.Row textAlign="center">
               <Table.Cell width>
               <span>{item.categoryId}</span>
               </Table.Cell>
               <Table.Cell>
               <span>{item.categoryName}</span>
               </Table.Cell>
               <Table.Cell>
                <span>{item.name}</span>
               </Table.Cell>
               <Table.Cell>
             <span>{item.author}</span>
               </Table.Cell>
               <Table.Cell>
             <span>{item.description}</span>
               </Table.Cell>
               <Table.Cell>
               <Image src={item.image} style={{height:'300px', width:'400px',marginLeft:'20px'}} />
               </Table.Cell>
            </Table.Row>
        )
    })
    return layout
      
  }


  render() {
    const { minutes, seconds } = this.state;

    return (
      <div >
        <Grid style={{  backgroundColor: "#cccccc" }}>
          <Grid.Row>
            <Grid.Column width="8" style={{ marginTop: "20px" }}>
              {minutes === 0 && seconds === 0 ? (
                <Button
                  color="teal"
                  style={{ marginLeft: "20px" }}
                  onClick={() => this.handleReset()}
                >
                  Reset Timer
                </Button>
              ) : (
                <span
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bolder",
                    marginLeft: "20px",
                  }}
                >
                  Time Remaining: {minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              )}
            </Grid.Column>
            <Grid.Column
              width="8"
              textAlign="right"
              verticalAlign="middle"
              onClick={() => this.signOut()}
              // style={{ marginTop: "1.5em", marginRight: "1em" }}
            >
              <span
                style={{
                  color: "black",
                  fontStyle: "italic",
                  fontSize: "1.5em",
                  fontWeight: "bolder",
                  marginRight: "10px",
                }}
              >
                Logout <Icon name="arrow right" size="small"  />{" "}
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table celled striped >
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell width="1">CategoryId</Table.HeaderCell>
              <Table.HeaderCell width="1">CategoryName</Table.HeaderCell>
              <Table.HeaderCell width="3">Name</Table.HeaderCell>
              <Table.HeaderCell width="2">Author</Table.HeaderCell>
              <Table.HeaderCell width="5">Description</Table.HeaderCell>
              <Table.HeaderCell width="4">Image</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
       
          { this.generateLayout() }
          
        
        </Table.Body>
        </Table>
        {
            this.state.isLoading == true ?  <Loader active inline='centered' />
            : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    FetchDataResponse: state.FetchDataResponse,
  };
};

export default connect(mapStateToProps)(View);
