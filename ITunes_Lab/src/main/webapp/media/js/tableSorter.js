$(function() {

	// NOTE: $.tablesorter.theme.bootstrap is ALREADY INCLUDED in the jquery.tablesorter.widgets.js
	// file; it is included here to show how you can modify the default classes
	$.tablesorter.themes.bootstrap = {
		// these classes are added to the table. To see other table classes available,
		// look here: http://getbootstrap.com/css/#tables
		table : 'table header-fixed table-striped table-hover table-condensed table-bordered',
		caption : 'caption',
		// header class names
		header : 'bootstrap-header', // give the header a gradient background (theme.bootstrap_2.css)
		sortNone : '',
		sortAsc : '',
		sortDesc : '',
		active : '', // applied when column is sorted
		hover : '', // custom css required - a defined bootstrap style may not override other classes
		// icon class names
		icons : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		iconSortNone : 'bootstrap-icon-unsorted', // class name added to icon when column is not sorted
		iconSortAsc : 'glyphicon glyphicon-chevron-up', // class name added to icon when column has ascending sort
		iconSortDesc : 'glyphicon glyphicon-chevron-down', // class name added to icon when column has descending sort
		filterRow : '', // filter row class; use widgetOptions.filter_cssFilter for the input/select element
		footerRow : '',
		footerCells : '',
		even : '', // even row zebra striping
		odd : '' // odd row zebra striping
	};

	$("#UserLibrary1").tablesorter({
		// this will apply the bootstrap theme if "uitheme" widget is included
		// the widgetOptions.uitheme is no longer required to be set
		theme : "bootstrap",

		widthFixed : true,
		
		showProcessing: true,

		headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
//		
//		delayInit: true,
//		serverSideSorting: true,
//		ignoreCase: true,
//		sortForce: null,
//	    // default sort that is added to the end of the users sort
//	    // selection.
//	    sortAppend: null,
//
//
//	    // Replace equivalent character (accented characters) to allow
//	    // for alphanumeric sorting
//	    sortLocaleCompare: false,
//
//	    // third click on the header will reset column to default - unsorted
//	    sortReset: false,
//
//	    // restart sort to "sortInitialOrder" when clicking on previously
//	    // unsorted columns
//	    sortRestart: false,
//
//	    // sort empty cell to bottom, top, none, zero
//	    emptyTo: "bottom",
//
//	    // sort strings in numerical column as max, min, top, bottom, zero
//	    stringTo: "max",
		

        // apply disabled classname to the pager arrows when the rows at either extreme is visible
        pager_updateArrows: true,

        // starting page of the pager (zero based index)
        pager_startPage: 0,

		// widget code contained in the jquery.tablesorter.widgets.js file
		// use the zebra stripe widget if you plan on hiding any rows (filter widget)
		widgets : [ "uitheme", "filter", "zebra" ],

		widgetOptions : {
			// using the default zebra striping class name, so it actually isn't included in the theme variable above
			// this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
			zebra : [ "even", "odd" ],

			// reset filters button
			filter_reset : ".reset",

			// extra css class name (string or array) added to the filter element (input or select)
			filter_cssFilter : "form-control",
			
			

		// set the uitheme widget to use the bootstrap theme class names
		// this is no longer required, if theme is set
		// ,uitheme : "bootstrap"

		}
	});
	
	// call the tablesorter plugin and apply the uitheme widget
	$("#Playlist").tablesorter({
		// this will apply the bootstrap theme if "uitheme" widget is included
		// the widgetOptions.uitheme is no longer required to be set
		theme : "bootstrap",

		widthFixed : true,
		
		showProcessing: true,

		headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
//		
//		delayInit: true,
//		serverSideSorting: true,
//		ignoreCase: true,
//		sortForce: null,
//	    // default sort that is added to the end of the users sort
//	    // selection.
//	    sortAppend: null,
//
//
//	    // Replace equivalent character (accented characters) to allow
//	    // for alphanumeric sorting
//	    sortLocaleCompare: false,
//
//	    // third click on the header will reset column to default - unsorted
//	    sortReset: false,
//
//	    // restart sort to "sortInitialOrder" when clicking on previously
//	    // unsorted columns
//	    sortRestart: false,
//
//	    // sort empty cell to bottom, top, none, zero
//	    emptyTo: "bottom",
//
//	    // sort strings in numerical column as max, min, top, bottom, zero
//	    stringTo: "max",
		

        // apply disabled classname to the pager arrows when the rows at either extreme is visible
        pager_updateArrows: true,

        // starting page of the pager (zero based index)
        pager_startPage: 0,

		// widget code contained in the jquery.tablesorter.widgets.js file
		// use the zebra stripe widget if you plan on hiding any rows (filter widget)
		widgets : [ "uitheme", "filter", "zebra" ],

		widgetOptions : {
			// using the default zebra striping class name, so it actually isn't included in the theme variable above
			// this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
			zebra : [ "even", "odd" ],

			// reset filters button
			filter_reset : ".reset",

			// extra css class name (string or array) added to the filter element (input or select)
			filter_cssFilter : "form-control",

		// set the uitheme widget to use the bootstrap theme class names
		// this is no longer required, if theme is set
		// ,uitheme : "bootstrap"

		}
	}).tablesorterPager({

		// target the pager markup - see the HTML block below
//		container : $(".ts-pager"),
		container : $("#pager2"),

		// target the pager page select dropdown - choose a page
		cssGoto : ".pagenum",

		// remove rows from the table to speed up the sort of large tables.
		// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
		removeRows : true,
		
		page: 0,

		// output string - default is '{page}/{totalPages}';
		// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
		output : '{startRow} - {endRow} / {filteredRows} ({totalRows})'
	});
	
	// call the tablesorter plugin and apply the uitheme widget
	$("#PlaylistTrack").tablesorter({
		// this will apply the bootstrap theme if "uitheme" widget is included
		// the widgetOptions.uitheme is no longer required to be set
		theme : "bootstrap",

		widthFixed : true,
		
		showProcessing: true,

		headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
//		
//		delayInit: true,
//		serverSideSorting: true,
//		ignoreCase: true,
//		sortForce: null,
//	    // default sort that is added to the end of the users sort
//	    // selection.
//	    sortAppend: null,
//
//
//	    // Replace equivalent character (accented characters) to allow
//	    // for alphanumeric sorting
//	    sortLocaleCompare: false,
//
//	    // third click on the header will reset column to default - unsorted
//	    sortReset: false,
//
//	    // restart sort to "sortInitialOrder" when clicking on previously
//	    // unsorted columns
//	    sortRestart: false,
//
//	    // sort empty cell to bottom, top, none, zero
//	    emptyTo: "bottom",
//
//	    // sort strings in numerical column as max, min, top, bottom, zero
//	    stringTo: "max",
		

        // apply disabled classname to the pager arrows when the rows at either extreme is visible
        pager_updateArrows: true,

        // starting page of the pager (zero based index)
        pager_startPage: 0,

		// widget code contained in the jquery.tablesorter.widgets.js file
		// use the zebra stripe widget if you plan on hiding any rows (filter widget)
		widgets : [ "uitheme", "filter", "zebra" ],

		widgetOptions : {
			// using the default zebra striping class name, so it actually isn't included in the theme variable above
			// this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
			zebra : [ "even", "odd" ],

			// reset filters button
			filter_reset : ".reset",

			// extra css class name (string or array) added to the filter element (input or select)
			filter_cssFilter : "form-control",

		// set the uitheme widget to use the bootstrap theme class names
		// this is no longer required, if theme is set
		// ,uitheme : "bootstrap"

		}
	}).tablesorterPager({

		// target the pager markup - see the HTML block below
//		container : $(".ts-pager"),
		container : $("#pager1"),

		// target the pager page select dropdown - choose a page
		cssGoto : ".pagenum",

		// remove rows from the table to speed up the sort of large tables.
		// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
		removeRows : true,
		
		page: 0,

		// output string - default is '{page}/{totalPages}';
		// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
		output : '{startRow} - {endRow} / {filteredRows} ({totalRows})'
	});

});