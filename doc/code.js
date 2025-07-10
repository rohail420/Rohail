let data = [];

// Prevent form from refreshing the page
document.getElementById("employeeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Store values from the form
  let firstname = document.getElementById("firstName").value;
  let lastname = document.getElementById("lastName").value;
  let job = document.getElementById("job").value;
  let salary = document.getElementById("salary").value;
  let jobLevel = document.getElementById("jobLevel").value;
  let company = document.getElementById("company").value;

  // Create person object
  function person(firstname, lastname, job, salary, jobLevel, company) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.job = job;
    this.salary = salary;
    this.jobLevel = jobLevel;
    this.company = company;
  }

  // Make constructor
  let employee = new person(firstname, lastname, job, salary, jobLevel, company);
  console.log(employee.lastname);

  data.push(employee);
  console.log(data);

  // Export to CSV if  20 entries
  if (data.length == 20) {
    exportToCSV(data);

   
    let salaries = [];
    for (let i = 0; i < data.length; i++) {
      salaries.push(data[i].salary);
    }
    console.log("Salaries:", salaries);
  }

  // Clear the textboxes after submission
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("job").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("jobLevel").value = "";
  document.getElementById("company").value = "";
});

// CSV conversion function
function convertToCSV(arr) {
  if (arr.length === 0) return "";

  // Extract headers from object keys
  const headers = Object.keys(arr[0]).join(",") + "\n";

  // Map rows: convert each object values to comma-separated string
  const rows = arr.map(obj => Object.values(obj).join(",")).join("\n");

  return headers + rows;
}

// CSV export function
function exportToCSV(data, filename = "employees.csv") {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
