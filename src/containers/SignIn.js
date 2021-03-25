import React, { Component } from 'react';


class SignIn extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: '',
        password: '',
        token: '',
      }
    }
  
    componentDidMount() {
      // reseting states when user comes back to the login after logging out, so previous users details does not show in the text box
     
        this.setState({
          email: '',
          password: '',
        })
   
    }
    componentWillUnmount() {

    }
  
  
   
  
    signIn = async () => {
       //Client side user validation if user leaves any of the required feilds empty, they will get an error
      if (this.state.email === '' || this.state.password === '') {
        console.log("blank fields")
      }
      else {
        return fetch("http://10.0.2.2:3000/api/user/login", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: (this.state)
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json()
            } else if (response.json.status === 400) {
              throw 'Invalid email/password supplied';
            }
            else if (response.json.status === 500) {
              throw 'server error';
            }
            else {
              throw 'Somthing went wrong';
            }
          })
          .then(async (responseJson) => {
            console.log(responseJson);
            await this.setState({token: responseJson.token});
            
    
            console.log("logged in successfully")
  
          })
          .catch((error) => {
            console.log(error);
        
          })
      }
    }
  
  
  
  
  
  
    render() {
      const navigator = this.props.navigation;
      return (
        <div style={styles.container}>
     
  
            <div style={styles.formItem}>
              <label style={styles.formLabel}>Email:</label>
              <input
                placeholder="Enter an email..."
                style={styles.formInput}
                disabled = {false}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              />
            </div>
  
            <div style={styles.formItem}>
              <label style={styles.formLabel}>Password:</label>
              <input
  
                placeholder="Enter password..."
                style={styles.formInput}
                secureTextEntry
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              />
            </div>
  
            <div style={styles.formItem}>
              <button
                style={styles.buttonStyle}
                onPress={() => this.signIn()}>
                <label style={styles.formTouchText}>Sign In</label>
              </button>
  
  
              <button
                style={styles.buttonStyle}
                onPress={() => navigator.navigate('signup')}>
                <label style={styles.formTouchText}>Go to sign up</label>
              </button>
  
            </div>
  
       
        </div>
      );
    }
  }
  




// My styling Sheet for all pages
const styles = ({
  title: {
    color: '#CC8D17',
    alignSelf: 'center',
    padding: 10,
    fontSize: 25,
  },

  buttonStyle: {
    alignSelf: 'flex-start',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#CC8D17',
    padding: 10,
    marginBottom: 12,
    marginTop: 5,
  },
  titleStyle: {
    marginTop: 50,
    color: '#CC8D17',
    padding: 10,
    fontSize: 25,
  },
  formItem: {
    padding: 10,
    marginTop: 5,
  },
  formLabel: {
    fontSize: 15,
    color: '#CC8D17',
    marginTop: -20,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#CC8D17',
    borderRadius: 20,
  },
  dropDownMenu: {
    width: 130,
    marginTop: 10,
    padding: 10,
    height: 70,
    borderColor: '#CC8D17',
  },
  formTouch: {
    padding: 1,
    alignItems: 'center',
  },
  formTouchText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CC8D17',
  },

  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignSelf: 'stretch',
  },
  imageStretch: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 160,
  },

  txtInitials: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#CC8D17',
    fontSize: 20
  },
  headLine: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 18,
    paddingBottom: 20
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  cancelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  deleteText:
  {
    fontWeight: 'bold',
    color: 'red',
  },
  fields: {
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 15,
    fontSize: 20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  fixTogether: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#BA4A00',
    fontWeight: '600',
    paddingTop: 6,
    paddingBottom: 6
  },
  textHeader: {
    fontSize: 15,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    color: '#171919',
    fontWeight: '600',
    paddingBottom: 6
  },
  centeredTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize: 18
  },

  cancelStyle: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'red',
    marginLeft: 20,
    marginRight: 20,
    padding: 9,
    marginBottom: 15,
  },
  imageStyle: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 160,
    width: 180,
    borderRadius: 300 / 15,
  },
  revImageStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 160,
    width: 180,
    borderRadius: 300 / 15,
  },
  reviewImag: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 120,
    width: 140,
    borderRadius: 300 / 15,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  clickable: {
    fontWeight: "bold",
    fontSize: 25,
    textDecorationLine: "underline"

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end'
    , alignItems: 'center'
  },
  capture: {
    flex: 0
    , borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  camButton: {
    marginTop: 40
  }

});


  
  export default SignIn;