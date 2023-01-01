// initialization
let step = document.querySelectorAll(".step");
let mains = document.querySelectorAll(".mains");
let stepArr = Array.from(step);
let mainsArr = Array.from(mains);
let nextBtn = document.getElementById("next");
let toggleBtn = document.getElementById("toggle");
let MonthAndYear = document.getElementById("monthAndYear");
let plan_Amt = document.querySelectorAll(".plan_Amt");
let opt1 = document.getElementById("opt1");
let opt2 = document.getElementById("opt2");
let opt3 = document.getElementById("opt3");
let free = document.querySelectorAll(".free");
let plan_opt = document.querySelectorAll(".plan_opt");
let doubleCheckPlan = document.getElementById("planHead");
let doubleCheckPlanAmt = document.getElementById("S_Amt_plan");
let checkBoxOption = document.querySelectorAll("input[type=checkbox]");
let selected_Area = document.getElementById("selected");
let containerOfCheckbox = document.querySelectorAll(".checkOpt");
let totalParent = document.getElementById("total");
let goBackBtn = document.getElementById("goBack");
let submitSec = document.getElementById("submitSec");
let required = document.getElementById("required");
let inputNumber = document.getElementById("inputNumber");

var i = 0;
var int = 0;
var wrongNumber;

//regex for extracting integer from string
let Reg = /[0-9]+/g;

//default arrangement
MonthAndYear.children[0].style.color = "hsl(213, 96%, 18%)";
MonthAndYear.children[2].style.color = "hsl(231, 11%, 63%)";
plan_Amt[0].innerHTML = "$9/mo";
plan_Amt[1].innerHTML = "$12/mo";
plan_Amt[2].innerHTML = "$15/mo";
free[0].style.display = "none";
free[1].style.display = "none";
free[2].style.display = "none";
containerOfCheckbox[0].children[2].innerHTML = "+$1/mo";
containerOfCheckbox[1].children[2].innerHTML = "+$2/mo";
containerOfCheckbox[2].children[2].innerHTML = "+$2/mo";
totalParent.children[0].children[0].innerHTML = "(per month)";
submitSec.style.display = "block";
goBackBtn.style.display = "none";
// indicates that you are  in step one
let val1 = window.getComputedStyle(mainsArr[0]).getPropertyValue("display");
if (val1 != "none") {
  stepArr[0].children[0].style.backgroundColor = "hsl(206, 94%, 87%)";
  stepArr[0].children[0].style.color = "hsl(213, 96%, 18%)";
  stepArr[0].children[0].style.borderColor = "hsl(206, 94%, 87%)";
} else {
  stepArr[0].children[0].style.backgroundColor = "hsl(243, 100%, 62%)";
  stepArr[0].children[0].style.color = "hsl(0, 0%, 100%)";
  stepArr[0].children[0].style.borderColor = "hsl(0, 0%, 100%)";
}

// functionality of Next Btn
nextBtn.addEventListener("click", () => {
  if (
    (inputNumber.value != "" && wrongNumber == true) ||
    inputNumber.value == ""
  ) {
    required.style.display = "block";
    inputNumber.style.borderColor = "hsl(354, 75%, 31%)";
  } else if (i == 1) {
    planSelectedChecker();
  } else {
    nextStepMover();
  }
});
//functionality for go back btn
goBackBtn.addEventListener("click", () => {
  i--;
  if (i > 0) {
    goBackBtn.style.display = "block";
  } else {
    goBackBtn.style.display = "none";
  }
  if (i == 3) {
    nextBtn.value = "Confirm";
  } else {
    nextBtn.value = "Next Step";
  }
  mainsArr.forEach((item, element) => {
    let val0 = window.getComputedStyle(item).getPropertyValue("display");
    if (val0 != "none") {
      mainsArr[element].style.display = "none";
      mainsArr[element - 1].style.display = "block";
    }
  });
  mainsArr.forEach((item, element) => {
    let val0 = window.getComputedStyle(item).getPropertyValue("display");
    if (val0 != "none") {
      console.log(step[element]);
      step[element].children[0].style.backgroundColor = "hsl(206, 94%, 87%)";
      step[element].children[0].style.color = "hsl(213, 96%, 18%)";
      step[element].children[0].style.borderColor = "hsl(206, 94%, 87%)";
    } else {
      step[element].children[0].style.backgroundColor = "hsl(243, 100%, 62%)";
      step[element].children[0].style.color = "hsl(0, 0%, 100%)";
      step[element].children[0].style.borderColor = "hsl(0, 0%, 100%)";
    }
  });
});
//Functionality for toggle btn
let BtnSwitch = 1;
toggleBtn.addEventListener("click", () => {
  if (BtnSwitch == 0) {
    toggleBtn.children[0].style.marginLeft = "0px";
    toggleBtn.children[0].style.marginRight = "auto";
    MonthAndYear.children[0].style.color = "hsl(213, 96%, 18%)";
    MonthAndYear.children[2].style.color = "hsl(231, 11%, 63%)";

    plan_Amt[0].innerHTML = "$9/mo";
    plan_Amt[1].innerHTML = "$12/mo";
    plan_Amt[2].innerHTML = "$15/mo";

    free[0].style.display = "none";
    free[1].style.display = "none";
    free[2].style.display = "none";

    containerOfCheckbox[0].children[2].innerHTML = "+$1/mo";
    containerOfCheckbox[1].children[2].innerHTML = "+$2/mo";
    containerOfCheckbox[2].children[2].innerHTML = "+$2/mo";

    totalParent.children[0].children[0].innerHTML = "(per month)";
    BtnSwitch = 1;
  } else {
    toggleBtn.children[0].style.marginRight = "0px";
    toggleBtn.children[0].style.marginLeft = "auto";
    MonthAndYear.children[0].style.color = "hsl(231, 11%, 63%)";
    MonthAndYear.children[2].style.color = "hsl(213, 96%, 18%)";
    plan_Amt[0].innerHTML = "$90/yr";
    plan_Amt[1].innerHTML = "$120/yr";
    plan_Amt[2].innerHTML = "$150/yr";

    free[0].style.display = "block";
    free[1].style.display = "block";
    free[2].style.display = "block";

    containerOfCheckbox[0].children[2].innerHTML = "+$10/yr";
    containerOfCheckbox[1].children[2].innerHTML = "+$20/yr";
    containerOfCheckbox[2].children[2].innerHTML = "+$20/yr";

    totalParent.children[0].children[0].innerHTML = "(per year)";

    BtnSwitch = 0;
  }
});

