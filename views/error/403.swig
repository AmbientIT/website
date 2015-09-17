{% extends  '../layouts/site.swig' %}

{% block title %}
Ambient-IT 403
{% endblock %}

{% block style %}
{% parent %}
{% endblock %}

{% block content %}


<div class="missing-2">
    <div class="container">
        <div class="text">
            <div class="cont">
                <h3> OOPS!</h3>
                <br>
                <span>4<span class="red">0</span>3</span>
                <h3>Restricted area</h3>
                <h5>Il semblerait que vous n'ayez pas les droits suffisants pour acceder à cette ressource.</h5>
                <a class="btn" href="#.">GO BACK</a> </div>
        </div>
    </div>
</div>
{% endblock %}

