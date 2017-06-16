import { StyleSheet } from 'react-native';

const main = {
  color: '#FF830D',
  colorTint: 'rgba(255, 131, 17, 0.15)',
  font: 'Arial Rounded MT Bold',
  secondFont: 'Arial'
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
  whiteBackground: {
    backgroundColor: 'white',
    flex: 1,
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
    paddingLeft: 6,
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
    backgroundColor: main.colorTint,
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
    backgroundColor: main.colorTint,
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
    // marginBottom: 5
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
    width:150,
    marginBottom: 5,
    marginLeft: 15
  },
  searchResultImage: {
    height: 125, 
    width: 125, 
    marginRight: 15, 
    marginBottom: 20, 
    borderColor: 'white'
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
  orangeTintBar: {
    backgroundColor: main.color,
    zIndex: 0,
    height: 80
  },
  toolbarText: {
    color: 'white',
    fontSize: 40,
    fontFamily: main.font
  },
  toolbarIcon: {
    color: 'white',
    fontSize: 25,
    marginBottom: 13
  },
  // selected profile
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
  orangeTintProfileContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    marginBottom: 66
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
    // alignItems: 'center'
  },
  profileName: {
    fontFamily: main.font,
    fontSize: 20
  },
  profileImage: {
    width: 276,
    height: 276,
    borderRadius: 138
  },
  profileIntro: {
    fontFamily: 'Arial',
    fontSize: 16,
  },
  doubleButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  doubleButtonText: {
    fontSize: 23,
    color: 'white',
    fontFamily: main.font
  },
  affirmativeButton: {
    backgroundColor: '#FF830D',
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  negativeButton: {
    backgroundColor: '#00acdb',
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  profileSubheader: {
    fontFamily: main.font,
    fontSize: 18
  },
  profileFlexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    marginTop: 8
  },
  reviewList: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: 8,
    paddingLeft: 12
  },
  //Trip Views
  TripCardText: {
    fontSize: 15,
    marginTop: 10,
    fontFamily: main.font
  },
  orangeTripCardText: {
    fontSize: 15,
    marginTop: 10,
    fontFamily: main.font,
    color: main.color
  },
  smallAffirmativeButton: {
    backgroundColor: '#FF830D',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  smallNegativeButton: {
    backgroundColor: '#00acdb',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  smallDoubleButtonText: {
    fontSize: 15,
    color: 'white',
    fontFamily: main.font
  },
  tripHeader: {
    color: 'black',
    fontSize: 17,
    fontFamily: main.font,
    justifyContent: 'center',
    alignItems: 'center'
  },
  requestTripModal: {
    height: 350,
    width: 350,
    backgroundColor: 'white',
    marginTop: 100,
    paddingTop: 20,
  },
  // Booking Confirmation
  bookingConfirmText: {
    fontSize: 22,
    color: 'white',
    fontFamily: main.font    
  },
  bookingConfirmSubtext: {
    fontFamily: 'Arial',
    fontSize: 12
  },
  placeImage: {
    height: 220,
  },
  bookingConfirmDetails: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 25,
    paddingBottom: 25,
    flexGrow: 1,
    backgroundColor:
    'white',
    flexWrap: 'wrap'
  },
  bookingConfirmDates: {
    fontFamily: main.font,
    fontSize: 18,
    color: main.color
  },
  termsConditions: {
    marginTop: 20,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 25,
    paddingBottom: 25,
    flexGrow: 1,
    backgroundColor:
    'white',
    flexWrap: 'wrap'
  },
  // Booking Confirmation
  goToExplore: {
    fontSize: 18,
    color: 'white',
    fontFamily: main.font    
  },
  // Profile Modals
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(120, 125, 127, 0.4)'
  },
  modal: {
    width: 350,
    backgroundColor: 'white',
    marginTop: 100,
    paddingTop: 20,
  },
  textInputContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: main.color,
    flexWrap: 'wrap'
  },
  inquirySubmitButton: {
    backgroundColor: main.color,
    height: 50,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  inquirySubmitText: {
    fontSize: 20,
    color: 'white',
    fontFamily: main.font    
  },
  tripToolbarText: {
    fontSize: 15,
    fontFamily: 'Arial Rounded MT Bold',
    marginBottom: 13,
    color: 'white'
  },
  tripToolBarIcon: {
    color: 'white',
    fontSize: 23,
    marginBottom: 13
  },
  smallSubmitButton: {
    // flex: 1,
    backgroundColor: '#FF830D',
    height: 33,
    // width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // flexGrow: 1,
    // marginLeft: 110
  },
  reviewModalContainer: {
    // marginTop: 230,
    // flexDirection: 'column',
    // alignItems: 'center',
    flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(120, 125, 127, 0.4)'
  },
  reviewSubmitButton: {
    backgroundColor: main.color,
    height: 50,
    width: 345,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tipbox: {
    margin: 5,
    borderWidth: 2.5,
    borderColor: main.color,
    backgroundColor: main.color,
    alignItems: 'center',
    zIndex: 0,
    color: 'white',
    borderRadius: 25,
    height: 44,
    width: 75,
  },
  tipboxInactive: {
    margin: 5,
    borderWidth: 2.5, 
    borderColor: main.color,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 25,
    height: 44,
    width: 75,
  },
  tipboxText: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: main.font,
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
  },
  tipboxTextInactive: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: main.font,
    fontSize: 18,
    fontWeight: '900',
    color: main.color
  },
  tipFlexSwitchContainer: {
    marginTop: 20,
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  //Specialties Page
  specialtySubheader: {
    fontFamily: main.font,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  //Map Modal
  radius: {
    height: 40,
    width: 40,
    borderRadius: 40/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.3)'
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute' 
  },
  mapDoubleButtonText: {
    fontSize: 15,
    color: 'white',
    fontFamily: main.font
  },
  // Become A Guide
  becomeAGuideSubtitle: {
    fontFamily: main.font,
    fontSize: 12
  }
});
