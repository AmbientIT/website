{% extends  '../layout/site.swig' %}

{% block title %}
  Ambient-IT Formations Acceuil
{% endblock %}

{% block style %}
	{% parent %}
{% endblock %}

{% block header %}
	{% include 'partials/header-fullscreen.swig' %}
{% endblock %}

{% block content %}
	{% parent %}
	<div class="content">
		{% include 'partials/intro.swig' %}

		{% include 'partials/formations-slider.swig' %}

		{% include 'partials/team.swig' %}

		{% include 'partials/contact.swig' %}
	</div>
{% endblock %}

{% block script %}
	{% parent %}
{% endblock %}
