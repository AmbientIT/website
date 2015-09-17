{% extends  '../layout/site.swig' %}

{% block title %}
	Ambient-IT Formations
{% endblock %}

{% block style %}
	{% parent %}
{% endblock %}

{% block header %}
	{% parent %}
{% endblock %}

{% block content %}
	{% parent %}

    <div class="content">
        <main class="container">
            <section class="row" >
                {% for category in categories %}
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 well" style="padding:0 0;">
                    <h3 style="text-align:center; color:darkgrey;">
                        {{ category.name }}
                    </h3>
                    <div class="list-group">
                        {% for formation in category.formations %}
                        <div class="list-group-item formation-item">
                            <div class="row-picture">
                                <img class="circle" src="{{ formation.avatar }}"  alt="{{ formation.name }} logo">
                            </div>
                            <div class="row-content">
                                <a href="/formation/{{ formation.slug }}">
                                    <h4 class="list-group-item-heading">
                                        {{ formation.name }}
                                    </h4>
                                </a>
                                <p class="list-group-item-text">
                                    {{ formation.description }}
                                </p>
                            </div>
                        </div>
                        <div class="list-group-separator"></div>
                        {% endfor %}
                    </div>
                </div>
                {% endfor %}
            </section>
        </main>

	</div>
{% endblock %}

{% block script %}
	{% parent %}
{% endblock %}
