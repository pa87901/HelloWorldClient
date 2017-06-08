import { Platform } from 'react-native';

export default function testID(id) {
  return Platform.OS === 'ios' ?
    { accessible: true, accessibilityLabel: id } :
    { testID: id };
}
