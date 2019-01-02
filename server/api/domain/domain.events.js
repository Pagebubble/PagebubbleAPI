/**
 * Domain model events
 */

import {EventEmitter} from 'events';
var DomainEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DomainEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Domain) {
  for(var e in events) {
    let event = events[e];
    Domain.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    DomainEvents.emit(event + ':' + doc._id, doc);
    DomainEvents.emit(event, doc);
  };
}

export {registerEvents};
export default DomainEvents;
