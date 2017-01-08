import NavEvents from './NavEvents';

export default {
  push(route, routeParams) {
    NavEvents.emit('push', route, routeParams);
  }
};