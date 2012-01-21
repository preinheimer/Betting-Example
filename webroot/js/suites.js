var suites = function() {

	return {
		step : 0,
		addStep: function () {

			this.step++;

			$('div.stepsContainer')
				.append('<div class="stepWrap"><h2>Step ' + suites.step + '</h2><ul id="step['+suites.step+']" class="steps drop_here"><li></li></ul></div>');

			$(".drop_here")
				.sortable({
					connectWith : ".drop_here",
					dropOnEmpty : true,
					receive : function(e,ui) {

						suites.handleDrop();

					}
				})
				.disableSelection();

		},

		/**
		 * Determine number of steps, update labels and data,
		 * and add an empty step to the end if needed. 
		 */
		handleDrop : function() {

			var stepCount = 0;

			$(".steps").each(function(){

				var numChildren = $(".action",this).length;
				
				console.log( stepCount );
				
				if ( numChildren > 0 ) {

					// Update ID storage, label:

					stepCount++;
					$("h2", $(this).parent()).empty().append("Step " + stepCount);
					$(this).attr("id", "step["+ stepCount + "]");

				} else {

					// Clear dead spots

					$(this).parent().remove();
				}

				suites.step = stepCount;

			})

			// Tag one on the end
			suites.addStep();
			

		},
		save: function (e) {
			
			var pack = {};
			
			$('.steps').each(function(a,b,c){

				// reference for next scope
				var _pack = pack;
				var stepID = $( this ).attr('id').match(/step\[(\d+)\]/)[1];

				$("li.action",this).each(function(a,b,c){

					var actionID = $(this).attr('id').match(/action\[(\d+)\]/)[1];
					_pack[actionID] = stepID;

				});

			});

			if ($("#name").val() == "") {

				alert("Please enter a title!");
				return false;
				
			} else {

	
			}
			
			var steps = JSON.stringify(pack);
			$('input[name="data"]').val(steps);

			$('#suitesForm').submit();
			// return false;
		}

	}

}();


function disableEnterKey(e)
{
     var key;      
     if(window.event)
          key = window.event.keyCode; //IE
     else
          key = e.which; //firefox      

     return (key != 13);
}