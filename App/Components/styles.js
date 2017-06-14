import { StyleSheet } from 'react-native';

const main = {
  color: '#FF830D',
  font: 'Arial Rounded MT Bold'
};

export default StyleSheet.create({
  //Misc
  font: {
    fontFamily: main.font,
    color: 'white',
    fontSize: 40
  },
  color: {
    color: main.color
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row'
  },
  //Search Screen
  container: {
    flex: 1,
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 25,
    backgroundColor: 'white'
  },
  header: {
    color: main.color,
    fontSize: 50,
    fontFamily: main.font,
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
    fontFamily: main.font,
    fontSize: 18,
    fontWeight: '900',
    color: 'white'
  },
  checkboxTextInactive: {
    marginTop: 8,
    textAlign: 'center',
    flex: 0,
    fontFamily: main.font,
    fontSize: 18,
    fontWeight: '900',
    color: main.color
  },
  checkbox: {
    margin: 5,
    borderWidth: 2.5, 
    borderColor: main.color,
    backgroundColor: main.color,
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
    borderColor: main.color,
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
    borderColor: main.color,
    borderWidth: 2.5,
    fontFamily: 'arial',
    color: 'black'
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: main.color,
    borderWidth: 2.5,
  },
  // Search Result Screen
  orangeText: {
    color: main.color,
    backgroundColor: 'white',
    fontSize: 18,
  },
  orangeContainer: {
    backgroundColor: 'rgba(255, 131, 17, 0.15)',
    flex: 1
  },
  fullWidthButtonText: {
    fontSize: 30,
    color: 'white',
    fontFamily: main.font
  },
  searchTextInput: {
    fontFamily: main.font
  },
  orangeTintContainer: {
    backgroundColor: 'rgba(255, 131, 17, 0.15)',
    flexGrow: 1
  },
  orangeContainerTop: {
    borderTopWidth: 15, 
    borderColor: main.color,
    backgroundColor: main.color,
    alignItems: 'center',
    flexGrow: 1,
    zIndex: 0,
    color: 'white',
    flexWrap: 'wrap',
    position: 'relative'
  },
  searchCardName: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: main.font
  },
  searchCardContainer: {
    borderBottomWidth: 25, 
    borderColor: 'white',
    flex: 1
  },
  searchCardFont: {
    fontFamily: main.font,
    marginBottom: 10
  },
  goButtonTO: {
    flexGrow: 1, 
    height: 36, 
    backgroundColor: '#FF830D'
  },
  goButtonTextView: {
    margin: 5
  },
  goButtonText: {
    textAlign:'center',
    textAlignVertical:'center', 
    color:"white", 
    fontSize: 18,
    fontFamily: main.font,
  },
  specialtiesContainer:{
    flex:1, 
    flexDirection:'row', 
    flexWrap: 'wrap', 
    width:150
  },
  //SearchResultProfile
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  fullWidthButton: {
    backgroundColor: main.color,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  //Toolbar
  orangeBar: {
    backgroundColor: main.color,
    zIndex: 0,
    height: 80
  },
  toolbarText: {
    color: 'white',
    fontSize: 25,
    fontFamily: main.font
  },
  searchTextInput: {
    fontFamily: 'Arial Rounded MT Bold'
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  profileHeader: {
    fontFamily: 'Arial Rounded MT Bold',
    fontSize: 18,
    color: '#FF830D'
  },
  profileHeaderContainer: {
    backgroundColor: 'white',
    height: 72,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 20
  },
  profileCard: {
    paddingTop: 20,
    backgroundColor: 'white',
    width: 350,
    alignItems: 'center'
  },
  profileName: {
    fontFamily: 'Arial Rounded MT Bold',
    fontSize: 20
  },
  profileImage: {
    width: 276,
    height: 276,
    borderRadius: 138
  },
  profileIntro: {
    fontFamily: 'Arial',
    fontSize: 15,
  },
  doubleButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  affirmativeButton: {
    backgroundColor: '#FF830D',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  negativeButton: {
    backgroundColor: '#00acdb',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
});
