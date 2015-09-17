<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{% block title %}{% endblock %}</title>
    <meta name="keywords" content="formations, angularjs, graphisme, ECMA6" >
    <meta name="description" content="Centre de formations, délégation de formateurs, développement d'applications sur mesure" >
    <meta name="author" content="Ambient-it">
    <base href="/"/>
    <link href='http://fonts.googleapis.com/css?family=Play:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.6/animate.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-select/0.12.0/select.min.css"/>

    {% block style %}
		<link rel="stylesheet" href="styles/site.css"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/css/material-fullpalette.min.css"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/css/ripples.min.css"/>
	{% endblock %}

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!--[if IE]>
      <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</head>
<body>
<div id="loader">
	<div class="loader"> <img src="images/spin.svg" alt="loading spinner"> </div>
</div>
{% block header %}
	{% include '../site/partials/header.swig' %}
{% endblock %}
<div id="wrap">
	{% block content %}
    	{% include '../site/partials/menu.swig' %}
    {% endblock %}
    {% include '../site/partials/footer.swig' %}
</div>

{% block script %}
	<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	<script src="js/dependencies/bootstrap.min.js"></script>
	<script src="js/dependencies/jquery.sticky.js"></script>
	<script src="js/dependencies/counter.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/js/material.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.3.0/js/ripples.min.js"></script>
	<script src="https://cdn.bootcss.com/stellar.js/0.6.2/jquery.stellar.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.2/isotope.pkgd.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.5.0/jquery.flexslider-min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.0/jquery.waypoints.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-smooth-scroll/1.5.5/jquery.smooth-scroll.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jcarousel/0.3.3/jquery.jcarousel.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-hover-dropdown/2.0.10/bootstrap-hover-dropdown.min.js"></script>
	<script src="js/main.js"></script>
{% endblock %}
</body>
</html>

