var preferences = null;
var metrodata = null;

// document.body.style.border = "1px solid red";
// console.log("hey hh, i am loaded!")

var stations =  undefined
var from = undefined

function get(s1, s2)
{
	var r1 = stations.indexOf(s1)
	var r2 = stations.indexOf(s2.replace("ё","е"))

	if(r1<0 || r2<0)return undefined;

	var precalc = r1 > r2  ? metrodata.generated[r2][r1-r2 -1] : metrodata.generated[r1][r2-r1 -1]
	return precalc
}

function minute(number_minute)
{
	return (Math.round(number_minute/60))+" мин."
}

dispatch(CONST.ACTION_F_metroData, function(data){
			console.log("metrodata", data)
			metrodata = data 
			if(metrodata === null ||metrodata.stations === undefined) return

			stations = metrodata.stations.map(function(m){
				return m.replace("ё","е").replace(/\s/,"_").toLocaleLowerCase()
			})

			from = metrodata.stations[preferences.metro_station].replace("ё","е").replace(/\s/,"_").toLocaleLowerCase()

			mark_station_labels() 
		});

dispatch(CONST.ACTION_F_options, function(_prefs){
		console.log(_prefs)
		
		preferences = _prefs;

		if(metrodata === null || metrodata.stations === undefined) return
		from = metrodata.stations[preferences.metro_station].replace("ё","е").replace(/\s/,"_").toLocaleLowerCase()
		mark_station_labels() 
	});

connected();
