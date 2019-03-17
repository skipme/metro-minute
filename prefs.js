var _def_prefs_ = {
		metro_city: "spb",
		metro_station: 0
	};

var preferences = 
{
	common_prefs: null,

	read_model: async function(function_callback)
	{
		var that = this;

		this.common_prefs = {};

		data = await that.readAsync("ExtensionPrefs");

		if(data === undefined || data._ytranslate_ === undefined)
			data = _def_prefs_;
		
		this.common_prefs = data;

		// console.log("ep", that.extension_prefs);
		
		function_callback();
	},

	storage_error_callback: function(err)
	{
		console.log("prefs storage_error_callback", err);
	},
	read: function (string_key, function_callback) 
	{
		let gettingItem = browser.storage.local.get(string_key);
		gettingItem.then(
			function(object_data)
			{
				if(object_data === undefined || object_data[string_key] === undefined)
					function_callback(undefined);
				else	
					function_callback(object_data[string_key]);
			}, 
			this.storage_error_callback);
	},
	readAsync: function (string_key) 
	{
		return new Promise(resolve => {
			let gettingItem = browser.storage.local.get(string_key);
			gettingItem.then(
				function(object_data)
				{
					if(object_data === undefined || object_data[string_key] === undefined)
						resolve(undefined);
					else	
						resolve(object_data[string_key]);
				}, 
				this.storage_error_callback);
	  	});
		
	},
	write: function (string_key, object_data) 
	{
		var set_pocket = {};
		set_pocket[string_key] = object_data;
		// console.log("set_pocket", set_pocket)
		let settingItem = browser.storage.local.set(set_pocket);// fire and forget
		settingItem.then(function(){console.log("write ok", string_key)}, this.storage_error_callback);
	},
	getPrefs: function()
	{
		return this.common_prefs;
	},
	setPrefs: function(prefs)
	{
		prefs["_metro-minute_"] = "0.1";
		this.common_prefs = prefs;
		this.write("ExtensionPrefs", this.common_prefs);
	}
}; 
