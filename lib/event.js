'use strict';

// TODO - use for 
class Event {
  constructor(name, metres) {
    this.name_ = name;
    this.metres_ = metres;
  }

  get name() {
    return this.name_;
  }

  get metres() {
    return this.metres_;
  }
  
  static match(str, opt_state) {

  }

  static getEvents() {
    return Event.EVENTS_;
  }
}

EVENTS = {
   new Event("100m", 100),
   new Event("200m", 200),
   new Event("400m", 400),
   new Event("800m", 800),
   new Event("1500m", 1500),
   new Event("Mile", TODO),
   new Event("3000m", 3000),
   new Event("2 mile", TODO),
   new Event("5000m", 5000),
   new Event("5 mile", TODO),
   new Event("10,000m", 10000),
   new Event("10 mile", TODO),
   new Event("Half Marathon", TODO),
   new Event("Marathon", TODO)
];
Event.EVENTS_ = EVENTS;

const NAME_MAPPING = new Map();
for (var e : EVENTS) {
  NAME_MAPPING.put(e.name, e);
}
Event.NAME_MAPPING_ = NAME_MAPPING;

exports.Event = Event;
