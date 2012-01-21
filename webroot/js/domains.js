var domains = function() {
    return {
        removeRow: function() {
                var cell = $(this);
                $.post('/user/deleteDomain', {id: cell.parent().attr('id')},
                    function(resp) {
                        if (resp['status'] == 'ok') {
                            cell.parent().fadeTo(400, 0, function() {
                                $(this).remove();
                            });
                        } else {
                            alert(resp['message']);
                        }
                    }
                );
            }
    };
}();

$(document).ready(function() {
	$('#addButton').attr('disabled', 'disabled');
	$('#new_domain').keyup(function() {
		if ($(this).val() != ''){
			$('#addButton').removeAttr('disabled');
		}
    });

	$('#domainsForm').submit(function(event) {
		event.preventDefault();
        
		payload = $(this).serializeArray();
		$.post('/user/addDomain', payload,
			function(resp) {
				if (resp['status'] == 'ok') {
					$('table').append('<tr id=\"' + resp['domain']['id'] + '\"><td align=\"center\"></td><td class=\"domain-unver\"><a href=\"/user/domain_verify?id=\"' + resp['domain']['id'] + '\">' + resp['domain']['domain'] + '</a></td><td class=\"delete\" width=\"50%\">delete</td></tr>');
                    $('table tr#' + resp['domain']['id'] + ' td.delete').click(domains.removeRow);
                    $('#new_domain').val('');
				} else {
					// TODO focus on var_name and select it
					alert(resp['message']);
					$('#new_domain').focus();
					$('#new_domain').select();
			}
		});
    });

    $('table td.delete').click(domains.removeRow);
});

