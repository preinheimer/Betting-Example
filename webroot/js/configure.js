$(document).ready(function() {
	$('#addButton').attr('disabled', 'disabled');
	$('#varName').keyup(function() {
		if ($(this).val() != ''){
			$('#addButton').removeAttr('disabled');
		}
    });

	$('#varsForm').submit(function(event) {
		event.preventDefault();

		payload = $(this).serializeArray();
		$.post('/configure/addVariable', payload,
			function(resp) {
				if (resp['status'] == 'ok') {
					$('#varsContainerWrap').append('<div class="varBox"><div class="varName">##'+resp['var_name']+'##</div><div class="varFunc">'+resp['var_func']+'</div></div>');
				} else {
					// TODO focus on var_name and select it
					alert(resp['message']);
					$('#varName').focus();
					$('#varName').select();
				}
			});
	});

	// set selection
	$("#select_mode input::checked").parent().addClass("selected");
	config.change_mode( $("#select_mode input::checked").val() );

	// update view
	$("#select_mode input").bind("change",function(e){
		
		// swap parent selection class
		$("#select_mode label").removeClass("selected");
		$(this).parent().addClass("selected");

		// update layout with this type
		config.change_mode($(this).val());
		
	});

});

var config = function() {
	return {
		change_mode : function(mode) {
			switch( mode ) {
				default: case "pro":
					$(".c_pro, .c_advanced, c_basic").show();
					break;
				case "advanced":
					$(".c_pro").hide();
					$(".c_advanced, c_basic").show();
					break;
				case "basic":
					$(".c_pro, .c_advanced").hide();
					$(".c_basic").show();
					break;
			}
			return this;
		}
	}
}();
