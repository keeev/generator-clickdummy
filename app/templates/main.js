<% if(includePulpmediaNotice) {%>
if(typeof console !== 'undefined' && typeof console.log !== 'undefined') {
	console.log('Crafted and created by Pulpmedia. Visit www.Pulpmedia.com');
} else {
	console = {};
	console.log = console.error = function() {};
}
<% } %>
