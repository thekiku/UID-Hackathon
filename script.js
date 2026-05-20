const dateTime=document.getElementById("datetime");

if(dateTime){
setInterval(()=>{
const now=new Date();
dateTime.innerHTML=now.toLocaleString();
},1000);
}

let participantCount=0;

const participants=[];

const sportsForm=document.getElementById("sportsForm");

if(sportsForm){

sportsForm.addEventListener("submit",function(e){

e.preventDefault();

const studentName=document.getElementById("studentName").value.trim();
const regNo=document.getElementById("regNo").value.trim();
const email=document.getElementById("email").value.trim();
const mobile=document.getElementById("mobile").value.trim();
const department=document.getElementById("department").value.trim();
const year=document.getElementById("year").value.trim();
const eventSelect=document.getElementById("eventSelect").value;
const participationType=document.getElementById("participationType").value;
const teamName=document.getElementById("teamName").value.trim();
const teamMembers=document.getElementById("teamMembers").value.trim();

const message=document.getElementById("sportsMessage");

message.className="";
message.innerHTML="";

const namePattern=/^[A-Za-z ]+$/;
const regPattern=/^[A-Z]{2}[0-9]{3}$/;
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern=/^[0-9]{10}$/;

if(!namePattern.test(studentName)){
message.classList.add("error");
message.innerHTML="Invalid student name";
return;
}

if(!regPattern.test(regNo)){
message.classList.add("error");
message.innerHTML="Registration number format should be like CS101";
return;
}

if(!emailPattern.test(email)){
message.classList.add("error");
message.innerHTML="Invalid email format";
return;
}

if(!mobilePattern.test(mobile)){
message.classList.add("error");
message.innerHTML="Mobile number must be 10 digits";
return;
}

if(eventSelect===""){
message.classList.add("error");
message.innerHTML="Please select an event";
return;
}

if(eventSelect==="Badminton"){
message.classList.add("error");
message.innerHTML="Selected event is closed";
return;
}

if(participationType===""){
message.classList.add("error");
message.innerHTML="Select participation type";
return;
}

if(participationType==="Team"){

if(teamName===""){
message.classList.add("error");
message.innerHTML="Enter team name";
return;
}

if(teamMembers<2||teamMembers>6){
message.classList.add("error");
message.innerHTML="Team size must be between 2 and 6";
return;
}

}

const duplicate=participants.find(
participant=>
participant.regNo===regNo&&
participant.eventSelect===eventSelect
);

if(duplicate){
message.classList.add("error");
message.innerHTML="Duplicate participation is not allowed";
return;
}

participants.push({
regNo,
eventSelect
});

participantCount++;

document.getElementById("participantCount").innerHTML=participantCount;

message.classList.add("success");
message.innerHTML="Registration Successful";

const display=document.getElementById("participantDisplay");

display.innerHTML+=`
<div class="card">
<h3>Participant Details</h3>
<p><strong>Name:</strong> ${studentName}</p>
<p><strong>Register No:</strong> ${regNo}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Mobile:</strong> ${mobile}</p>
<p><strong>Department:</strong> ${department}</p>
<p><strong>Year:</strong> ${year}</p>
<p><strong>Event:</strong> ${eventSelect}</p>
<p><strong>Participation:</strong> ${participationType}</p>
<p><strong>Team Name:</strong> ${teamName||"N/A"}</p>
<p><strong>Team Members:</strong> ${teamMembers||"N/A"}</p>
</div>
`;

sportsForm.reset();

});
}

let totalRating=0;
let feedbackCount=0;

const feedbackForm=document.getElementById("feedbackForm");

if(feedbackForm){

feedbackForm.addEventListener("submit",function(e){

e.preventDefault();

const fbName=document.getElementById("fbName").value.trim();
const fbRegNo=document.getElementById("fbRegNo").value.trim();
const fbEvent=document.getElementById("fbEvent").value;
const rating=document.getElementById("rating").value;
const comments=document.getElementById("comments").value.trim();

const feedbackMessage=document.getElementById("feedbackMessage");

feedbackMessage.className="";
feedbackMessage.innerHTML="";

const regPattern=/^[A-Z]{2}[0-9]{3}$/;

if(!regPattern.test(fbRegNo)){
feedbackMessage.classList.add("error");
feedbackMessage.innerHTML="Invalid registration number";
return;
}

if(fbEvent===""){
feedbackMessage.classList.add("error");
feedbackMessage.innerHTML="Select an event";
return;
}

if(rating===""){
feedbackMessage.classList.add("error");
feedbackMessage.innerHTML="Select rating";
return;
}

if(comments.length<20){
feedbackMessage.classList.add("error");
feedbackMessage.innerHTML="Comments must contain minimum 20 characters";
return;
}

feedbackMessage.classList.add("success");
feedbackMessage.innerHTML="Feedback submitted successfully";

const feedbackSummary=document.getElementById("feedbackSummary");

feedbackSummary.innerHTML+=`
<div class="card">
<h3>Feedback Summary</h3>
<p><strong>Name:</strong> ${fbName}</p>
<p><strong>Register No:</strong> ${fbRegNo}</p>
<p><strong>Event:</strong> ${fbEvent}</p>
<p><strong>Rating:</strong> ${rating}</p>
<p><strong>Comments:</strong> ${comments}</p>
</div>
`;

totalRating+=Number(rating);
feedbackCount++;

document.getElementById("averageRating").innerHTML=
(totalRating/feedbackCount).toFixed(2);

feedbackForm.reset();

});
}