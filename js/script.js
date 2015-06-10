
( function() {
	var data = [
		{
			'title' : 'Painting No 1',
			'id' : 'painting_1',
			'imgUrl' : 'img/painting_1.png',
			'frames' : [
				{
					'title' : 'Frame No 1-1',
					'imgUrl' : 'img/frame_1_1.png',
					'id' : 'painting_1_1',
					'text' : 'frame 1-1'
				},{
					'title' : ' Frame No 1-2',
					'imgUrl' : 'img/frame_1_2.png',
					'id' : 'painting_1_2',
					'text' : 'frame 1-2'
				}, {
					'title' : ' Frame No 1-3',
					'imgUrl' : 'img/frame_1_3.png',
					'id' : 'painting_1_3',
					'text' : 'frame 1-3'
				}
			]
		}, {
			'title' : 'Painting No 2',
			'id' : 'painting_2',
			'imgUrl' : 'img/painting_2.png',
			'frames' : [
				{
					'title' : ' Frame No 2-1',
					'imgUrl' : 'img/frame_2_1.png',
					'id' : 'painting_2_1',
					'text' : 'frame 2-1'
				},{
					'title' : ' Frame No 2-2',
					'imgUrl' : 'img/frame_2_2.png',
					'id' : 'painting_2_2',
					'text' : 'frame 2-2'
				}, {
					'title' : ' Frame No 2-3',
					'imgUrl' : 'img/frame_2_3.png',
					'id' : 'painting_2_3',
					'text' : 'frame 2-3'
				}
			]
		}, {
			'title' : 'Painting No 3',
			'id' : 'painting_3',
			'imgUrl' : 'img/painting_3.png',
			'frames' : [
				{
					'title' : ' Frame No 3-1',
					'imgUrl' : 'img/frame_3_1.png',
					'id' : 'painting_3_1',
					'text' : 'frame 3-1'
				},{
					'title' : ' Frame No 3-2',
					'imgUrl' : 'img/frame_3_2.png',
					'id' : 'painting_3_2',
					'text' : 'frame 3-2'
				}, {
					'title' : ' Frame No 3-3',
					'imgUrl' : 'img/frame_3_3.png',
					'id' : 'painting_3_3',
					'text' : 'frame 3-3'
				}
			]
		}, {
			'title' : 'Painting No 4',
			'id' : 'painting_4',
			'imgUrl' : 'img/painting_4.png',
			'frames' : [
				{
					'title' : ' Frame No 4-1',
					'imgUrl' : 'img/frame_4_1.png',
					'id' : 'painting_4_1',
					'text' : 'frame 4-1'
				},{
					'title' : ' Frame No 4-2',
					'imgUrl' : 'img/frame_4_2.png',
					'id' : 'painting_4_2',
					'text' : 'frame 4-2'
				}, {
					'title' : ' Frame No 4-3',
					'imgUrl' : 'img/frame_4_3.png',
					'id' : 'painting_4_3',
					'text' : 'frame 4-3'
				}
			]
		}
	];

	var body = document.body,
		showroom = document.getElementById( 'showroom' ),
		paintingSelection = document.getElementById( 'select-painting' ),
		frameSelection = document.getElementById( 'select-frame' ),
		frames = document.getElementById( 'frames'),
		title = document.getElementById( 'title'),
		droppablePainting = [],
		droppableFrame = [];

	// initialize droppablePainting
	var el = document.querySelector( '#showroom .wall .painting_position' );
	droppablePainting =  new Droppable( el , {
		// options...
	});

	// initialize draggable(s)
	Array.prototype.slice.call(document.querySelectorAll( '#select-painting .painting' )).forEach( function( el ) {
		new Draggable( el, droppablePainting, {
			
			draggabilly : { containment: body },
			onStart : function() {
				// add class 'drag-active' to showroom
				classie.add( showroom, 'drag-active' );
				// show showroom
				classie.add( showroom, 'show' );
			},
			onEnd : function( wasDropped ) {
				var afterDropFn = function() {
					// hide showroom
					if (!wasDropped) {
						classie.remove( showroom, 'show' );	
					} else {
						classie.add( frameSelection, 'show' );
						classie.add( title, 'show' );
						classie.add( frames, 'show' );
						
						var src = el.getAttribute("src"),
							index = el.getAttribute('data-index');

						$('.painting_position').attr("src", src);
						document.querySelector('.selection_text').innerHTML = "No frame has been selected";

						var frame_data = data[index].frames;

						var loadFrames = function(src, index) {
							var frame = "";
							for (var i = 0; i < frame_data.length; i++ ) {
								frame += '<div><img src="' + frame_data[i].imgUrl + '" id="frame_' + i + '" data-index="' + i + '" class="frame" /><div class="frame_title">' + frame_data[i].title + '</div></div>';
							};
							document.getElementById('frames').innerHTML = frame;
							// document.getElementById('select-frame').append('Hi');

							// initialize droppablePainting
							var el = document.querySelector( '#showroom .wall .frame_position' );
							droppableFrame =  new Droppable( el , {
								// options...
							});

							// initialize draggable(s)
							[].slice.call(document.querySelectorAll( '#frames .frame' )).forEach( function( el ) {
								new Draggable( el, droppableFrame, {

									draggabilly : { containment: body },
									onStart : function() {
									},
									onEnd : function( wasDropped ) {
										// hide dropArea
										if (!wasDropped) {
										} else {
											var src = el.getAttribute('src'),
												index = el.getAttribute('data-index');

											$('.frame_position').attr("src", src);
											// display the selection text
											document.querySelector('.selection_text').innerHTML = frame_data[index].title;
										}
									}
								});
							});
						}
						
						loadFrames(src, index);
					}
					// remove class 'drag-active' from showroom
					classie.remove( showroom, 'drag-active' );
				};
				afterDropFn();
			}
		});
	});

})();