// Initialize Values
const calcSubmit = document.querySelector('input[type="button"]');
const contextSwitch = 16;
const foraging = 20;

var numOfReps = 0;
var avgSalary = 0;
var avgQuota = 0;
var quotaAttainment = 0;
var timeInMeetings = 0;
var processAdherence = 0;
var nonRevActivitiesValue = 0;
var adherenceDeficit = 0;

// Result Value divs
const nonRevActivities = document.querySelector('#nonRevActivities .resultValue');
const adherenceDef = document.querySelector('#adherenceDef .resultValue');
const totalGap = document.querySelector('#totalGap .resultValue');
const grade = document.querySelector('#grade .resultValue');
const spkRoi = document.querySelector('#spkRoi .resultValue');

// Mimic excel's ROUND formula
function round(num, numDecimalPlaces) {
    var multiplier = Math.pow(10, numDecimalPlaces);
    return Math.round(num * multiplier) / multiplier;
}

// Display numbers with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Set Input Values
function setInputValues(){
    numOfReps = parseInt(document.getElementById('numOfReps').value);
    avgSalary = parseInt(document.getElementById('avgSalary').value);
    avgQuota = parseInt(document.getElementById('avgQuota').value);
    quotaAttainment = parseInt(document.getElementById('quotaAttainment').value) / 100;
    timeInMeetings = parseInt(document.getElementById('timeInMeetings').value);
    processAdherence = parseInt(document.getElementById('processAdherence').value);
}

// Non Revenue Activities Calculations
function nonRevActivitiesCalc(){
    var annualMeetingsHour = timeInMeetings * numOfReps * 12;
    var annualContextHour = contextSwitch * numOfReps * 12;
    var annualForagingHour = foraging * numOfReps * 12;
    var annualMeetingsCost = annualMeetingsHour * (round((avgSalary / 2080),-1));
    var annualMeetingsSavings = annualMeetingsCost * 0.5 * -1;
    var annualContextCost = annualContextHour * (round((avgSalary / 2080),-1));
    var annualContextSavings = annualContextCost * 0.25 * -1;
    var annualForagingCost = annualForagingHour * (round((avgSalary / 2080),-1));
    var annualForagingSavings = annualForagingCost * 0.25 * -1;
    nonRevActivitiesValue = annualMeetingsCost + annualContextCost + annualForagingCost;
    nonRevActivities.innerHTML = '$' + numberWithCommas(nonRevActivitiesValue);
}

// Adherence Deficit Calculations
function adherenceDefCalc(){
    var theoryRev = avgQuota * quotaAttainment * numOfReps;
    switch (processAdherence) {
        case 1: 
        adherenceDeficit = (0.18 * theoryRev);
        break;
        case 2: 
        adherenceDeficit = (0.16 * theoryRev);
        break;
        case 3: 
        adherenceDeficit = (0.14 * theoryRev);
        break;
        case 4: 
        adherenceDeficit = (0.12 * theoryRev);
        break;
        case 5: 
        adherenceDeficit = (0.10 * theoryRev);
        break;
        case 6: 
        adherenceDeficit = (0.08 * theoryRev);
        break;
        case 7: 
        adherenceDeficit = (0.06 * theoryRev);
        break;
        case 8: 
        adherenceDeficit = (0.04 * theoryRev);
        break;
        case 9: 
        adherenceDeficit = (0.02 * theoryRev);
        break;
        case 10: 
        adherenceDeficit = (0.00 * theoryRev);
        break;
    }
    adherenceDef.innerHTML = '$' + numberWithCommas(adherenceDeficit.toFixed(0));
}

// Total Sales Efficacy Gap
function totalGapCalc(){
    totalGapValue = nonRevActivitiesValue + adherenceDeficit;
    totalGap.innerHTML = '$' + numberWithCommas(totalGapValue.toFixed(0));
}

