var exports = module.exports = {};

/**
 * Determines equivalent performances using
 *
 * @param {pc.data.performance} perf
 * @return {Array.<pc.data.performance>} equivs
 */
pc.calc.mercier = function(perf) {
 // TODO calculate both man and women
 // TODO calculate all events at once


  var ev = perf.getEvent();
  var secs = perf.getTime().toSeconds();

  var equivs = [];

// indexed by event
var SCORE = {
         "100m" : [ 290.52712, 1953.2266 ],
         "200m" : [ 267.75893, 1703.6447 ],
         "400m" : [ 262.37121, 1402.7708 ],
         "800m" : [ 302.9089, 1377.5673 ],
        "1500m" : [ 320.6038, 1314.0045 ],
        "3000m" : [ 331.264214, 1240.294895 ],
        "5000m" : [ 342.8535, 1234.1959 ],
       "10000m" : [ 349.8535, 1171.2847 ],
"Half Marathon" : [ 366.3739581, 1168.783894 ],
     "Marathon" : [ 384.5408, 1161.8021 ],
         "Mile" : [ 321.7731201, 1306.285127 ],
       "2 mile" : [ 333.4505158, 1241.705275 ],
      "10 mile" : [ 360.6890152, 1164.451907 ],
};

var base, offset  = SCORE[ev];
var score = base * (distance/secs) - offset;
var gender_scores;

if (perf.getGender() == pc.data.gender.MALE) {
  gender_scores =  [ score, (1.10218405*score) - 370.23683 ];
} else {
  gender_scores = [ (score + 370.23683)/1.10218405, score ];
}



 function MercierCalc(form) {

  if (comp_name == "100m") {
    comp_perf_h = "";
    comp_perf_m = "";
    comp_perf_s = 100/(0.003439*score+6.72526) ;}
  if (comp_name == "200m") {
    comp_perf_h = "";
    comp_perf_m = "";
    comp_perf_s = 200/(0.003734*score+6.36315) ;}
  if (comp_name == "400m") {
    comp_perf_h = "";
    comp_perf_m = "";
    comp_perf_s = 400/(0.0038105*score+5.34719); }

  if (comp_name == "800m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(800/(0.003300*score+4.54844)/60);
    comp_perf_s1 = ((800/(0.003300*score+4.54844)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "1500m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(1500/(0.003117*score+4.09988)/60);
    comp_perf_s1 = ((1500/(0.003117*score+4.09988)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "3000m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(3000/(0.0030147*score+3.74703401)/60);
    comp_perf_s1 = ((3000/(0.0030147*score+3.74703401)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "5000m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(5000/(0.0029129*score+3.602496)/60);
    comp_perf_s1 = ((5000/(0.0029129*score+3.602496)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "10000m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(10000/(0.002857*score+3.348169)/60);
    comp_perf_s1 = ((10000/(0.002857*score+3.348169)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "Half Marathon") {
    comp_perf_h = Math.floor(42194.99/2/(0.00272793*score+3.1912339)/3600);
    comp_perf_m1 = Math.floor(((42194.99/2/(0.00272793*score+3.1912339)/3600)-comp_perf_h)*60);
    if (Math.floor(comp_perf_m1/10) > 0) {
      comp_perf_m = comp_perf_m1;}
     else {
      comp_perf_m = "0"+comp_perf_m1;}
    comp_perf_s1 = ((((42194.99/2/(0.00272793*score+3.1912339)/3600)-comp_perf_h)*60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "Marathon") {
    comp_perf_h = Math.floor(42194.99/(0.0025989*score+3.022432)/3600);
    comp_perf_m1 = Math.floor(((42194.99/(0.0025989*score+3.022432)/3600)-comp_perf_h)*60);
    if (Math.floor(comp_perf_m1/10) > 0) {
      comp_perf_m = comp_perf_m1;}
     else {
      comp_perf_m = "0"+comp_perf_m1;}
    comp_perf_s1 = ((((42194.99/(0.0025989*score+3.022432)/3600)-comp_perf_h)*60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "Mile") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(1609.34/(0.0031062*score+4.060811045)/60);
    comp_perf_s1 = ((1609.34/(0.0031062*score+4.060811045)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }


  if (comp_name == "2 mile") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(2*1609.34/(0.0029949*score+3.726724)/60);
    comp_perf_s1 = ((2*1609.34/(0.0029949*score+3.726724)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "10 mile") {
    comp_perf_h = Math.floor(16093.4/(0.0027716*score+3.2290278)/3600);
    comp_perf_m1 = Math.floor(((16093.4/(0.0027716*score+3.2290278)/3600)-comp_perf_h)*60);
    if (Math.floor(comp_perf_m1/10) > 0) {
      comp_perf_m = comp_perf_m1;}
     else {
      comp_perf_m = "0"+comp_perf_m1;}
    comp_perf_s1 = ((((16093.4/(0.0027716*score+3.2290278)/3600)-comp_perf_h)*60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }
}


/*
 function MercierCalc(form) {
  var perf0 = parseFloat(form.perf_sm.value);
  var perf_min = parseFloat(form.perf_mm.value);
  var perf_hr = parseFloat(form.perf_h.value);

  var event1 = form.Event.selectedIndex;
  var event_name = form.Event.options[event1].text;

  var comp1 = form.Comp.selectedIndex;
  var comp_name = form.Comp.options[comp1].text;

  var score_temp, score_init;
  var gender1;
  var gender2;
  var noConvert = 0;

  var secs = 60*(60*perf_hr + perf_min) + perf0;

  if (form.gender[0].checked) {
      gender1 = "men";}
   else {
   if (form.gender[1].checked) {
      gender1 = "women";}
   }

  if (form.genderComp[0].checked) {
      gender2 = "men";}
   else {
   if (form.genderComp[1].checked) {
      gender2 = "women";}
   }

  if (isNaN(secs))  {
    alert("Invalid second / metre / point!");
    return;
  }

  if (perf_min >=60) {
    alert("Minutes must be 0-59.");
    return;
  }

  if (form.precision[0].checked) {
      prec1 = "0";}
  if (form.precision[1].checked) {
      prec1 = "1";}
  if (form.precision[2].checked) {
      prec1 = "2";}

  if (event_name == "100m") {
    score = 290.52712*(100/secs) - 1953.2266; }
  if (event_name == "200m") {
    score = 267.75893*(200/secs) - 1703.6447; }
  if (event_name == "400m") {
    score = 262.37121*(400/secs) - 1402.7708; }
  if (event_name == "800m") {
    score = 302.9089*(800/secs) - 1377.5673; }
  if (event_name == "1500m") {
    score = 320.6038*(1500/secs) - 1314.0045; }
  if (event_name == "3000m") {
    score = 331.264214*(3000/secs) -1240.294895; }
  if (event_name == "5000m") {
    score = 342.8535*(5000/secs) - 1234.1959; }
  if (event_name == "10000m") {
    score = 349.8535*(10000/secs) - 1171.2847; }

  if (event_name == "Half Marathon") {
    score = 366.3739581*(42194.99/2/secs) -1168.783894; }
  if (event_name == "Marathon") {
    score = 384.5408*(42194.99/secs) - 1161.8021; }

  if (event_name == "Mile") {
    score = 321.7731201*(1609.34/secs) -1306.285127; }
  if (event_name == "2 mile") {
    score = 333.4505158*(2*1609.34/+secs) -1241.705275; }
  if (event_name == "10 mile") {
    score = 360.6890152*(10*1609.34/secs) -1164.451907; }

  score_temp = score;
  if (gender1 == "women") {
    score_init = (score + 370.23683)/1.10218405;
  }
  else  {
    score_init = score;
  }

  if (gender1 == "women" && gender2 == "men") {
    score  = (score_temp + 370.23683)/1.10218405;
  }

  if (gender1 == "men" && gender2 == "women") {
    score = 1.10218405*score_temp - 370.23683;
  }

  if (comp_name == "100m") {
    comp_perf_h = "";
    comp_perf_m = "";
    comp_perf_s = 100/(0.003439*score+6.72526) ;}
  if (comp_name == "200m") {
    comp_perf_h = "";
    comp_perf_m = "";
    comp_perf_s = 200/(0.003734*score+6.36315) ;}
  if (comp_name == "400m") {
    comp_perf_h = "";
    comp_perf_m = "";
    comp_perf_s = 400/(0.0038105*score+5.34719); }

  if (comp_name == "800m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(800/(0.003300*score+4.54844)/60);
    comp_perf_s1 = ((800/(0.003300*score+4.54844)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "1500m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(1500/(0.003117*score+4.09988)/60);
    comp_perf_s1 = ((1500/(0.003117*score+4.09988)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "3000m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(3000/(0.0030147*score+3.74703401)/60);
    comp_perf_s1 = ((3000/(0.0030147*score+3.74703401)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "5000m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(5000/(0.0029129*score+3.602496)/60);
    comp_perf_s1 = ((5000/(0.0029129*score+3.602496)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "10000m") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(10000/(0.002857*score+3.348169)/60);
    comp_perf_s1 = ((10000/(0.002857*score+3.348169)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "Half Marathon") {
    comp_perf_h = Math.floor(42194.99/2/(0.00272793*score+3.1912339)/3600);
    comp_perf_m1 = Math.floor(((42194.99/2/(0.00272793*score+3.1912339)/3600)-comp_perf_h)*60);
    if (Math.floor(comp_perf_m1/10) > 0) {
      comp_perf_m = comp_perf_m1;}
     else {
      comp_perf_m = "0"+comp_perf_m1;}
    comp_perf_s1 = ((((42194.99/2/(0.00272793*score+3.1912339)/3600)-comp_perf_h)*60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "Marathon") {
    comp_perf_h = Math.floor(42194.99/(0.0025989*score+3.022432)/3600);
    comp_perf_m1 = Math.floor(((42194.99/(0.0025989*score+3.022432)/3600)-comp_perf_h)*60);
    if (Math.floor(comp_perf_m1/10) > 0) {
      comp_perf_m = comp_perf_m1;}
     else {
      comp_perf_m = "0"+comp_perf_m1;}
    comp_perf_s1 = ((((42194.99/(0.0025989*score+3.022432)/3600)-comp_perf_h)*60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "Mile") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(1609.34/(0.0031062*score+4.060811045)/60);
    comp_perf_s1 = ((1609.34/(0.0031062*score+4.060811045)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }


  if (comp_name == "2 mile") {
    comp_perf_h = "";
    comp_perf_m = Math.floor(2*1609.34/(0.0029949*score+3.726724)/60);
    comp_perf_s1 = ((2*1609.34/(0.0029949*score+3.726724)/60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (comp_name == "10 mile") {
    comp_perf_h = Math.floor(16093.4/(0.0027716*score+3.2290278)/3600);
    comp_perf_m1 = Math.floor(((16093.4/(0.0027716*score+3.2290278)/3600)-comp_perf_h)*60);
    if (Math.floor(comp_perf_m1/10) > 0) {
      comp_perf_m = comp_perf_m1;}
     else {
      comp_perf_m = "0"+comp_perf_m1;}
    comp_perf_s1 = ((((16093.4/(0.0027716*score+3.2290278)/3600)-comp_perf_h)*60)-comp_perf_m)*60;
    if (Math.floor(comp_perf_s1/10) > 0) {
      comp_perf_s = comp_perf_s1;}
     else {
      comp_perf_s = "0"+comp_perf_s1;}
  }

  if (prec1 == "0") {
    form.Score.value = Math.ceil(score_init);
  }

  if (prec1 == "1") {
    form.Score.value = Math.round(score_init*10)/10;
  }

  if (prec1 == "2") {
    form.Score.value = Math.round(score_init*100)/100;
  }

  form.comparison_h.value = comp_perf_h;
  form.comparison_m.value = comp_perf_m;
  form.comparison_s.value = comp_perf_s;

  return;
} */
