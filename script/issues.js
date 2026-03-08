const api =
 "https://phi-lab-server.vercel.app/api/v1/lab/issues";


 // LOAD ISSUES
const loadIssues = async () => {
   document.getElementById("loader")
   .classList.remove("hidden");
   const res = await fetch(api);
   const data = await res.json();
   displayIssues(data.data);
   document.getElementById("loader")
   .classList.add("hidden");
};
loadIssues();


// DISPLAY ISSUES
const displayIssues = (issues) => {

  document.getElementById("issue-count")
  .innerText = issues.length + " Issues";

   const container =
   document.getElementById("issue-container");
   container.innerHTML = "";
   issues.forEach(issue => {

   const div = document.createElement("div");
   const borderColor =
   issue.status === "open" ? "green" : "purple";
   const priorityColor =
    issue.priority === "high"
    ? "bg-red-100 text-red-500"
    : issue.priority === "medium"
    ? "bg-yellow-100 text-yellow-500"
    : "bg-green-100 text-green-500";

   div.style.borderTop =
   `4px solid ${borderColor}`;

   div.className =
   "bg-white p-5 rounded shadow cursor-pointer  mx-auto ";

   div.innerHTML = `
    <div class="flex justify-between items-center">
       <span class="flex items-center gap-1 font-semibold">
       <img src="${
       issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png"
       }" alt="${issue.status}" class="w-5 h-5">
      </span>
      <span class="text-xs px-2 py-1 rounded ${priorityColor}">
       ${issue.priority}
      </span>
    </div>
     <h2 class="font-bold mt-2">${issue.title}</h2>
     <p class="text-sm text-gray-500 mt-2">${issue.description}</p>
    <div class="flex gap-2 mt-3"> 
      <span class=" w-[60px] text-xs border px-2 py-1 rounded-2xl text-red-500 border-red-300 flex gap-2"><img src="assets/Vector (8).png" alt="">
      BUG
      </span>
      <span class=" w-[125px] text-xs border px-2 py-1 rounded-2xl text-yellow-500 border-yellow-300 gap-2 flex"><img src="assets/Vector (7).png" alt="">
      HELP WANTED
      </span>
    </div>
    <div class="border-t mt-4 pt-3 text-xs text-gray-500">
      #${issue.id} by ${issue.author}
      <br>
      ${issue.createdAt}
    </div>
    `;
 
// date
const today = new Date().toLocaleDateString();
  document.getElementById("date-text").innerText += today;


div.onclick = () => {
  document.getElementById("modal-title")
  .innerText = issue.title;
  document.getElementById("modal-desc")
   .innerText = issue.description;
  document.getElementById("modal-status")
  .innerText = "" + issue.status;
  document.getElementById("modal-author")
  .innerText = "Assignee: " + issue.author;
  document.getElementById("modal-another")
  .innerText = "• Opended: " + issue.author;

  document.getElementById("modal-priority")
  .innerText = " Priority: " + issue.priority;
  document.getElementById("issueModal")
  .showModal();
};

container.appendChild(div);
});
};

// FILTER ISSUES
const filterIssues = async (status) => {
  const res = await fetch(api);
  const data = await res.json();
  let issues = data.data;

  if(status !== "all"){
  issues = issues.filter(
  issue => issue.status === status
  );
  }
  displayIssues(issues);
};

// SEARCH ISSUE
const searchIssue = async () => {
  const text =
  document.getElementById("search-text").value;
  const res = await fetch(
  `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

const data = await res.json();
displayIssues(data.data);
};

  //  filter buttons
  const filterButtons = document.querySelectorAll(".flex.gap-4 button");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("btn-primary"));
      button.classList.add("btn-primary");
    });
  });