// Sales Team Efficiency Grade
function efficiencyCalc(){
    var theoryRev = avgQuota * quotaAttainment * numOfReps;
    var totalGapValue = nonRevActivitiesValue + adherenceDeficit;
    var theoryQuota = numOfReps * avgQuota;
    var revMinusEfficacy = theoryRev - totalGapValue;
    var theoryPercentage = (revMinusEfficacy / theoryQuota) * 100;
    var theoryPercentageRound = round(round(theoryPercentage,1),0);
    var letterGrade = "F";

    var percentageChart = [
        {"letter": "A+", "percentage": 80, "amount": (theoryQuota * 0.8)},
        {"letter": "A", "percentage": 77, "amount": (theoryQuota * 0.766666666666667)},
        {"letter": "A-", "percentage": 73, "amount": (theoryQuota * 0.733333333333333)},
        {"letter": "B+", "percentage": 70, "amount": (theoryQuota * 0.7)},
        {"letter": "B", "percentage": 67, "amount": (theoryQuota * 0.666666666666667)},
        {"letter": "B-", "percentage": 63, "amount": (theoryQuota * 0.633333333333333)},
        {"letter": "C+", "percentage": 60, "amount": (theoryQuota * 0.6)},
        {"letter": "C", "percentage": 57, "amount": (theoryQuota * 0.566666666666667)},
        {"letter": "C-", "percentage": 53, "amount": (theoryQuota * 0.533333333333333)},
        {"letter": "D+", "percentage": 50, "amount": (theoryQuota * 0.5)},
        {"letter": "D", "percentage": 47, "amount": (theoryQuota * 0.466666666666667)},
        {"letter": "D-", "percentage": 43, "amount": (theoryQuota * 0.433333333333333)},
        {"letter": "F", "percentage": 40, "amount": (theoryQuota * 0.4)}
    ];
    for(i=0;i<percentageChart.length;i++){
        if(revMinusEfficacy <= percentageChart[i].amount && i !== percentageChart.length - 1) {
            if(revMinusEfficacy > percentageChart[i+1].amount) {
                letterGrade = percentageChart[i].letter;
            } else {} } else if (revMinusEfficacy <= percentageChart[percentageChart.length - 1].amount) {
                letterGrade = percentageChart[percentageChart.length - 1].letter;
            }

        grade.innerHTML = letterGrade;
    }
}

// Spekit ROI
function roiCalc(){
    adherenceDefCalc();
    var meetingTimeSPK = ((timeInMeetings * numOfReps * 12) * round(avgSalary/2080, -1)) * 0.5;
    var contextSwitchSPK = ((contextSwitch * numOfReps * 12) * round(avgSalary/2080, -1)) * 0.25;
    var foragingSPK = ((foraging * numOfReps * 12) * round(avgSalary/2080, -1)) * 0.25;
    var spkTotalSavings = adherenceDeficit * 0.5;
    var spekitRoiSavingsNonRev = meetingTimeSPK + contextSwitchSPK + foragingSPK;
    var spkTotalSavingsAdherence = adherenceDeficit * 0.5;
    var spkTotalSavings = spekitRoiSavingsNonRev + spkTotalSavingsAdherence;
    spkRoi.innerHTML = '$' + numberWithCommas(spkTotalSavings.toFixed(0));
}

// Check for complete form
var inputs = document.querySelectorAll('.calcInput input');
for(i=0;i<inputs.length;i++){
    inputs[i].addEventListener('blur',function(){
        displaySubmit();
    })
}

// Input Results
calcSubmit.addEventListener('click', function() {
    const initLoading = setInterval(loading, 50);
    setTimeout(function(){
        clearInterval(initLoading);
        setInputValues();
        nonRevActivitiesCalc();
        roiCalc();
        totalGapCalc();
        efficiencyCalc();
    }, 1000);
});

// Only allow whole numbers 
function onlyNumberKey(evt) {
      var ASCIICode = (evt.which) ? evt.which : evt.keyCode
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
          return false;
      return true;
  }

// Loading animation
function loading(){
        var random = numberWithCommas(Math.floor(10000000 + Math.random() * 90000000));
        var characters = 'ABCDF';
        var charactersLength = characters.length;
        randomLetter = characters.charAt(Math.floor(Math.random() * charactersLength));

        nonRevActivities.innerHTML = "$" + random;
        adherenceDef.innerHTML = "$" + random;
        totalGap.innerHTML = "$" + random;
        spkRoi.innerHTML = "$" + random;
        grade.innerHTML = randomLetter;
}

// Hide submit button until all fields are completed
function displaySubmit(){
    setInputValues();
    if(numOfReps == 0 || avgSalary == 0 || avgQuota == 0 || quotaAttainment == 0 || isNaN(numOfReps) || isNaN(avgSalary) || isNaN(avgQuota) || isNaN(quotaAttainment)){
        calcSubmit.style.display = 'none';
    } else {
        calcSubmit.style.display = 'block';
    }
}

// Custom value display on slider
var range = document.querySelector('#processAdherence');
var bubble = document.querySelector('.bubble');
setBubble(range, bubble);

range.addEventListener("input", () => {
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  var val = range.value;
  var min = range.min ? range.min : 0;
  var max = range.max ? range.max : 100;
  var newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = newVal + "%";
}
