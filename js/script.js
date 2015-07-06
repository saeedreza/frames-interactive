

var leftMenu = function() {
	$('.showroom').removeClass('showRight').toggleClass('showLeft');
	$('.painting_position img').attr('src', 'img/painting_placeholder.png');
	$('.frame_position img').attr('src', 'img/frame_placeholder.png');
	$('#label').hide();
	$('#textMatch').removeClass('show');
}

var rightMenu = function() {
	$('.showroom').removeClass('showLeft').toggleClass('showRight');
	$('.frame_position img').attr('src', 'img/frame_placeholder.png');
	$('#textMatch').removeClass('show');
}

$('.leftMenu').click(function(e) {
	leftMenu();
})

$('.rightMenu').click(function(e) {
	
	var src = $('.painting_position img').attr('src');

	if ( src.includes("placeholder") ) {
		e.preventDefault();
	} else {
		rightMenu();
	}
})

// show the left menu
$('#showroom').addClass('showLeft');


( function() {
	var data = [
		{
			'title' : 'Painting No 1',
			'frames' : [
				{
					'title' : 'Frame No 1-1',
					'textMatch' : 'You selected frame No 1-1',
					'frame_corner_imgUrl' : 'img/painting_1_frame_1_corner.png',
					'frame_imgUrl' : 'img/painting_1_frame_1.png',
				}, {
					'title' : 'Frame No 1-2',
					'textMatch' : 'You selected frame No 1-2',
					'frame_corner_imgUrl' : 'img/painting_1_frame_2_corner.png',
					'frame_imgUrl' : 'img/painting_1_frame_2.png',
				}, {
					'title' : 'Frame No 1-3',
					'textMatch' : 'You selected frame No 1-3',
					'frame_corner_imgUrl' : 'img/painting_1_frame_3_corner.png',
					'frame_imgUrl' : 'img/painting_1_frame_3.png',
				}
			]
		}, {
			'title' : 'Painting No 2',
			'frames' : [
				{
					'title' : 'Frame No 2-1',
					'textMatch' : 'You selected frame No 2-1',
					'frame_corner_imgUrl' : 'img/painting_2_frame_1_corner.png',
					'frame_imgUrl' : 'img/painting_2_frame_1.png',
				}, {
					'title' : 'Frame No 2-2',
					'textMatch' : 'You selected frame No 2-2',
					'frame_corner_imgUrl' : 'img/painting_2_frame_2_corner.png',
					'frame_imgUrl' : 'img/painting_2_frame_2.png',
				}, {
					'title' : 'Frame No 2-3',
					'textMatch' : 'You selected frame No 2-3',
					'frame_corner_imgUrl' : 'img/painting_2_frame_3_corner.png',
					'frame_imgUrl' : 'img/painting_2_frame_3.png',
				}
			]
		}, {
			'title' : 'Painting No 3',
			'frames' : [
				{
					'title' : 'Frame No 3-1',
					'textMatch' : 'You selected frame No 3-1',
					'frame_corner_imgUrl' : 'img/painting_3_frame_1_corner.png',
					'frame_imgUrl' : 'img/painting_3_frame_1.png',
				}, {
					'title' : 'Frame No 3-2',
					'textMatch' : 'You selected frame No 3-2',
					'frame_corner_imgUrl' : 'img/painting_3_frame_2_corner.png',
					'frame_imgUrl' : 'img/painting_3_frame_2.png',
				}, {
					'title' : 'Frame No 3-3',
					'textMatch' : 'You selected frame No 3-3',
					'frame_corner_imgUrl' : 'img/painting_3_frame_3_corner.png',
					'frame_imgUrl' : 'img/painting_3_frame_3.png',
				}
			]
		}, {
			'title' : 'Painting No 4',
			'frames' : [
				{
					'title' : 'Frame No 4-1',
					'textMatch' : 'You selected frame No 4-1',
					'frame_corner_imgUrl' : 'img/painting_4_frame_1_corner.png',
					'frame_imgUrl' : 'img/painting_4_frame_1.png',
				}, {
					'title' : 'Frame No 4-2',
					'textMatch' : 'You selected frame No 4-2',
					'frame_corner_imgUrl' : 'img/painting_4_frame_2_corner.png',
					'frame_imgUrl' : 'img/painting_4_frame_2.png',
				}, {
					'title' : 'Frame No 4-3',
					'textMatch' : 'You selected frame No 4-3',
					'frame_corner_imgUrl' : 'img/painting_4_frame_3_corner.png',
					'frame_imgUrl' : 'img/painting_4_frame_3.png',
				}
			]
		}
	];

	var body = document.body,
		paintingSelection = document.getElementById( 'painting-menu' ),
		frameSelection = document.getElementById( 'frame-menu' ),
		frames = document.getElementById( 'frames'),
		droppablePainting = [],
		droppableFrame = [];

	// initialize droppable for paintings
	var el = document.querySelector( '#showroom .wall .painting_position' );
	droppablePainting =  new Droppable( el , {
		// options...
	});

	// initialize draggable paintings
	Array.prototype.slice.call(document.querySelectorAll( '#painting-menu .painting' )).forEach( function( el ) {
		
		new Draggable( el, droppablePainting, {
			
			draggabilly : { containment: body },
			onStart : function() {
				// close the left menu
				leftMenu();
			},
			onEnd : function( wasDropped ) {
				var afterDropFn = function() {
					// hide showroom
					if (!wasDropped) {
						leftMenu();
					} else {
						// show frame menu after 1.5s
						setTimeout(function() {
							rightMenu();
						}, 1500);
						
						// show
						$('#label').fadeIn();
						
						var src = el.getAttribute("src"),
							index = el.getAttribute('data-index');

						$('.painting_position img').attr("src", src);

						document.querySelector('.text').innerHTML = data[index].title;

						var frame_data = data[index].frames;

						var loadFrames = function(src, index) {
							var frame = "";
							for (var i = 0; i < frame_data.length; i++ ) {
								frame += '<div><img src="' + frame_data[i].frame_corner_imgUrl + '" data-index="' + i + '" class="frame" /></div><div class="frame_info"><div class="frame_title">' + frame_data[i].title + '</div></div>';
							};
							frames.innerHTML = frame;

							// initialize droppableFrame
							var el = document.querySelector( '#showroom .wall .frame_position' );
							droppableFrame =  new Droppable( el , {
								// options...
							});

							// initialize draggable frames
							[].slice.call(document.querySelectorAll( '#frames .frame' )).forEach( function( el ) {
								new Draggable( el, droppableFrame, {

									draggabilly : { containment: body },
									onStart : function() {
										rightMenu();
									},
									onEnd : function( wasDropped ) {
										var afterDropFn = function() {
											// hide dropArea
											if (!wasDropped) {
												rightMenu();
											} else {
												var i = el.getAttribute('data-index'),
													// src = el.getAttribute('src'),
													src = frame_data[i].frame_imgUrl,
													index = el.getAttribute('data-index');
												$('.frame_position img').attr("src", src);
												// display the selection text
												$('#textMatch').html(frame_data[index].textMatch).addClass('show');
											}
										}
										afterDropFn(); // afterDropFn for frames
									} // on End for frames
								});
							});
						};
						loadFrames(src, index); // load frames
					}
				}
			afterDropFn(); // afterDropFn for paintings
			} // on End for paintings
		});
	}); // Draggable for paintings
})();