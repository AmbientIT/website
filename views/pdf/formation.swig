{% extends '../layout/pdf.swig' %}

{% block style %}
	{% parent %}
	<link rel="stylesheet" href="{{ config.url }}/styles/pdf.css"/>
{% endblock %}

{% block content %}
	<header>
		<h1>
			{{ formation.name }}
		</h1>

	</header>
	<main >
		<section class="col-xs-8 main-section">
            <p>
				{{ formation.duration }} jours
            </p>
			<p>
				Présentation : {{ formation.description }}
			</p>
			{% if formation.goals %}
				<p>
					Objectifs : {{ formation.goals }}
				</p>
			{% endif %}
			<p style="-webkit-column-count: 2;-moz-column-count: 2; column-count: 2; min-height: unset !important;">
				{{ formation.program | safe }}
			</p>
		</section>
		<aside class="col-xs-4">
			<div class="well">
				<h4>
					Informations :
				</h4>
				{% if formation.trainers %}
					<div>
						<i class="ion-person"></i>
						&nbsp;
						<span>Formateur(s) : </span>
					</div>
					<div class="list-group">
                        {% for trainer in formation.trainers %}
							<div class="list-group-item">
								<div class="row-picture">
									<img class="circle" src="{{ trainer.avatar || config.url + '/images/avatar.png' }}"  alt="{{ trainer.displayName }} logo" style="height: 25px; width: 25px;" >
								</div>
								<div class="row-content">
									<a>
										<h4 class="list-group-item-heading" >
											{{ trainer.displayName}}
										</h4>
									</a>
									<p class="list-group-item-text" style="color: white; font-size:0.8em">
										{{ trainer.description }}
									</p>
								</div>
							</div>
                        {% endfor %}
					</div>
				{% endif %}
				<div>
					<i class="ion-calendar"></i>
					&nbsp;
					<span>Dates disponibles</span>
				</div>
				<div>
					<i class="ion-location"></i>
					&nbsp;
					&nbsp;
					<span>Lieux possibles</span>
				</div>
				<div>
					<i class="ion-chatbox"></i>
                    &nbsp;
                    <span>Une qualification téléphonique si nécessaire avec notre consultant</span>
				</div>
			</div>
			<div class="well">
				<div style="margin-top:50px;">
					<div>
						<span class="bg-color">
							Adresse:
						</span>
						<span>
							213 rue de tolbiac 75013 Paris
						</span>
					</div>
					<div>
						<span class="bg-color">
							Telephonne:
						</span>
						<span>
							08 36 65 65 65
						</span>
					</div>
					<div>
						<span class="bg-color">
							Email:
						</span>
						<span>
							contact@ambient-it.net
						</span>
					</div>
					<div>
						<span class="bg-color">
							Site:
						</span>
						<span>
							http://ambient-it.net
						</span>
					</div>
				</div>
			</div>
		</aside>
	</main>
	<footer>
        <img class="pull-right" src="{{ config.url }}/images/logo.png" alt="Ambient-it logo"/>
	</footer>
{% endblock %}
