
function mark_station_labels() 
{
	document.querySelectorAll(".metro-station").forEach(function(m){
		if(m.childNodes.length < 2)return;

		var s = m.childNodes[1].textContent
		var tildei = -1
		if((tildei = s.indexOf("≈")) >= 0)s = m.childNodes[1].textContent = s.substring(0, tildei-1)
		if(s.length > 0)
		{
				var minutes = get(from, s.trim().replace(/\s/,"_").toLocaleLowerCase());
				if(minutes === undefined){ 
					console.log(s, s.trim().replace(/\s/,"_").toLocaleLowerCase(), minutes)
					return;
				}
		}
		  
		 m.childNodes[1].textContent += " ≈ " + minute(minutes);
	})
	document.querySelectorAll("span[data-qa=vacancy-view-raw-address]").forEach(function(m){
		m.childNodes.forEach(function(me){
			if(me.nodeName === "#text")
			{
				var s = me.textContent
				var tildei = -1
				if((tildei = s.indexOf("≈")) >= 0)s = me.textContent = s.substring(0, tildei-1)
				if(s.length > 0)
				{
					var minutes = get(from, s.replace(/\,.+/,"").trim().replace(/\s/,"_").toLocaleLowerCase());
					if(minutes === undefined){ 
						console.log(s, s.replace(/\,.+/,"").trim().replace(/\s/,"_").toLocaleLowerCase(), minutes)
						return;
					}
				}
				  
				me.textContent += " ≈ " + minute(minutes);
			}
		})
	})
	
}
