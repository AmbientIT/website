{% extends  '../layout/site.swig' %}

{% block title %}
	Ambient-IT formations
{% endblock %}

{% block style %}
	{% parent %}
{% endblock %}

<!--{% block header %}-->
	<!--{% parent %}-->
<!--{% endblock %}-->

{% block content %}
	{% parent %}
	<main class="container">
		<article class="">
			<h1 style="color:darkgrey">{{ formation.name }}</h1>

			<div>
				<section class="col-xs-12 col-md-8">
                    {% if formation.duration %}
						<p>
							Durée : {{ formation.duration }} jours
						</p>
					{% endif %}
					<p>
						Présentation : {{formation.description }}
					</p>
					<div  style="-webkit-column-count: 2;min-height: unset !important; margin-top:30px;">
						{{formation.program | safe }}
					</div>
				</section>
				<aside class="col-xs-12 col-md-4">
					<section class="well">
						<a href="/pdf/{{ formation.slug }}.pdf" class="btn btn-primary btn-block">Telecharger le pdf</a>
						<a href="/contact/#/formations?formation={{ formation.slug }}" class="btn btn-primary btn-block">Demande de devis</a>

					</section>
					<!--{% if formation.previous.length > 0 %}-->
						<!--<div class="well formation-slider">-->
							<!--<h3 class="text-center">-->
								<!--Formations prérequise :-->
							<!--</h3>-->
							<!--<div class="owl-img list-group">-->
								<!--{% for formation in formation.previous %}-->
								<!--<div class="list-group-item {% if !loop.first %}  wow fadeInRightBig {% endif %}" {% if !loop.first %} data-wow-duration="0.5s" data-wow-delay="0.5s" {% endif %}>-->
									<!--<div class="row-picture">-->
										<!--<img class="circle" src="{{ formation.avatar }}"-->
											 <!--alt="{{ formation.name }} logo" style="height:50px;width:50px">-->
									<!--</div>-->
									<!--<div class="row-content" >-->
										<!--<a href="/formation/{{ formation.slug }}">-->
											<!--<h4 class="list-group-item-heading">-->
												<!--{{ formation.name }}-->
											<!--</h4>-->
										<!--</a>-->

										<!--<p class="list-group-item-text">-->
											<!--{{ formation.description }}-->
										<!--</p>-->
									<!--</div>-->
									<!--<div>-->
										<!--<a class="btn margin-r-20 btn-color"  href="/formation/{{ formation.slug }}"><i class="fa fa-eye" style="font-size:1em;"></i>&nbsp; En savoir plus</a>-->
									<!--</div>-->
								<!--</div>-->
								<!--{% endfor %}-->
							<!--</div>-->
						<!--</div>-->
					<!--{% endif %}-->
					<!--{% if formation.next.length > 0 %}-->
						<!--<div class="well formation-slider">-->
							<!--<h3 class="text-center">-->
								<!--Pour approfondir :-->
							<!--</h3>-->
							<!--<div class="owl-img list-group">-->
								<!--{% for formation in formation.next %}-->
									<!--<div class="list-group-item {% if !loop.first %}  wow fadeInRightBig {% endif %}" {% if !loop.first %} data-wow-duration="0.5s" data-wow-delay="0.5s" {% endif %}>-->
										<!--<div class="row-picture">-->
											<!--<img class="circle" src="{{ formation.avatar }}"-->
												 <!--alt="{{ formation.name }} logo" style="height:50px;width:50px">-->
										<!--</div>-->
										<!--<div class="row-content">-->
											<!--<a href="/formation/{{ formation.slug }}">-->
												<!--<h4 class="list-group-item-heading"-->
													<!--{{ formation.name }}-->
												<!--</h4>-->
											<!--</a>-->

											<!--<p class="list-group-item-text">-->
												<!--{{ formation.description }}-->
											<!--</p>-->
										<!--</div>-->
										<!--<div>-->
											<!--<a class="btn margin-r-20 btn-color"  href="/formation/{{ formation.slug }}"><i class="fa fa-eye" style="font-size:1em;"></i>&nbsp; En savoir plus</a>-->
										<!--</div>-->
									<!--</div>-->
								<!--{% endfor %}-->
							<!--</div>-->
						<!--</div>-->
					<!--{% endif %}-->
				</aside>
			</div>
		</article>
	</main>
{% endblock %}

{% block script %}
	{% parent %}
{% endblock %}
