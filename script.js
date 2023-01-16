var table = document.getElementById("receipt-table");
var people = ["You"];

function addItem() {
  var item = document.getElementById("item-name").value;
  var cost = document.getElementById("item-cost").value;
  var row = table.insertRow(-1);
  var itemCell = row.insertCell(0);
  var costCell = row.insertCell(1);
  var peopleCell = row.insertCell(2);
  
  itemCell.innerHTML = item;
  costCell.innerHTML = cost;
  
  // create a checkbox for each person
  for (var i = 0; i < people.length; i++) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = people[i];
    peopleCell.appendChild(checkbox);
    peopleCell.appendChild(document.createTextNode(people[i]));
    peopleCell.appendChild(document.createElement("br"));
  }
}

function addPerson() {
  var person = document.getElementById("person-name").value;
  people.push(person);
  
  // add the new person to all rows
  for (var i = 1; i < table.rows.length; i++) {
    var peopleCell = table.rows[i].cells[2];
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = person;
    peopleCell.appendChild(checkbox);
    peopleCell.appendChild(document.createTextNode(person));
    peopleCell.appendChild(document.createElement("br"));
  }
}

function calculateTotals() {
    var totals = {};
    var tax = parseFloat(prompt("Please enter the tax amount:"));
    var tip = parseFloat(prompt("Please enter the tip amount:"));
    
    // initialize totals for each person
    for (var i = 0; i < people.length; i++) {
      totals[people[i]] = 0;
    }
    
    // calculate totals for each row
    for (var i = 1; i < table.rows.length; i++) {
      var row = table.rows[i];
      var itemCost = parseFloat(row.cells[1].innerHTML);
      var checkboxes = row.cells[2].getElementsByTagName("input");
      var checkedPeople = [];
      for (var j = 0; j < checkboxes.length; j++) {
        if (checkboxes[j].checked) {
          checkedPeople.push(checkboxes[j].value);
        }
      }
      var split = itemCost / checkedPeople.length;
      for (var j = 0; j < checkedPeople.length; j++) {
        totals[checkedPeople[j]] += split;
      }
    }

    // split tax and tip among all people
  var total = Object.values(totals).reduce((a, b) => a + b);
  for (var person in totals) {
    var personTotal = totals[person];
    var taxSplit = (tax * personTotal) / total;
    var tipSplit = (tip * personTotal) / total;
    totals[person] += taxSplit + tipSplit;
  }
    
    // display totals
    var totalsTable = document.getElementById("totals-table");
    while (totalsTable.rows.length > 0) {
      totalsTable.deleteRow(0);
    }
    for (var person in totals) {
      var row = totalsTable.insertRow(-1);
      var nameCell = row.insertCell(0);
      var totalCell = row.insertCell(1);
      nameCell.innerHTML = person;
      totalCell.innerHTML = totals[person].toFixed(2);
    }
  }
  