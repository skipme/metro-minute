
var preferences = null;
var metrodata = null;

function writeprefs()
{
	emit(CONST.ACTION_B_options, preferences);
}

var citysel = document.querySelector("#city")
citysel.addEventListener("change", ()=>{ if(citysel.selectedOptions.length !== 1)return; preferences.metro_city = citysel.selectedOptions[0].value; writeprefs()})

var stationsel = document.querySelector("#station")
stationsel.addEventListener("change", ()=>{ if(stationsel.selectedOptions.length !== 1)return; preferences.metro_station = ~~stationsel.selectedOptions[0].value; writeprefs()})

dispatch(CONST.ACTION_F_metroData, function(data){
			console.log("metrodata", data)

			stationsel.options.length = 0;
			metrodata = data;

			if(!data || data.stations === undefined) return;
			 	
			for (var i = 0; i < data.stations.length; i++) {
				stationsel.options.add(new Option(data.stations[i], i, false, preferences.metro_station === i))
			}
		});

dispatch(CONST.ACTION_C_options, function(_prefs){
		console.log(_prefs)
		
		for (var i = 0; i < citysel.options.length; i++)
		{
			if(citysel.options[i].value === _prefs.metro_city){
				citysel.selectedIndex = i;
				break;
			}
		}
		
		preferences = _prefs;
	});

connected(CONST.QUERY_B_options);
