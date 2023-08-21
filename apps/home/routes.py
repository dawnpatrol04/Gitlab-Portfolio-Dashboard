# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from apps.home import blueprint
from flask import render_template, request, current_app , jsonify
from flask_login import login_required
import requests
from jinja2 import TemplateNotFound


@blueprint.route('/index')
@login_required
def index():
    API_URL = current_app.config['API_URL']

    def fetch_data(endpoint, key=None):
        response = requests.get(f'{API_URL}/{endpoint}')
        data = response.json()
        return data if key is None else data[key]

    user_count = fetch_data('users/count/', 'user_count')
    project_count = fetch_data('projects/count/', 'project_count')
    pipeline_count = fetch_data('pipelines/count/', 'pipeline_count')
    commit_count = fetch_data('commits/count/', 'commit_count')
    pipeline_percentages = fetch_data('pipelines/by-source-percentage/', None)

    return render_template('home/index.html', segment='index', 
                           user_count=user_count, 
                           project_count=project_count, 
                           pipeline_count=pipeline_count, 
                           commit_count=commit_count, 
                           pipeline_percentages=pipeline_percentages,  
                           API_URL=API_URL)


@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith('.html'):
            template += '.html'

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None

# Endpoint to serve kpi_card_users data
@blueprint.route('/api/kpi-card-users-data')
@login_required
def kpi_card_users_data():
    # Fetch the data from the external API
    api_url = current_app.config['API_URL']
    response = requests.get(f'{api_url}/users/count-per-month/')
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch data from external API'}), 500

    # Return the data as-is to the frontend
    return jsonify(response.json()["data"])


# Value Dashboard Route
@blueprint.route('/dashboard-value', methods=['GET'])
def value_dashboard():
    API_URL = current_app.config['API_URL']
    def fetch_data(endpoint, key=None):
        response = requests.get(f'{API_URL}/{endpoint}')
        data = response.json()
        return data if key is None else data[key]
    
    user_count = fetch_data('users/count/', 'user_count')
    project_count = fetch_data('projects/count/', 'project_count')
    pipeline_count = fetch_data('pipelines/count/', 'pipeline_count')
    commit_count = fetch_data('commits/count/', 'commit_count')
    pipeline_percentages = fetch_data('pipelines/by-source-percentage/', None)
    savings_data = fetch_data('value-detail/?start_date=2023-01-01', None)
        # Compute the list of months from the savings_data
    months = set()
    for process_data in savings_data.values():
        months.update(process_data.keys())
    months = sorted(list(months))
    # You can add any necessary logic here
    return render_template('home/dashboard-value.html', segment='dashboard-value', 
                           user_count=user_count, 
                           project_count=project_count, 
                           pipeline_count=pipeline_count, 
                           commit_count=commit_count, 
                           pipeline_percentages=pipeline_percentages,
                           savings=savings_data, months=months,
                           API_URL=API_URL)
