
// if(typeof browser === "undefined")
// {
// 	window.browser = chrome;
// }

preferences.read_model(function()
{
	// prefs loaded
});

var list_connected_tabs = [];
function set_url_tabid(string_url, number_tabId)
{
	remove_tabid(number_tabId);

	if(list_connected_tabs.indexOf(number_tabId) < 0)
		list_connected_tabs.push(number_tabId);

}
function remove_tabid(number_tabId)
{
	if((ref_tabid_ = list_connected_tabs.indexOf(number_tabId)) >= 0)
		list_connected_tabs.splice(ref_tabid_, 1);
}
function handleRemoved(tabId, removeInfo)
{
  if(list_connected_tabs.indexOf(tabId) >= 0)
  	remove_tabid(tabId);
}

browser.tabs.onRemoved.addListener(handleRemoved);
var mskdata = undefined, 
	spbdata = undefined;

function getmskdata(cb)
{
	if(mskdata === undefined)
	{
		fetch(browser.runtime.getURL("msk.json"))
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(myJson) {
		    mskdata = myJson;
		    delete spbdata;

		    cb(mskdata, true);
		  })
		  .catch(error => console.error(error));
	}else
		cb(mskdata)
}
function getspbdata(cb)
{
	if(spbdata === undefined)
	{
		fetch(browser.runtime.getURL("spb.json"))
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(myJson) {
		    spbdata = myJson;
		    delete spbdata;

		    cb(spbdata, true);
		  })
		  .catch(error => console.error(error));
	}else
		cb(spbdata)
}

function sendmetrodata(toid, _prefs_) 
{
	let cbc = getmskdata;
	if(_prefs_.metro_city === "spb")
		cbc = getspbdata;
	cbc((data, is_changed)=>{
		if(list_connected_tabs.indexOf(toid) < 0)
			browser.tabs.sendMessage(toid, {action: CONST.ACTION_F_metroData, args: [data]});
	
		for (var i = 0; i < list_connected_tabs.length; i++)
		{
			let t = list_connected_tabs[i];
			{
				let sent = browser.tabs.sendMessage(t, {action: CONST.ACTION_F_options, args: [_prefs_]});
				
				let tabid = t;
				sent.catch(function(err){
					remove_tabid(tabid);
				});
			}
			if(is_changed)
			{
				let sent = browser.tabs.sendMessage(t, {action: CONST.ACTION_F_metroData, args: [data]});
				
				let tabid = t;
				sent.catch(function(err){
					remove_tabid(tabid);
				});
			}
		}
	})
}

function communication_gate(object_message, sender, sendResponse) 
{
	switch(object_message.action)
	{
		case CONST.ACTION_B_BEEP:

			var cprefs = preferences.getPrefs()

			set_url_tabid(undefined, sender.tab.id);

			browser.tabs.sendMessage(sender.tab.id, {action: CONST.ACTION_F_BEEP});

			browser.tabs.sendMessage(sender.tab.id, {action: CONST.ACTION_F_options, args: [cprefs]});

			let cbc = getmskdata;
			if(cprefs.metro_city === "spb")
				cbc = getspbdata;
			cbc((data, is_changed)=>{browser.tabs.sendMessage(sender.tab.id, {action: CONST.ACTION_F_metroData, args: [data]});})
		break;

		case CONST.ACTION_B_options:
			let _prefs_ = object_message.args[1];

			preferences.setPrefs(_prefs_);
			sendmetrodata(sender.tab.id, _prefs_)
		break;
		default:
			console.log("unknown action main.js: ", object_message);

		break;
	}
}

browser.runtime.onMessage.addListener(communication_gate);
