
var hrefdoc = document.location.href
setInterval(()=>{ // spa document, history.push can't accessed, MutationObserver is too for that page - overloaded with scripts, ads, etc...
	if(document.location.href !== hrefdoc)
	{
		hrefdoc = document.location.href
		setTimeout(mark_station_labels, 5000)//5sec
	}
}, 10000)//10sec

function mark_station_labels() 
{
	document.querySelectorAll(".MetroList__stationContent").forEach(function(m){
		var s = m.textContent
		if(s === undefined)return
		var tildei = -1
		if((tildei = m.textContent.indexOf("≈")) >= 0)s = m.textContent = m.textContent.substring(0, tildei-1)
		if(s.length > 0)
		{
			var minutes = get(from, s.replace(/\,.+/,"").trim().replace(/\s/,"_").toLocaleLowerCase());
			if(minutes === undefined){ 
				console.log(s, s.replace(/\,.+/,"").trim().replace(/\s/,"_").toLocaleLowerCase(), minutes)
				return;
			}
		}
		  
		m.textContent += " ≈ " + minute(minutes);
			
	})
	
}
