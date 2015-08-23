# coding: utf-8

import datetime

from flask import Flask,request,make_response,jsonify
from flask import render_template
from models import Taipei
from views.todos import todos_view

app = Flask(__name__)

# 动态路由
# app.register_blueprint(todos_view, url_prefix='/todos')

first_time = "2015-08-21 19:10:00"
last_time = datetime.datetime.strptime("2015-08-23 00:00:00","%Y-%m-%d %H:%M:%S")

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/data',methods=['POST'])
def data():
    print request.form
    start_time = request.form['start_time']
    timedelta = request.form['timedelta']
    if start_time == u'0':
        res ={}
        start_time = first_time
        res['start_time'] = start_time
        res['mark_line'] = None
        return jsonify(res)

    false=False
    true=True
    mark_line_option = {
						"smooth":false,
						"symbolSize":[0,0],
						"effect" : {
							"show":true,
                            "loop":false,
							"scaleSize": 3,
							"period": 30,
							"color": "#3399FF",
							"shadowBlur": 0
							},
						"itemStyle" : {
							"normal": {
								"borderWidth":2,
								"label":{
										"show":false
										},
								"lineStyle": {
											"type": "solid",
											"shadowBlur": 0
											}
											}
											},
						"data" : []
                      }
    taipei = Taipei()

    start_time = datetime.datetime.strptime(start_time,"%Y-%m-%d %H:%M:%S")
    if start_time > last_time:
        res ={}
        start_time = first_time
        res['start_time'] = start_time
        res['mark_line'] = None
        return jsonify(res)

    end_time = start_time+datetime.timedelta(seconds=int(timedelta))
    print 'start_time: %s  end_time: %s '  %(start_time,end_time)
    mark_line_data_list =taipei.get_mark_line_data_list(start_time=start_time,end_time=end_time)

        # [
        #       [{"name":'劍南路'}, {"name":'西湖',"value":400}],
			# 				[{"name":'大直'}, {"name":'劍南路',"value":400}]]
    mark_line_option['data'] = mark_line_data_list
    print mark_line_option
    # res = make_response(mark_line_option,200)
    res={}
    res['start_time'] = end_time.strftime("%Y-%m-%d %H:%M:%S")
    res['mark_line'] = mark_line_option
    return jsonify(res)









# @app.route('/data',methods=['POST'])
# def data():
#     print request.form
#     false=False
#     true=True
#     mark_line_option = {
# 						"smooth":false,
# 						"symbolSize":[0,0],
# 						"effect" : {
# 							"show":true,
#                             "loop":false,
# 							"scaleSize": 1,
# 							"period": 200,
# 							"color": "#fff",
# 							"shadowBlur": 10
# 							},
# 						"itemStyle" : {
# 							"normal": {
# 								"borderWidth":1,
# 								"label":{
# 										"show":false
# 										},
# 								"lineStyle": {
# 											"type": "solid",
# 											"shadowBlur": 10
# 											}
# 											}
# 											},
# 						"data" : []
#                       }
#
#     mark_line_data_list =  [
#               [{"name":'劍南路'}, {"name":'西湖',"value":400}],
# 							[{"name":'大直'}, {"name":'劍南路',"value":400}]]
#     mark_line_option['data'] = mark_line_data_list
#     print mark_line_option
#     # res = make_response(mark_line_option,200)
#     return jsonify(mark_line_option)