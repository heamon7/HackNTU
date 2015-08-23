# -*- coding: utf-8 -*-
import leancloud
from leancloud import Object
from leancloud import LeanCloudError
from leancloud import Query
from leancloud import User
import re
import random
station_dict ={u'大安站':[u'南港展覽館站',u'南港軟體園區站',u'東湖站',u'葫洲站',u'大湖公園站',u'內湖站',u'文德站',u'港墘站',u'西湖站',u'劍南路站',u'大直站',u'松山機場站',u'中山國中站',u'南京復興站',u'忠孝復興站',u'大安站',u'科技大樓站',u'六張犁站',u'麟光站',u'辛亥站',u'萬芳醫院站',u'萬芳社區站',u'木柵站'],
               u'南港展覽館站':[[u'木柵站',u'萬芳社區站',u'萬芳醫院站',u'辛亥站',u'麟光站',u'六張犁站',u'科技大樓站',u'大安站',u'忠孝復興站',u'南京復興站',u'中山國中站',u'松山機場站',u'大直站',u'劍南路站',u'西湖站',u'港墘站',u'文德站',u'內湖站',u'大湖公園站',u'葫洲站',u'東湖站',u'南港軟體園區站',u'南港展覽館站'],
                         [u'頂埔站',u'永寧站',u'土城站',u'海山站',u'亞東醫院站',u'府中站',u'板橋站',u'新埔站',u'江子翠站',u'龍山寺站',u'西門站',u'台北車站',u'善導寺站',u'忠孝新生站',u'忠孝復興站',u'忠孝敦化站',u'國父紀念館站',u'市政府站',u'永春站',u'後山埤站',u'昆陽站',u'南港站',u'南港展覽館站']],
               u'象山站':[u'淡水站',u'紅樹林站',u'竹圍站',u'關渡站',u'忠義站',u'復興崗站',u'北投站',u'奇岩站',u'唭哩岸站',u'石牌站',u'明德站',u'芝山站',u'士林站',u'劍潭站',u'圓山站',u'民權西路站',u'雙連站',u'中山站',u'台北車站',u'台大醫院站',u'中正紀念堂站',u'東門站',u'大安森林公園站',u'大安站',u'信義安和站',u'台北101/世貿站',u'象山站'],
               u'淡水站':[u'象山站',u'台北101/世貿站',u'信義安和站',u'大安站',u'大安森林公園站',u'東門站',u'中正紀念堂站',u'台大醫院站',u'台北車站',u'中山站',u'雙連站',u'民權西路站',u'圓山站',u'劍潭站',u'士林站',u'芝山站',u'明德站',u'石牌站',u'唭哩岸站',u'奇岩站',u'北投站',u'復興崗站',u'忠義站',u'關渡站',u'竹圍站',u'紅樹林站',u'淡水站'],
               u'北投站':[u'象山站',u'台北101/世貿站',u'信義安和站',u'大安站',u'大安森林公園站',u'東門站',u'中正紀念堂站',u'台大醫院站',u'台北車站',u'中山站',u'雙連站',u'民權西路站',u'圓山站',u'劍潭站',u'士林站',u'芝山站',u'明德站',u'石牌站',u'唭哩岸站',u'奇岩站',u'北投站'],
               u'新店站':[u'松山站',u'南京三民站',u'台北小巨蛋站',u'南京復興站',u'松江南京站',u'中山站',u'北門站',u'西門站',u'小南門站',u'中正紀念堂站',u'古亭站',u'台電大樓站',u'公館站',u'萬隆站',u'景美站',u'大坪林站',u'七張站',u'新店區公所站',u'新店站'],
               u'松山站':[u'新店站',u'新店區公所站',u'七張站',u'大坪林站',u'景美站',u'萬隆站',u'公館站',u'台電大樓站',u'古亭站',u'中正紀念堂站',u'小南門站',u'西門站',u'北門站',u'中山站',u'松江南京站',u'南京復興站',u'台北小巨蛋站',u'南京三民站',u'松山站'],
               u'頂埔站':[u'南港展覽館站',u'南港站',u'昆陽站',u'後山埤站',u'永春站',u'市政府站',u'國父紀念館站',u'忠孝敦化站',u'忠孝復興站',u'忠孝新生站',u'善導寺站',u'台北車站',u'西門站',u'龍山寺站',u'江子翠站',u'新埔站',u'板橋站',u'府中站',u'亞東醫院站',u'海山站',u'土城站',u'永寧站',u'頂埔站'],
               u'南勢角站':[[u'蘆洲站',u'三民高中站',u'徐匯中學站',u'三和國中站',u'三重國小站',u'大橋頭站',u'民權西路站',u'中山國小站',u'行天宮站',u'松江南京站',u'忠孝新生站',u'東門站',u'古亭站',u'頂溪站',u'永安市場站',u'景安站',u'南勢角站'],
                       [u'迴龍站',u'丹鳳站',u'輔大站',u'新莊站',u'頭前庄站',u'先嗇宮站',u'三重站',u'菜寮站',u'台北橋站',u'大橋頭站',u'民權西路站',u'中山國小站',u'行天宮站',u'松江南京站',u'忠孝新生站',u'東門站',u'古亭站',u'頂溪站',u'永安市場站',u'景安站',u'南勢角站']],
               u'蘆洲站':[u'南勢角站',u'景安站',u'永安市場站',u'頂溪站',u'古亭站',u'東門站',u'忠孝新生站',u'松江南京站',u'行天宮站',u'中山國小站',u'民權西路站',u'大橋頭站',u'三重國小站',u'三和國中站',u'徐匯中學站',u'三民高中站',u'蘆洲站'],
               u'迴龍站':[u'南勢角站',u'景安站',u'永安市場站',u'頂溪站',u'古亭站',u'東門站',u'忠孝新生站',u'松江南京站',u'行天宮站',u'中山國小站',u'民權西路站',u'大橋頭站',u'台北橋站',u'菜寮站',u'三重站',u'先嗇宮站',u'頭前庄站',u'新莊站',u'輔大站',u'丹鳳站',u'迴龍站']

}
destination_list = station_dict.keys()

