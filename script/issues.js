const api = "https://phi-lab-server.vercel.app/api/v1/lab/issues";


// LOAD ALL ISSUES

const loadIssues = async () => {

document.getElementById("loader").classList.remove("hidden");

const res = await fetch(api);

const data = await res.json();

displayIssues(data.data);

document.getElementById("loader").classList.add("hidden");

};

loadIssues();



// DISPLAY ISSUES

const displayIssues = (issues) => {

const container = document.getElementById("issue-container");

container.innerHTML = "";

issues.forEach(issue => {

const div = document.createElement("div");

const borderColor =
issue.status === "open" ? "green" : "purple";

div.style.borderTop = `5px solid ${borderColor}`;

div.classList = "bg-white p-5 rounded shadow";

div.innerHTML = `

<h2 class="font-bold text-lg">${issue.title}</h2>

<p class="text-sm mt-2">${issue.description}</p>

<p class="mt-2">Status: ${issue.status}</p>

<p>Category: ${issue.category}</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p class="text-sm mt-2">Created: ${issue.createdAt}</p>

`;

container.appendChild(div);

});

};



// FILTER OPEN CLOSED

const filterIssues = async (status) => {

const res = await fetch(api);

const data = await res.json();

let issues = data.data;

if(status !== "all"){

issues = issues.filter(issue => issue.status === status);

}

displayIssues(issues);

};



// SEARCH ISSUE

const searchIssue = async () => {

const text = document.getElementById("search-text").value;

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

const data = await res.json();

displayIssues(data.data);

};