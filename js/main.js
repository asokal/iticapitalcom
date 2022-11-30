"use strict"

/**
 * инициализация всех инициализаций
 */
$(document).ready(function()
{
	o2.init()
});

/**
 * основной объект
 * @type {object}
 */
var o2 =
{
	/**
	* вызов функций, которые должны запускаться после загрузки DOM
	*/
	init: function()
	{
		this.stickHeaderCall();
		this.hoverOverlay();
		this.sliders.init();
		this.showCallback();
		this.stickyCard();
		this.peopleMasonryGrid();
		this.lightBoxInit();
		this.lightBoxInit();
		this.anchor();
	},

	toggleNav: function(instance)
	{
		var screenWidth = document.documentElement.clientWidth;

		$(instance).toggleClass('active');
		$('._headerNav').toggleClass('header-nav--mobile');

		if(screenWidth < 768)
			$('body').toggleClass('hidden')
	},

	stickHeader: function(instance)
	{
		if($(instance).scrollTop() != 0 && $('._header').hasClass('header--fixed'))
			return;

		if($(instance).scrollTop() != 0)
			$('._header').addClass('header--fixed');
		else
			$('._header').removeClass('header--fixed');
	},

	stickHeaderCall: function()
	{
		o2.stickHeader(window);
		o2.bodyAdjust();

		$(window).scroll(function()
		{
			o2.stickHeader(this);
			o2.bodyAdjust();
		});
	},

	bodyAdjust: function()
	{
		setTimeout(function()
		{
			$('body').css('padding-top', $('._header').innerHeight());
		}, 100);
	},

	hoverOverlay: function()
	{
		$('._hover-overlay').each(function()
		{
			$(this).mouseenter(function()
			{
				$('._overlay').addClass('visible');
			});
			$(this).mouseleave(function()
			{
				$('._overlay').removeClass('visible');
			});
		});
	},

	scrollTo: function(elementClass)
	{
		$('body, html').animate({
			scrollTop: ($(elementClass).offset().top - 72)
		}, 700);
	},

	closeAlert: function(instance, key)
	{
		document.cookie = key + ' = true';
		$(instance).parent().hide();
		o2.bodyAdjust();
	},

	showCallback: function()
	{
		if($("._stickyCard").length)
		{
			$(window).scroll(function() {
				var cardTop = $("._stickyCard").offset().top,
					cardBottom = $("._stickyCard").offset().top + $("._stickyCard").outerHeight(),
					screenTop = $(window).scrollTop(),
					screenBottom = $(window).scrollTop() + $(window).innerHeight();

				if ((screenTop < cardBottom) && (screenBottom > cardTop))
					$('._callback').removeClass('active');
				else
					$('._callback').addClass('active');
			});
		}

	},

	stickyCard: function()
	{
		if($("._stickyDesktop").length)
			var sticky = new Sticky('._stickyDesktop');
	},

	peopleMasonryGrid: function()
	{
		if($("._masonryGrid").length)
		{
			var masonry = new Macy({
				container: '._masonryGrid',
				trueOrder: true,
				columns: 2,
				margin:
				{
					y: 88,
					x: 56,
				},

				breakAt:
				{
					767:
					{
						margin:
						{
							y: 48,
						},

						columns: 1,
					},
				}
			});
		}
	},

	lightBoxInit: function()
	{
		if($("._lightBox").length)
		{
			$('._lightBox img').each(function() {
				$(this).attr('data-mfp-src', $(this).attr('src'));
			});

			$('._lightBox').magnificPopup({
				delegate: 'img',
				type: 'image'
			});
		}
	},

	anchor: function()
	{
		$('.faq__questions-item').click( function() {
			var pos = $(this).index();
			$('html, body').animate({
				scrollTop:  $('.faq__answers-item').eq(pos).offset().top - 150
				}, 600);
		});
		$('.sticky-card--digital-assets').find('a').click( function() {
			var pos = $(this).index();
			$('html, body').animate({
				scrollTop:  $('.private-section-header__title').eq(pos).offset().top - 200
				}, 600);
		})
	},

	sliders:
	{
		init()
		{
			$('.partners-carousel').slick({
				infinite: false,
				slidesToShow: 4,
				centerMode: false,
				variableWidth: true,
				arrows: true,
				prevArrow: '<button class="partners-carousel__btn btn-prev"><img src="./img/index-slider-btn.svg"></button>',
				nextArrow: '<button class="partners-carousel__btn btn-next"><img src="./img/index-slider-btn.svg"></button>',
			});
		}
	},

	popups:
	{
		showPopup: function(popup)
		{
			$('._overlay').addClass('visible');
			$('._overlay').addClass('visible--popup');
			$(popup).addClass('visible');
			$('body').css('overflow', 'hidden');
		},

		closePopup: function()
		{
			$('._overlay').removeClass('visible');
			$('._overlay').removeClass('visible--popup');
			$('._popup').removeClass('visible');
			$('body').css('overflow', 'visible');
		},
	}
}