let planOpt1 = {
  opt: 1,
  plan: opt1,
  selected: false,
  planCost: plan_Amt[0],
};
let planOpt2 = {
  opt: 2,
  plan: opt2,
  selected: false,
  planCost: plan_Amt[1],
};
let planOpt3 = {
  opt: 3,
  plan: opt3,
  selected: false,
  planCost: plan_Amt[2],
};

let arr = [planOpt1, planOpt2, planOpt3];

// functioning for selecting plan
arr.forEach((item, element) => {
  arr[element].plan.addEventListener("click", (e) => {
    if (arr[element].selected == false) {
      arr[element].plan.style.border = "1px solid hsl(243, 100%, 62%)";
      arr[element].plan.style.backgroundColor = "hsl(217, 100%, 97%)";
      let word = String(arr[element].planCost.innerHTML);
      word = parseInt(word.match(Reg));
      int = word;
      //condition to display plan in finishing up step
      if (BtnSwitch == 1) {
        doubleCheckPlan.children[0].innerHTML =
          arr[element].plan.children[1].children[1].innerHTML + "(monthly)";
        doubleCheckPlanAmt.innerHTML =
          arr[element].plan.children[1].children[2].innerHTML;
      } else {
        doubleCheckPlan.children[0].innerHTML =
          arr[element].plan.children[1].children[1].innerHTML + "(yearly)";
        doubleCheckPlanAmt.innerHTML =
          arr[element].plan.children[1].children[2].innerHTML;
      }
      arr[element].selected = true;
      if (arr[element].opt == 1) {
        arr[1].plan.style.border = "1px solid hsl(231, 11%, 63%)";
        arr[1].plan.style.backgroundColor = "hsl(0, 0%, 100%)";
        arr[1].selected = false;
        arr[2].plan.style.border = "1px solid hsl(231, 11%, 63%)";
        arr[2].plan.style.backgroundColor = "hsl(0, 0%, 100%)";
        arr[2].selected = false;
      } else if (arr[element].opt == 2) {
        arr[0].plan.style.border = "1px solid hsl(231, 11%, 63%)";
        arr[0].plan.style.backgroundColor = "hsl(0, 0%, 100%)";
        arr[0].selected = false;
        arr[2].plan.style.border = "1px solid hsl(231, 11%, 63%)";
        arr[2].plan.style.backgroundColor = "hsl(0, 0%, 100%)";
        arr[2].selected = false;
      } else {
        arr[0].plan.style.border = "1px solid hsl(231, 11%, 63%)";
        arr[0].plan.style.backgroundColor = "hsl(0, 0%, 100%)";
        arr[0].selected = false;
        arr[1].plan.style.border = "1px solid hsl(231, 11%, 63%)";
        arr[1].plan.style.backgroundColor = "hsl(0, 0%, 100%)";
        arr[1].selected = false;
      }
    } else {
      arr[element].plan.style.border = "1px solid hsl(231, 11%, 63%)";
      arr[element].plan.style.backgroundColor = "hsl(0, 0%, 100%)";
      arr[element].selected = false;
    }
  });
});
// chechbox functionality
let checkBoxOption_Arr = Array.from(checkBoxOption);

