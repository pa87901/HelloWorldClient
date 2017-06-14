import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 25,
    backgroundColor: 'white'
  },
  header: {
    color: '#FF830D',
    fontSize: 50,
    fontFamily: 'Arial Rounded MT Bold',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 35
  },
  flexSwitchContainer: {
    marginTop: 20,
    height: 250,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  checkboxText: {
    marginTop: 8,
    textAlign: 'center',
    flex: 0,
    fontFamily: 'Arial Rounded MT Bold',
    fontSize: 18,
    fontWeight: '900',
    color: 'white'
  },
  checkboxTextInactive: {
    marginTop: 8,
    textAlign: 'center',
    flex: 0,
    fontFamily: 'Arial Rounded MT Bold',
    fontSize: 18,
    fontWeight: '900',
    color: '#FF830D'
  },
  checkbox: {
    margin: 5,
    borderWidth: 2.5, 
    borderColor: '#FF830D',
    backgroundColor: '#FF830D',
    alignItems: 'center',
    flexGrow: 1,
    zIndex: 0,
    color: 'white',
    borderRadius: 25,
    flexWrap: 'wrap',
    height: 44,
    width: 150,
  },
  checkboxInactive: {
    margin: 5,
    borderWidth: 2.5, 
    borderColor: '#FF830D',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 25,
    flexWrap: 'wrap',
    height: 44,
    width: 150,
  },
  baseColor: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  picker: {
    width: 350,
  },
  date: {
    fontSize: 20,
  },
  timeContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    height: 45,
    borderColor: '#FF830D',
    borderWidth: 2.5,
    fontFamily: 'Arial',
    color: 'black'
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: '#FF830D',
    borderWidth: 2.5,
  },
  orangeText: {
    color: '#FF830D',
    backgroundColor: 'white',
    fontSize: 18,
  },
  orangeContainer: {
    backgroundColor: 'rgba(255, 131, 17, 0.15)',
    // backgroundColor:'black',
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  fullWidthButton: {
    backgroundColor: '#FF830D',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Arial Rounded MT Bold'
  },
  searchTextInput: {
    fontFamily: 'Arial Rounded MT Bold'
  },
  orangeTintContainer: {
    // borderWidth:5,
    backgroundColor: 'rgba(255, 131, 17, 0.15)',
    flexGrow: 1
  },
  orangeContainerTop:{
    // margin: ,
    borderTopWidth: 15, 
    borderColor: '#FF830D',
    backgroundColor: '#FF830D',
    alignItems: 'center',
    flexGrow: 1,
    zIndex: 0,
    color: 'white',
    // borderRadius: 25,
    flexWrap: 'wrap',
    // height: 50,
    // width: 150,
    position: 'relative'
  },
  orangeBar: {
    backgroundColor: '#FF830D',
    zIndex: 0,
    color: 'white',
    height: 80
  },
  headerText:{
    color: 'white',
    fontSize: 25
  }
});
