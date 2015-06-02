
( function() {
	var body = document.body,
		showroom = document.getElementById( 'showroom' ),
		paintingSelection = document.getElementById( 'select-painting' ),
		frameSelection = document.getElementById( 'select-frame' ),
		frames = document.getElementById( 'frames'),
		title = document.getElementById( 'title'),
		dropArea = document.getElementById( 'showroom' ),
		droppableEl = [],
		dropAreaTimeout;

		// initialize droppable
		var el = document.querySelector( '#showroom .wall' );
		droppableEl.push( new Droppable( el , {
			// onDrop : function( instance, draggableEl ) {
			// 	show checkmark inside the droppabe element
			// 	classie.add( instance.el, 'drop-feedback' );
			// 	clearTimeout( instance.checkmarkTimeout );
			// 	instance.checkmarkTimeout = setTimeout( function() { 
			// 		classie.remove( instance.el, 'drop-feedback' );
			// 	}, 0 );
			// 	...
			// }
		}));

	// initialize draggable(s)
	Array.prototype.slice.call(document.querySelectorAll( '#select-painting .painting' )).forEach( function( el ) {
		new Draggable( el, droppableEl, {
			
			draggabilly : { containment: body },
			onStart : function() {
				// add class 'drag-active' to showroom
				classie.add( showroom, 'drag-active' );
				// clear timeout: dropAreaTimeout (toggle drop area)
				clearTimeout( dropAreaTimeout );
				// show dropArea
				classie.add( dropArea, 'show' );
			},
			onEnd : function( wasDropped ) {
				var afterDropFn = function() {
					// hide dropArea
					if (!wasDropped) {
						classie.remove( dropArea, 'show' );	
					} else {
						classie.add( frameSelection, 'show' );
						classie.add( title, 'show' );
						classie.add( frames, 'show' );
						
						// $('#img1').click(function() {
						//   $("#imgmain").fadeOut(function() {
						//     $(this).attr("src","img1.jpg").fadeIn();
						//   });
						// });

						var src = $('img', el).attr("src");
						$('.wall img').attr("src", src).fadeIn('slow');

					}
					// remove class 'drag-active' from showroom
					classie.remove( showroom, 'drag-active' );
				};

				if( !wasDropped ) {
					afterDropFn();
				}
				else {
					// after some time hide drop area and remove class 'drag-active' from body
					clearTimeout( dropAreaTimeout );
					dropAreaTimeout = setTimeout( afterDropFn, 0 );
				}
			}
		} );
	} );

	// initialize draggable(s)
	[].slice.call(document.querySelectorAll( '#select-frame .frame' )).forEach( function( el ) {
		new Draggable( el, droppableEl, {
			
			draggabilly : { containment: body },
			onStart : function() {
				// add class 'drag-active' to showroom
				// classie.add( showroom, 'drag-active' );
				// clear timeout: dropAreaTimeout (toggle drop area)
				clearTimeout( dropAreaTimeout );
				// show dropArea
				// classie.add( dropArea, 'show' );
			},
			onEnd : function( wasDropped ) {
				var afterDropFn = function() {
					// hide dropArea
					if (!wasDropped) {
						// classie.remove( dropArea, 'show' );	
					} else {
						// classie.add( frameSelection, 'show' );
						// classie.add( title, 'show');
						// $('.wall img').attr('src', 'img/image-1.png');

					}
					// remove class 'drag-active' from showroom
					// classie.remove( showroom, 'drag-active' );
				};

				if( !wasDropped ) {
					afterDropFn();
				}
				else {
					// after some time hide drop area and remove class 'drag-active' from body
					clearTimeout( dropAreaTimeout );
					dropAreaTimeout = setTimeout( afterDropFn, 0 );
				}
			}
		} );
	} );
})();