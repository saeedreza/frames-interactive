

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
			'id' : 'painting_1',
			'rollover_img' : 'img/painting_1_rollover.jpg',
			'frames' : [
				{
					'title' : 'Frame No 1-1',
					'frame_corner_imgUrl' : 'img/frame_1_1.png',
					'id' : 'painting_1_1',
					'text' : 'frame 1-1'
				}, {
					'title' : ' Frame No 1-2',
					'frame_corner_imgUrl' : 'img/frame_1_2.png',
					'id' : 'painting_1_2',
					'text' : 'frame 1-2'
				}, {
					'title' : ' Frame No 1-3',
					'frame_corner_imgUrl' : 'img/frame_1_3.png',
					'id' : 'painting_1_3',
					'text' : 'frame 1-3'
				}
			]
		}, {
			'id' : 'painting_2',
			'rollover_img' : 'img/painting_2_rollover.jpg',
			'title' : '',
			'frames' : [
				{
					'id' : 'painting_2_1',
					'title' : ' Frame No 2-1',
					'textMatch' : 'blah blah blah',
					'frame_corner_imgUrl' : 'img/painting_2_frame_1_corner.png',
					'frame_imgUrl' : 'img/painting_2_frame_1.png',
					'frame_rollover_imgUrl' : 'img/painting_2_frame_1_rollover.png'
				}, {
					'title' : ' Frame No 2-2',
					'frame_corner_imgUrl' : 'img/painting_2_frame_2_corner.png',
					'frame_imgUrl' : 'img/painting_2_frame_2.png',
					'id' : 'painting_2_2',
					'text' : 'frame 2-2'
				}, {
					'title' : ' Frame No 2-3',
					'frame_corner_imgUrl' : 'img/painting_2_frame_3_corner.png',
					'frame_imgUrl' : 'img/painting_2_frame_3.png',
					'id' : 'painting_2_3',
					'text' : 'frame 2-3'
				}
			]
		}, {
			'id' : 'painting_3',
			'rollover_img' : 'img/painting_3_rollover.jpg',
			'frames' : [
				{
					'title' : ' Frame No 3-1',
					'frame_corner_imgUrl' : 'img/frame_3_1.png',
					'id' : 'painting_3_1',
					'text' : 'frame 3-1'
				}, {
					'title' : ' Frame No 3-2',
					'frame_corner_imgUrl' : 'img/frame_3_2.png',
					'id' : 'painting_3_2',
					'text' : 'frame 3-2'
				}, {
					'title' : ' Frame No 3-3',
					'frame_corner_imgUrl' : 'img/frame_3_3.png',
					'id' : 'painting_3_3',
					'text' : 'frame 3-3'
				}
			]
		}, {
			'id' : 'painting_4',
			'rollover_img' : 'img/painting_4_rollover.jpg',
			'frames' : [
				{
					'title' : ' Frame No 4-1',
					'frame_corner_imgUrl' : 'img/frame_4_1.png',
					'id' : 'painting_4_1',
					'text' : 'frame 4-1'
				}, {
					'title' : ' Frame No 4-2',
					'frame_corner_imgUrl' : 'img/frame_4_2.png',
					'id' : 'painting_4_2',
					'text' : 'frame 4-2'
				}, {
					'title' : ' Frame No 4-3',
					'frame_corner_imgUrl' : 'img/frame_4_3.png',
					'id' : 'painting_4_3',
					'text' : 'frame 4-3'
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

						document.querySelector('.text').innerHTML = "Mars and Venus, Allegory of Peace, 1770. Louis-Jean François Lagrenée (French, 1725–1805). Oil on canvas, 85.1 x 74.3 cm (33 1/2 x 29 1/4 in.). The J. Paul Getty Museum, 97.PA.65.On view in the exhibition";

						var frame_data = data[index].frames;

						var loadFrames = function(src, index) {
							var frame = "";
							for (var i = 0; i < frame_data.length; i++ ) {
								frame += '<div><img src="' + frame_data[i].frame_corner_imgUrl + '" id="frame_' + i + '" data-index="' + i + '" class="frame" /><div class="frame_title">' + frame_data[i].title + '</div></div>';
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
												$('#textMatch').html(frame_data[index].title).addClass('show');
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