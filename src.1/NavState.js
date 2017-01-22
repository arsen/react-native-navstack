import NavEvents from './NavEvents';

export default {
  push(route, routeParams, transition) {
    NavEvents.emit('push', route, routeParams, transition);
  },
  pop() {
    NavEvents.emit('pop');
  }
};