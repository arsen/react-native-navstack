# react-native-navstack
High performance navigation library for React Native, based on native animations (LayoutAnimation)

## Install
```shell
npm install --save react-navstack
```

## Example
```js
import { NavProvider, NavScreen, NavState } from 'react-native-navstack';

<NavProvider>

  <NavScreen route="screen1" routeProps={{ someValue: 'cool' }} initial={true}>
    <Screen1 />
  </NavScreen>

  <NavScreen route="screen2">
    <Screen2 />
  </NavScreen>

  <NavScreen route="screen3">
    <Screen3 />
  </NavScreen>

  <NavScreen route="screen4">
    <Screen4 />
  </NavScreen>

</NavProvider>
```
## Supported Transitions
PushFromRight  
PushFromTop  
PushFromBottom  
SlideFromRight  
SlideFromTop  
SlideFromBottom  

## NavScreen
All you screens must be wrapped into NavScreen component.  
NavScreen has 3 public properties
| Prop | Description | Default |
|---|---|---|
|**`route`**|Route key. Must be unique.  |Required|
|**`routeProps`**|Will be passed to the childs as properties |*None*|
|**`transition`**|Animation transition to use |*PushFromRight*|


## NavState reducer
NavState reducer has 2 public methods push and pop  
  
NavState.push([ROUTE NAME], [ROUTE PROPS], [TRANSITION])  
NavState.pop()  
  
From within your components include "NavState"
```js
import { NavState } from 'react-native-navstack';

let customProps = {
  userId: 123,
  userType: 'admin',
  someOtherValue: false,
}
NavState.push('screen2', customProps, 'SlideFromRight');
//to go back you can call
NavState.pop();
```