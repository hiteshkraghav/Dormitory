import React from 'react';
import {STUDENTS} from '../studentsList'
// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [year, month, day] = joiningDate.split('-');
	const [yyyy, mm, dd] = validityDate.split('-');
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return (maxValid >= selected) && (maxValid >= today);
}

function checkCorrect(name,joiningDate,props,setName,setDate)
{ 
	let isPresent=false;
	let studentDetails =null;
	STUDENTS.forEach((item)=>{
		if(item.name.toLowerCase()==name.toLowerCase())
		{	isPresent = true;
			studentDetails = item;
		}	
	}) ;
	if(!isPresent)
	{	
		props.setErr(`Sorry, ${name} is not a verified student!`);
	
	}
	else
	{
		let val= checkValidity(joiningDate,studentDetails.validityDate);
		if(val)
		{
			props.setResidents(residents=>[...residents,studentDetails.name]);
			props.setErr('');
		}
		else
		{
			props.setErr(`Sorry, ${name}'s validity has Expired!`);
	
		}
	}
	setName('');
	setDate('');
}
function Search(props) {
	const [name,setName] = React.useState('');
	const[date,setDate] = React.useState(null);
	return (
		<div className="my-50 layout-row align-items-end justify-content-end">
			<label htmlFor="studentName">Student Name:
				<div>
					<input value={name} onChange={(e)=>setName(e.target.value)} id="studentName" data-testid="studentName" type="text" className="mr-30 mt-10"/>
				</div>
			</label>
			<label htmlFor="joiningDate">Joining Date:
				<div>
					<input value={date} onChange={e=>setDate(e.target.value)}  data-testid="joiningDate" type="date" className="mr-30 mt-10"/>
				</div>
			</label>
			<button onClick={()=>checkCorrect(name,date,props,setName,setDate)} type="button" data-testid="addBtn" className="small mb-0">Add</button>
		</div>
	);
}

export default Search;
