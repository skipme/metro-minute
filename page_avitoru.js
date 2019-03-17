
function mark_station_labels() 
{
	function getmetro(str)
	{	
	    const regex = /м\.\s+([\sА-Яа-я\-]+)/g;
		let m;

		while ((m = regex.exec(str)) !== null) {
		    // This is necessary to avoid infinite loops with zero-width matches
		    if (m.index === regex.lastIndex) {
		        regex.lastIndex++;
		    }
		    
		    // The result can be accessed through the `m`-variable.

		    if(m.length === 2)
		    	return m[1];
		}

	}
	document.querySelectorAll(".item_table-description div.data").forEach(function(m){
		m.childNodes.forEach(function(me){
			if(me.nodeName === "P")
			{
				var s = getmetro(me.textContent)
				if(s === undefined)return
				var tildei = -1
				if((tildei = me.textContent.indexOf("≈")) >= 0)me.textContent = me.textContent.substring(0, tildei-1)
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
