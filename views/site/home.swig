{% extends  '../layout/site.swig' %}

{% block title %}
Ambient-IT Formations Acceuil
{% endblock %}

{% block style %}
{% parent %}
{% endblock %}

<!--{% block header %}-->
<!--{% include 'partials/header-fullscreen.swig' %}-->
<!--{% endblock %}-->

{% block content %}
{% parent %}

<main>
  {{ intro | safe }}
  {{ us | safe }}
  {{ formations | safe }}



</main>
<footer class="social text-center" style="margin-top:15px;">
  <span  class="sexy-span big-span"></span>
  <br/>
  <h3>
    Vous pouvez nous retrouver sur :
  </h3>
  <div class="row">
    <div class="social-item wow fadeInLeft col-xs-4" data-wow-delay="0.4s">
      <a href="https://github.com/AmbientIT" target="_blank">
        <i class="ion-social-github"></i>
      </a>
    </div>
    <div class="social-item wow fadeInUp col-xs-4" data-wow-delay="0.4s">
      <a href="https://github.com/AmbientIT" target="_blank">
        <i class="ion-social-googleplus"></i>
      </a>
    </div>
    <div class="social-item wow fadeInRight col-xs-4" data-wow-delay="0.4s">
      <a href="http://codepen.io/Ambient-IT/" target="_blank">
        <i class="ion-social-codepen"></i>
      </a>
    </div>
  </div>
</footer>
{% endblock %}

{% block script %}
{% parent %}
{% endblock %}
