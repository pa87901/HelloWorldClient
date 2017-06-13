import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 25,
    backgroundColor: 'rgba(255, 131, 17, 0.015)'
  },
  header: {
    color: '#FF830D',
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  flexSwitchContainer: {
    height: 250,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  checkboxText: {
    marginTop: 8,
    textAlign: 'center',
    flex: 0,
    fontFamily: 'arial',
    fontSize: 20,
    fontWeight: '900',
    color: 'white'
  },
  checkboxTextInactive: {
    marginTop: 8,
    textAlign: 'center',
    flex: 0,
    fontFamily: 'arial',
    fontSize: 20,
    fontWeight: '900',
    color: '#FF830D'
  },
  checkbox: {
    margin: 5,
    borderWidth: 3, 
    borderColor: '#FF830D',
    backgroundColor: '#FF830D',
    alignItems: 'center',
    flexGrow: 1,
    zIndex: 0,
    color: 'white',
    borderRadius: 25,
    flexWrap: 'wrap',
    height: 50,
    width: 150,
  },
  checkboxInactive: {
    margin: 5,
    borderWidth: 3, 
    borderColor: '#FF830D',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexGrow: 1,
    borderRadius: 25,
    flexWrap: 'wrap',
    height: 50,
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
  switches: {
    // backgroundColor: '#F5FCFF',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 50,
    borderColor: '#FF830D',
    borderWidth: 3    
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderColor: '#FF830D',
    borderWidth: 3,
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  checkedItem: {
    borderRadius: 5,
    width: 150
  },
  unCheckedItem: {
    width: 150
  },
});
