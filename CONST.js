// REASON_ENDPOINT_COMMAND-NAME
// [ACTION/QUERY]_[B/F/C/W]_*
window.CONST = 
{
	ACTION_B_BEEP: 0,
	ACTION_F_BEEP: 1,

	ACTION_F_options: 10,
	ACTION_F_metroData: 11,

	QUERY_B_options: 20,
	ACTION_B_options: 21,

	ACTION_C_options: 30,
};
window.clone = function clone(o) {
 if(!o || 'object' !== typeof o)  {
   return o;
 }
 var c = 'function' === typeof o.pop ? [] : {};
 var p, v;
 for(p in o) {
 if(o.hasOwnProperty(p)) {
  v = o[p];
  if(v && 'object' === typeof v) {
    c[p] = clone(v);
  }
  else {
    c[p] = v;
  }
 }
}
 return c;
}