checkBoxOption_Arr.forEach((item, element) => {
  checkBoxOption[element].addEventListener("click", () => {
    if (checkBoxOption_Arr[element].checked == true) {
      containerOfCheckbox[element].style.borderColor="hsl(243, 100%, 62%)";
      containerOfCheckbox[element].style.backgroundColor="hsl(217, 100%, 97%)";
      // creating  div element by js
      let S_addOn = document.createElement("div");
      S_addOn.classList = "S_addOn";
      let S_addOnTitle = document.createElement("p");
      S_addOnTitle.classList = "S_addOnTitle";
      let S_amt = document.createElement("span");
      S_amt.classList = "S_amt";

      S_addOn.append(S_addOnTitle);
      S_addOn.append(S_amt);
      S_addOnTitle.innerText = checkBoxOption_Arr[element].value;
      S_amt.innerText = containerOfCheckbox[element].children[2].innerHTML;
      selected_Area.appendChild(S_addOn);
      var amt = String(containerOfCheckbox[element].children[2].innerHTML);
      amt = amt.match(Reg);
      int += parseInt(amt);
    } else{
      containerOfCheckbox[element].style.borderColor=" hsl(231, 11%, 63%)";
      containerOfCheckbox[element].style.backgroundColor="hsl(0, 0%, 100%)";
    }                                                                                                                                                                                                     
    // functioning to remove non checked from finishing up step
    let selected_AreaChilds = document.querySelectorAll(".S_addOn");
    let arr = Array.from(selected_AreaChilds);
    arr.forEach((item, element) => {
      if (checkBoxOption[0].checked == false) {
        if (arr[element].children[0].innerHTML == checkBoxOption[0].value) {
          selected_Area.removeChild(arr[element]);
          //deducting addon amt which are not selected
          if (BtnSwitch == 1) {
            int -= 1;
          } else {
            int -= 10;
          }
        }
      } 
      if (checkBoxOption[1].checked == false) {
        if (arr[element].children[0].innerHTML == checkBoxOption[1].value) {
          selected_Area.removeChild(arr[element]);
          //deducting addon amt which are not selected
          if (BtnSwitch == 1) {
            int -= 2;
          } else {
            int -= 20;
          }
        }
      } 
      if (checkBoxOption[2].checked == false) {
        if (arr[element].children[0].innerHTML == checkBoxOption[2].value) {
          selected_Area.removeChild(arr[element]);
          //deducting addon amt which are not selected
          if (BtnSwitch == 1) {
            int -= 2;
          } else {
            int -= 20;
          }
        }
      }
    });
  });
});
function total() {
  if (BtnSwitch == 1) {
    totalParent.children[1].innerHTML = `$${int}/mo`;
  } else {
    totalParent.children[1].innerHTML = `$${int}/yr`;
  }
}

//functionality to enter correct number
inputNumber.addEventListener("input", () => {
  var len = inputNumber.value;
  required.style.display = "none";
  console.log(len.length);
  if (len.length > 10) {
    inputNumber.style.borderColor = "hsl(354, 75%, 31%)";
    required.innerHTML = "Enter a valid phone no.";
    wrongNumber = true;
  } else {
    inputNumber.style.borderColor = "hsl(231, 11%, 63%)";
    required.innerHTML = "This field is required";
    wrongNumber = false;
  }
  return len;
});

//function to check whether the plan is selected or not
function planSelectedChecker() {
  if ((planOpt1.selected || planOpt2.selected || planOpt3.selected) == true) {
    nextStepMover();
  } else {
    alert("please select a plan");
  }
}
//function to move forward and Indicator for  in which step is you are
function nextStepMover() {
  required.style.display = "none";
  inputNumber.style.borderColor = "hsl(231, 11%, 63%)";
  i++;
  if (i > 0) {
    goBackBtn.style.display = "block";
  }

  if (nextBtn.value == "Confirm") {
    submitSec.style.display = "none";
   
  }

  if (i == 3) {
    nextBtn.value = "Confirm";
    nextBtn.style.backgroundColor="hsl(243, 100%, 62%)";
    var hover=window.getComputedStyle(nextBtn).getPropertyValue("hover");
    console.log(hover)
    total();
  } else {
    nextBtn.value = "Next Step";
  }

  if (i == 4) {
    mainsArr[i - 1].style.display = "none";
    mainsArr[i].style.display = "flex";
  } else {
    mainsArr.forEach((item, element) => {
      let val1 = window.getComputedStyle(item).getPropertyValue("display");
      if (val1 != "none") {
        
        mainsArr[element].style.display = "none";
        mainsArr[i].style.display = "block";
      }
    });
  }

  mainsArr.forEach((item, element) => {
    let val0 = window.getComputedStyle(item).getPropertyValue("display");
    if (val0 != "none") {
      if(i<=3){
      step[element].children[0].style.backgroundColor = "hsl(206, 94%, 87%)";
      step[element].children[0].style.color = "hsl(213, 96%, 18%)";
      step[element].children[0].style.borderColor = "hsl(206, 94%, 87%)";
    }else{
      step[3].children[0].style.backgroundColor = "hsl(206, 94%, 87%)";
      step[3].children[0].style.color = "hsl(213, 96%, 18%)";
      step[3].children[0].style.borderColor = "hsl(206, 94%, 87%)";
    }
    } else {
      step[element].children[0].style.backgroundColor = "transparent";
      step[element].children[0].style.color = "hsl(0, 0%, 100%)";
      step[element].children[0].style.borderColor = "hsl(0, 0%, 100%)";
    }
  });
  int = 0;
}