class Taipei:
    def __init__(self):
        self.app_id = None
        pass

    def get_mark_line_data_list(self,start_time=None,end_time=None):
        try:
            print start_time
            print end_time
            TaiPei = Object.extend('Taipei')
            taipei = TaiPei()
            query = Query(TaiPei)
            query.exists('station')
            query.greater_than('time',start_time)
            query.less_than('time',end_time)
            query.limit(100)
            result_list = query.find()
            mark_line_data_list = []
            value =100
            print destination_list
            print 'length of result is %s' %str(len(result_list))
            for result in result_list:
                destination = result.get('destination')
                station = result.get('station')
                # destination = re.split((u'\u7ad9'),result.get('destination'))[0]
                # station = re.split((u'\u7ad9'),result.get('station'))[0]
                # print 'destination: %s  station: %s' %(destination,station)
                #if known the dest
                if  destination in destination_list:
                    print 'destination in '
                    station_route = station_dict[destination]
                    station_list=None
                    if station in station_route:
                        station_list = station_route

                    else:
                        # if there are 2 route
                        if len(station_route[0])>1:
                            if station in station_route[0]:
                                station_list = station_route[0]
                                if station in station_route[1]:
                                    if random.randint(0,1):
                                        station_list = station_route[1]
                            else:
                                if station in station_route[1]:
                                    station_list = station_route[1]
                    if station_list:
                        # try:
                        index = station_list.index(station)
                        # except:
                        #     print station_list
                        if index < len(station_list) and index >0:
                            next_station = station_list[index+1]
                            prev_station = station_list[index-1]
                            mark_line_data_list.append([{'name':prev_station},{'name':station},{'name':next_station,'value':value}])



        except LeanCloudError, e:

             raise e
        return mark_line_data_list

