; (function ($) {
	$.fn.extend({
		maxlength: function () {
			return this.each(function (index, el) {
				var $Textarea, max_Length, raw_text, actual_text, lengthDiff, info, infoPane,
					used, remaining,
					timestamp = new Date().getTime();

				var defaultOptions = {
					infoPane: null,
					messageFormat: '{used} of {total}'
				};

				$Textarea = $(this).addClass('maxlength-' + index);

				var dataAttr = $Textarea.data();

				defaultOptions = $.extend(defaultOptions, dataAttr);

				if (defaultOptions.infoPane) {
					info = true;
					infoPane = $(defaultOptions.infoPane);
				}

				max_Length = parseInt($Textarea.attr('maxlength'));

				defaultOptions.messageFormat = defaultOptions.messageFormat.replace('{total}', max_Length);

				if (info) {
					infoPane.text(defaultOptions.messageFormat.replace('{used}', 0).replace('{remaining}', max_Length));
				}

				$Textarea.keyup(function () {
					raw_text = $Textarea.val();
					if (raw_text.length === 0) {
						$Textarea.attr('maxlength', max_Length);
						used = 0;
						remaining = max_Length - used;

						if (info) {
							infoPane.text(defaultOptions.messageFormat.replace('{used}', used).replace('{remaining}', remaining));
						}
					} else {
						actual_text = raw_text.replace(/ {2,}/g, ' ');
						lengthDiff = raw_text.length - actual_text.length;

						if (lengthDiff > 0 && (max_Length + lengthDiff) >= max_Length) {
							$Textarea.attr('maxlength', (max_Length + lengthDiff));
						}

						used = actual_text.length;
						remaining = max_Length - used;

						if (info) {
							infoPane.text(defaultOptions.messageFormat.replace('{used}', used).replace('{remaining}', remaining));
						}
					}
				});
			});
		}
	});

	$(function () {
		$('textarea[maxlength]').maxlength().keyup();
	});
})(jQuery);