function fnCreateSelect(aData)
{
    var r='<select><option value=""></option>', i, iLen=aData.length;
    for ( i=0 ; i<iLen ; i++ )
    {
        r += '<option value="'+aData[i]+'">'+aData[i]+'</option>';
    }
    return r+'</select>';
}

$(document).ready(function() {
    var oTable = $('#logsTable').dataTable( {
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "/logs/get",
		"aoColumns": [
            { "sName": "user" },
            { "sName": "ip" },
            { "sName": "time" },
            { "sName": "priority" },
            { "sName": "type" },
            { "sName": "message" },
            { "sName": "details" }
        ],
		"sPaginationType" : "full_numbers"
    } );

	$.get('/logs/getUniques', function(resp) {
		if (resp['status'] == 'ok') {
			var columns = resp['columns'];
			/* Add a select menu for each TH element in the table footer */
			$("tfoot th").each( function ( i ) {
				var klass = $(this).attr('class');
				var id = $(this).attr('id');
				if (klass == 'select' && columns[id] !== undefined) {
					this.innerHTML = fnCreateSelect(columns[id]);
					$('select', this).change( function () {
						oTable.fnFilter( $(this).val(), i );
					} );
				}
			} );
		}
	});
} );
