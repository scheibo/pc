pc.data.Distance.KILOMETRES_PER_MILE = 1.60934400579467;
pc.data.Distance.METRES_PER_KILOMETRE = 1000;
pc.data.Distance.YARDS_PER_MILE = 1760;

pc.data.Distance = function(metres) {
  this.metres = metres;
}

// COMMAND LINE SHOULD HAVE HISTORY CONTROL
// Pseudo:
// given a command line:
// - try to match a pace (can only be one)
// - if no pace, try to match time
// - try to match distance
// if there is 2, compute the third
// if only one, compute the equivalents
